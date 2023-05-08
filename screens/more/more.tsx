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


async function saveAccessToken(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
}

const More: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);

  const logout = () => {
    logoutUser(user.accessToken).then(result => {
      if (result.data) {
        saveAccessToken('');
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}})
      }
    }).catch(err => {
      console.log(err, 'MORE LOGOUT');
      saveAccessToken('');
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
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '30%'}}
        >
          <View
            style={{width: '40%'}}
          >
            <ProfileIcon
              firstName={user.firstName}
              lastName={user.lastName}
              color={user.profileIconColor}
              size={16}
              backgroundColor={user.profileIconBackgroundColor}
              police={user.profileIconPolice}
            />
            <PressableText
              textStyle={{marginTop: 10, color: colors.primary, fontSize: 16, textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('ChangeIcon')}
            >
              Modify Icon
            </PressableText>
          </View>
          <View
            style={{width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
          >
            <SmallText
              textStyle={{color: colors.primary}}
            >
              First name:
            </SmallText>
            <RegularText
              textStyle={{color: colors.primary}}
              style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 4, height: 40, paddingLeft: 3, display: 'flex', justifyContent: 'center', marginBottom: 10}}
            >
              {user.firstName}
            </RegularText>
            <SmallText
              textStyle={{color: colors.primary}}
            >
              Last name:
            </SmallText>
            <RegularText
              textStyle={{color: colors.primary}}
              style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 4, height: 40, paddingLeft: 3, display: 'flex', justifyContent: 'center'}}
            >
              {user.lastName}
            </RegularText>
          </View>
        </View>
        <View
          style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '50%'}}
        >
          <RegularButton
            onPress={() => navigation.navigate('ChangeName')}
            style={{marginBottom: 10, backgroundColor: colors.orange}}
          >
            Change Name
          </RegularButton>
          <RegularButton
            onPress={() => navigation.navigate('ChangeEmail')}
            style={{marginBottom: 10, backgroundColor: colors.orange}}
          >
            Change Email
          </RegularButton>
          <RegularButton
            onPress={logout}
            style={{marginBottom: 10, backgroundColor: colors.orange}}
          >
            Logout
          </RegularButton>
          <RegularButton
            onPress={() => navigation.navigate('DeleteAccount')}
            style={{marginBottom: 10, backgroundColor: colors.orange}}
          >
            Delete Account
          </RegularButton>
        </View>
      </MainContainer>
    </MainContainer>
  );
}

export default More;