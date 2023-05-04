import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Dashboard from '../screens/dashboard';
import Balance from '../screens/balance/balance';
import MakeABet from '../screens/makeABet/makeABet';
import JoinABet from '../screens/joinABet/joinABet';
import ViewBets from '../screens/viewBets/viewBets';
import More from '../screens/more/more';
import ChangeEmail from '../screens/more/changeEmail';
import ChangeIcon from '../screens/more/changeIcon';
import ChangeName from '../screens/more/changeName';


const Stack = createNativeStackNavigator();


const ConnectedStack: FunctionComponent = (props) => {
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
        <Stack.Screen
          name='Balance'
          component={Balance}
        />
        <Stack.Screen
          name='MakeABet'
          component={MakeABet}
        />
        <Stack.Screen
          name='JoinABet'
          component={JoinABet}
        />
        <Stack.Screen
          name='ViewBets'
          component={ViewBets}
        />
        <Stack.Screen
          name='More'
          component={More}
        />
        <Stack.Screen
          name='ChangeIcon'
          component={ChangeIcon}
        />
        <Stack.Screen
          name='ChangeEmail'
          component={ChangeEmail}
        />
        <Stack.Screen
          name='ChangeName'
          component={ChangeName}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ConnectedStack;