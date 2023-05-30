import React, { FunctionComponent, useContext } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { UserContext } from '../context/user/userContext';


// Custom components
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import BalanceCard from '../components/cards/balanceCard';
import SquareCard from '../components/cards/squareCard';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';
import topImage from '../assets/backgrounds/top_background_v1.png';
import bottomImage from '../assets/backgrounds/bottom_background_v1.png'
import ProfileIcon from '../components/icons/profileIcon';

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

const Dashboard: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopImage source={topImage} />
      <TopBackGround/>
      <BottomImage source={bottomImage} />
        {user.firstName ? 
          <MainContainer style={{backgroundColor: 'transparent'}}>
          <Pressable
            onPress={() => navigation.navigate('More')}
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <View>
              <LargeText>
                {user.firstName}
              </LargeText>
              <LargeText>
                {user.lastName}
              </LargeText>
            </View>
            <ProfileIcon
              firstName={user.firstName}
              lastName={user.lastName}
              color={user.profileIconColor}
              size={12}
              backgroundColor={user.profileIconBackgroundColor}
              police={user.profileIconPolice}
            />
          </Pressable>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 120}}>
            <SquareCard
              style={{backgroundColor: colors.purple}}
              textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.tertiary}}
              onPress={() => navigation.navigate('MakeABet1')}
            >
              Make a bet
            </SquareCard>
            <SquareCard
              style={{backgroundColor: colors.orange}}
              textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.tertiary}}
              onPress={() => navigation.navigate('JoinABet')}
            >
              Join a bet
            </SquareCard>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <SquareCard
              style={{backgroundColor: colors.accent}}
              textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.primary}}
              onPress={() => navigation.navigate('ViewBets')}
            >
              View bets
            </SquareCard>
            <SquareCard
              style={{backgroundColor: colors.tertiary}}
              textStyle={{fontWeight: 'bold', fontSize: 32, color: colors.primary}}
              onPress={() => navigation.navigate('Balance')}
            >
              Result
            </SquareCard>
          </View>
        </MainContainer>
        :
        <MainContainer style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
              size='large'
              color={colors.tertiary}
          />
        </MainContainer>  
        }
    </MainContainer>
  );
}

export default Dashboard;