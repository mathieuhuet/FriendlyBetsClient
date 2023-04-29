import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

// custom components
import { ScreenHeight } from '../components/shared';
import SmallText from '../components/texts/smallText';
import RegularButton from '../components/buttons/regularButton';
import LargeText from '../components/texts/largeText';
import PressableText from '../components/texts/pressableText';
import MainContainer from '../components/containers/mainContainer';
// image
import background from "../assets/backgrounds/background_v1.png";


const TopSection = styled.View`
  width: 100%;
  max-height: 55%;
  flex: 1;
`;

const TopImage = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  max-height: 120%;
`;

const BottomSection = styled.View`
  width: 100%;
  padding: 25px 25px 10px 25px;
  flex: 1;
  justify-content: flex-end;
  marginBottom: 5%;
`;

const Welcome: FunctionComponent = ({ navigation }) => {
  return (
    <MainContainer
      style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}}
    >
      <TopSection>
        <TopImage source={background} />
      </TopSection>
      <BottomSection>
        <LargeText textStyle={{ width: "70%", marginBottom: 25}}>
          Welcome to FriendlyBets
        </LargeText>
        <SmallText textStyle={{ width: "70%", marginBottom: 25}}>
          The best way to track your bets with your friends
        </SmallText>
        <RegularButton onPress={() => navigation.navigate('Register')}>
          Get Started
        </RegularButton>
        <View
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}
        >
          <SmallText>
            Already have an account? 
          </SmallText>
          <PressableText
            onPress={() => navigation.navigate('Login')}
          >
            &nbsp; Click here to Login.
          </PressableText>
        </View>
      </BottomSection>
    </MainContainer>
  )
}

export default Welcome;