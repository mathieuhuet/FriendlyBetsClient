import React, { FunctionComponent, useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { getUserInfo } from '../services/userServices/getUserInfo';

// Custom components
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import BalanceCard from '../components/cards/balanceCard';
import SquareCard from '../components/cards/squareCard';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';

// Background
import topImage from '../assets/backgrounds/top_background_v1.png';
import bottomImage from '../assets/backgrounds/bottom_background_v1.png'

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


const Dashboard: FunctionComponent = () => {
  const [header, setHeader] = useState('');
  useEffect(() => {
    getUserInfo('test').then((result) => {
      setHeader(result.data.firstName);
    }).catch((err) => {
      console.log(err);
      setHeader('doesnt work.');
    })
  }, []);

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopImage source={topImage} />
      <TopBackGround/>
      <BottomImage source={bottomImage} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold'}}>
          {header}
        </LargeText>
        <BalanceCard/>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <SquareCard
            style={{backgroundColor: colors.purple}}
            textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.tertiary}}
          >
            Make a bet
          </SquareCard>
          <SquareCard
            style={{backgroundColor: colors.orange}}
            textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.tertiary}}
          >
            Join a bet
          </SquareCard>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <SquareCard
            style={{backgroundColor: colors.accent}}
            textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.primary}}
          >
            View bets
          </SquareCard>
          <SquareCard
            style={{backgroundColor: colors.tertiary}}
            textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.primary}}
            onPress={() => console.log('Allo mathieu, tu as appuyé sur le bouton "More".')}
          >
            More
          </SquareCard>
        </View>
      </MainContainer>
    </MainContainer>
  );
}

export default Dashboard;