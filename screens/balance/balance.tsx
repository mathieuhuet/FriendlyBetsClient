import React, { FunctionComponent, useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { getUserInfo } from '../../services/userServices/getUserInfo';
import { logoutUser } from '../../services/userServices/logout';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import BalanceCard from '../../components/cards/balanceCard';
import SquareCard from '../../components/cards/squareCard';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';

// Background
import topImage from '../../assets/backgrounds/top_background_v1.png';
import bottomImage from '../../assets/backgrounds/bottom_background_v1.png'

const TopBackGround = styled.View`
  background-color: ${colors.darkGray};
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
`;

const BottomImage = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  max-height: 50%;
  position: absolute;
  bottom: -30px;
`;

const getAccessToken: () => Promise<string> = async () => {
  let result = await SecureStore.getItemAsync('accessToken');
  if (result) {
    return result;
  } else {
    return '';
  }
}

async function saveAccessToken(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
}

const Balance: FunctionComponent = ({navigation}) => {


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopImage source={topImage} />
      <TopBackGround/>
      <BottomImage source={bottomImage} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold'}}>
          Balance
        </LargeText>
      </MainContainer>
    </MainContainer>
  );
}

export default Balance;