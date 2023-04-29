import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

// Custom components
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import BalanceCard from '../components/cards/balanceCard';
import MakeABetCard from '../components/cards/makeABetCard';
import JoinABetCard from '../components/cards/joinABetCard';
import ViewYourBetCard from '../components/cards/viewYourBet';
import MoreCard from '../components/cards/moreCard';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';

// Background
import topImage from '../assets/backgrounds/top_background_v1.png';
import bottomImage from '../assets/backgrounds/bottom_background_v1.png'

const TopBackGround = styled.View`
  background-color: ${colors.darkGray};
  background-image: ${topImage};
  width: 100%;
  height: ${ScreenHeight * 0.3}px;
  border-radius: 30px;
  position: absolute;
  top: -30px;
`;

const TopImage = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  max-height: 100%;
  position: absolute;
  top: -30px;
`;

const BottomImage = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  max-height: 50%;
  position: absolute;
  bottom: -30px;
`;


const Dashboard: FunctionComponent = () => {


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopImage source={topImage} />
      <TopBackGround/>
      <BottomImage source={bottomImage} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold'}}>
          Hello, User.
        </LargeText>
        <BalanceCard/>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <MakeABetCard/>
          <JoinABetCard/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <ViewYourBetCard/>
          <MoreCard/>
        </View>
      </MainContainer>
    </MainContainer>
  );
}

export default Dashboard;