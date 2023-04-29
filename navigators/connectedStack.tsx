import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Dashboard from '../screens/dashboard';

const Stack = createNativeStackNavigator();

interface ConnectedStackProps {
  setAccessToken?: any;
}

const ConnectedStack: FunctionComponent<ConnectedStackProps> = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Dashboard'
      >
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ConnectedStack;