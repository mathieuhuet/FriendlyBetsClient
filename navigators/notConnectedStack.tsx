import React, { FunctionComponent } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Login from '../screens/login';
import Register from '../screens/register';
import EmailVerification from '../screens/emailVerification';
import Welcome from '../screens/welcome';
import PrivacyPolicy from '../screens/privacyPolicy';

const Stack = createNativeStackNavigator();

const NotConnectedStack: FunctionComponent = () => {

  return (
    <NavigationContainer
      theme={DarkTheme}
    >
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Welcome'
      >
        <Stack.Screen 
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen 
          name="EmailVerification"
          component={EmailVerification}
        />
        <Stack.Screen
          name='Welcome'
          component={Welcome}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NotConnectedStack;