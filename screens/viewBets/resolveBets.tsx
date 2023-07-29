import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import styled from 'styled-components/native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import background from '../../assets/backgrounds/card_background_v1.png'
import { getUserBets } from '../../services/betServices/getUserBets';
import { UserContext } from '../../context/user/userContext';
import ParticipantsBetList from '../../components/icons/participantsBetList';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const ResolveBets: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const bet = route.params;
  console.log(bet);
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.accent}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText>
          Resolve the bet
        </LargeText>
        <ParticipantsBetList
          betId={bet._id}
          accessToken={user.accessToken}
          betCreatedAt={bet.createdAt}
        />
      </MainContainer>
    </MainContainer>
  );
}

export default ResolveBets;