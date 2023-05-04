import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { logoutUser } from '../../services/userServices/logout';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import SmallText from '../../components/texts/smallText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';

// Background
import background from '../../assets/backgrounds/card_background_v1.png';
import ProfileIcon from '../../components/icons/profileIcon';
import RegularButton from '../../components/buttons/regularButton';
import RegularText from '../../components/texts/regularText';
import PressableText from '../../components/texts/pressableText';

const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const ChangeIcon: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.tertiary}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
          Change Icon
        </LargeText>
      </MainContainer>
    </MainContainer>
  );
}

export default ChangeIcon;