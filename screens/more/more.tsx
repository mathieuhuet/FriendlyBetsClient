import React, { FunctionComponent, useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { getUserInfo } from '../../services/userServices/getUserInfo';
import { logoutUser } from '../../services/userServices/logout';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
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

const More: FunctionComponent = ({navigation}) => {
  const [accessToken, setAccessToken] = useState('')
  const [userInfo, setUserInfo] = useState({firstName: '', lastName: '', email: ''});
  useEffect(() => {
    const fetchAccessToken = () => {
      getAccessToken().then(data => {
        setAccessToken(data);
      }).catch(err => {
        console.log(err, 'TEST1111');
      }).finally(() => {
        getUserInfo(accessToken).then((result) => {
          console.log(result);
          setUserInfo(result.data);
        }).catch((err) => {
          console.log(err, 'TEST2222');
        })
      });
    }
    fetchAccessToken();
  }, []);


  const logout = () => {
    logoutUser(accessToken).then(result => {
      if (result.data) {
        console.log('LOGOUT SUCCESSFUL MATHIEU');
        saveAccessToken('');
      }
    }).catch(err => {
      console.log(err, 'test33333');
      saveAccessToken(''); // delete this line
    });
  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.tertiary}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
          More
        </LargeText>
        <ProfileIcon
          firstName='Mathieu'
          lastName='Huet'
          color='#e32e12'
          size={10}
          style={{backgroundColor: colors.primary}}
        />
        <RegularButton
          onPress={logout}
        >
          Logout
        </RegularButton>
      </MainContainer>
    </MainContainer>
  );
}

export default More;