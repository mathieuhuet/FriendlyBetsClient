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


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const BetDetails: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const bet = route.params;
  
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.accent}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <StyledView
          style={{backgroundColor: colors.primary, padding: 15, borderRadius: 5}}
        >
          <LargeText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betTitle}
          </LargeText>
          <RegularText textStyle={{marginBottom: 20, color: colors.tertiary}}>
            {bet.betExtraText}
          </RegularText>
        </StyledView>
      </MainContainer>
    </MainContainer>
  );
}

export default BetDetails;