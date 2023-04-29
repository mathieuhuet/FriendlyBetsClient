import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components/native';

// Custom components
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import InfoCard from '../components/cards/infoCard';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';


const TopBackGround = styled.View`
  background-color: ${colors.darkGray};
  width: 100%;
  height: ${ScreenHeight * 0.3}px;
  border-radius: 30px;
  position: absolute;
  top: -30px;
`;

const Dashboard: FunctionComponent = () => {


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopBackGround/>
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold'}}>
          Hello, User.
        </LargeText>
        <InfoCard 
        
        />
      </MainContainer>
    </MainContainer>
  );
}

export default Dashboard;