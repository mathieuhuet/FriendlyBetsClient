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

const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;


async function saveAccessToken(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
}

const More: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);

  const logout = () => {
    logoutUser(user.accessToken).then(result => {
      if (result.data) {
        console.log('LOGOUT SUCCESSFUL MATHIEU');
        saveAccessToken('');
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}})
      }
    }).catch(err => {
      console.log(err, 'MORE LOGOUT');
    });
  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.tertiary}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
          More
        </LargeText>
        <View
          style={{display: 'flex', flexDirection: 'row'}}
        >
          <View
            style={{width: '50%'}}
          >
            <RegularButton
              onPress={logout}
              style={{width: '100%'}}
            >
              Logout
            </RegularButton>
          </View>
          <View
            style={{width: '50%'}}
          >
            <ProfileIcon
              firstName='À'
              lastName='Ø'
              color={colors.accent}
              size={16}
              backgroundColor={colors.primary}
            />
            <SmallText
              textStyle={{color: colors.primary}}
            >
              {user.firstName}
            </SmallText>
            <SmallText
              textStyle={{color: colors.primary, marginBottom: 20}}
            >
              {user.lastName}
            </SmallText>
            <SmallText
              textStyle={{color: colors.primary}}
            >
              {user.email}
            </SmallText>
          </View>
        </View>
      </MainContainer>
    </MainContainer>
  );
}

export default More;