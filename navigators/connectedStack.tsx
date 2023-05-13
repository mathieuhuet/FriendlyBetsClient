import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Dashboard from '../screens/dashboard';
import Balance from '../screens/balance/balance';
import MakeABet from '../screens/makeABet/makeABet';
import MakeABetResolvedDate from '../screens/makeABet/makeABetResolvedDate';
import MakeABetLastDate from '../screens/makeABet/makeABetLastDate';
import JoinABet from '../screens/joinABet/joinABet';
import ViewBets from '../screens/viewBets/viewBets';
import More from '../screens/more/more';
import ChangeEmail from '../screens/more/changeEmail';
import ChangeEmailVerification from '../screens/more/changeEmailVerification';
import ChangeIcon from '../screens/more/changeIcon';
import ChangeName from '../screens/more/changeName';
import DeleteAccount from '../screens/more/deleteAccount';


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
          name='MakeABetResolvedDate'
          component={MakeABetResolvedDate}
        />
        <Stack.Screen
          name='MakeABetLastDate'
          component={MakeABetLastDate}
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
          name="ChangeEmailVerification"
          component={ChangeEmailVerification}
        />
        <Stack.Screen
          name='ChangeEmail'
          component={ChangeEmail}
        />
        <Stack.Screen
          name='ChangeName'
          component={ChangeName}
        />
        <Stack.Screen
          name='DeleteAccount'
          component={DeleteAccount}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ConnectedStack;