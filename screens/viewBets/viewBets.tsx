import React, { FunctionComponent, useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';

// Background
import background from '../../assets/backgrounds/card_background_v1.png'


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const ViewBets: FunctionComponent = ({navigation}) => {
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.accent}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
          View bets
        </LargeText>
      </MainContainer>
    </MainContainer>
  );
}

export default ViewBets;