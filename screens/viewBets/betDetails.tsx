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
import ConfirmModal from '../../components/modals/confirmModal';
import { getBetOptions } from '../../components/betOptions';
import ParticipantsBetList from '../../components/icons/participantsBetList';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const BetDetails: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const bet = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(user._id === bet.admin ? 'Are you sure you want to Delete this bet?' : 'Are you sure you want to Quit this bet?');

  const quitBetPress = async () => {
    try {
      const result = await quitBet({_id: bet._id}, user.accessToken);
      if (result.data) {
        navigation.navigate('Dashboard');
      } else {
        setModalMessage('Failed to quit the bet, verify your internet connection.')
      }
    } catch (error) {
      
    }
  }

  const deleteBetPress = async () => {
    try {
      console.log(bet);
      const result = await deleteBet({_id: bet._id}, user.accessToken);
      if (result.data) {
        navigation.navigate('Dashboard');
      } else {
        setModalMessage('Failed to delete the bet, verify your internet connection.')
      }
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
          <LargeText textStyle={{marginBottom: 5, color: colors.tertiary}}>
            {bet.betTitle}
          </LargeText>
          <RegularText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betExtraText}
          </RegularText>
          <LargeText textStyle={{marginBottom: 5, color: colors.tertiary}}>
            {getBetOptions(bet.betType)}
          </LargeText>
          <RegularText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betExplain}
          </RegularText>
          <RegularText>
            Betting ends : 
          </RegularText>
          <RegularText
            textStyle={{fontWeight: 'bold', marginBottom: 20}}
            >
              {new Date(bet.bettingEndAt).toDateString()} at {new Date(bet.bettingEndAt).toLocaleTimeString().slice(0, -3)}
          </RegularText>

          <View
            style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', width: '100%', padding: 10, borderWidth: 10, borderColor: colors.tertiary,}}
          >
            <LargeText
              textStyle={{
                fontSize: 40, 
                color: colors.tertiary, 
                fontWeight: 'bold', 
                letterSpacing: 5, 
                padding: 10,
                borderWidth: 10, 
                borderColor: colors.tertiary,
                textAlign: 'center'
              }}
            >
              {bet.betCode}
            </LargeText>
          </View>
          <RegularText
            style={{marginBottom: 4}}
          >
            Participants bets: 
          </RegularText>
          <ParticipantsBetList
            betId={bet._id}
            accessToken={user.accessToken}
            betCreatedAt={bet.createdAt}
          />
        </StyledView>
        {user._id === bet.admin ?
          <>
            <View
              style={{position: 'absolute', display: 'flex', justifyContent: 'flex-end', alignContent: 'center', height: '100%', width: '100%'}}
            >
              <RegularButton
                style={{backgroundColor: colors.success, marginBottom: 20}}
                onPress={() => {}}
                textStyle={{fontSize: 20}}
              >
                Resolve the bet
              </RegularButton>
              <RegularButton
                style={{backgroundColor: colors.orange}}
                onPress={() => setModalVisible(true)}
                textStyle={{fontSize: 20}}
              >
                Delete Bet
              </RegularButton>
            </View>
            <ConfirmModal
              message={modalMessage}
              modalVisible={modalVisible}
              buttonHandler={deleteBetPress}
              closeModal={() => setModalVisible(false)}
            />
          </>
        : 
          <>
            <RegularButton
              style={{backgroundColor: colors.orange}}
              onPress={() => setModalVisible(true)}
              textStyle={{fontSize: 20}}
            >
            Quit Bet
          </RegularButton>
          <ConfirmModal
            message={modalMessage}
            modalVisible={modalVisible}
            buttonHandler={quitBetPress}
            closeModal={() => setModalVisible(false)}
          />
          </>
        }
      </MainContainer>
    </MainContainer>
  );
}

export default BetDetails;