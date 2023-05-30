import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import background from '../../assets/backgrounds/card_background_v1.png'
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import { ScrollView } from 'react-native-gesture-handler';
import StyledView from '../../components/views/styledView';
import RegularButton from '../../components/buttons/regularButton';
import { deleteBet } from '../../services/betServices/deleteBet';
import { quitBet } from '../../services/betServices/quitBet';
import ParticipantsIcon from '../../components/icons/participantsIcon';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const BetDetails: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const bet = route.params;

  const quitBetPress = async () => {
    try {
      const result = await quitBet({_id: bet._id}, user.accessToken);
      navigation.navigate('Dashboard');
    } catch (error) {
      
    }
  }

  const deleteBetPress = async () => {
    try {
      console.log(bet);
      const result = await deleteBet({_id: bet._id}, user.accessToken);
      navigation.navigate('Dashboard');
    } catch (error) {
      
    }
  }

  
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.accent}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <StyledView
          style={{backgroundColor: colors.primary, padding: 15, borderRadius: 5}}
        >
          <LargeText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betTitle}
          </LargeText>
          <LargeText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betCode}
          </LargeText>
          <RegularText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betExtraText}
          </RegularText>
          <ParticipantsIcon
            betId={bet._id}
            accessToken={user.accessToken}
          />
        </StyledView>
        {user._id === bet.admin ?
          <RegularButton
            style={{backgroundColor: 'red'}}
            onPress={deleteBetPress}
          >
            Delete Bet
          </RegularButton>
        :
          <RegularButton
            style={{backgroundColor: 'red'}}
            onPress={quitBetPress}
          >
            Quit Bet
          </RegularButton>
        }
      </MainContainer>
    </MainContainer>
  );
}

export default BetDetails;