import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Dashboard from '../screens/dashboard';
import Balance from '../screens/balance/balance';
import MakeABet1 from '../screens/makeABet/makeABet1';
import MakeABet2 from '../screens/makeABet/makeABet2';
import MakeABet3 from '../screens/makeABet/makeABet3';
import MakeABet4 from '../screens/makeABet/makeABet4';
import MakeABet5 from '../screens/makeABet/makeABet5';
import JoinABet from '../screens/joinABet/joinABet';
import JoinABetConfirm from '../screens/joinABet/joinABetConfirm';
import ViewBets from '../screens/viewBets/viewBets';
import BetDetails from '../screens/viewBets/betDetails';
import ResolveBets from '../screens/viewBets/resolveBets';
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
          name='MakeABet1'
          component={MakeABet1}
        />
        <Stack.Screen
          name='MakeABet2'
          component={MakeABet2}
        />
        <Stack.Screen
          name='MakeABet3'
          component={MakeABet3}
        />
        <Stack.Screen
          name='MakeABet4'
          component={MakeABet4}
        />
        <Stack.Screen
          name='MakeABet5'
          component={MakeABet5}
        />
        <Stack.Screen
          name='JoinABet'
          component={JoinABet}
        />
        <Stack.Screen
          name='JoinABetConfirm'
          component={JoinABetConfirm}
        />
        <Stack.Screen
          name='ViewBets'
          component={ViewBets}
        />
        <Stack.Screen
          name='BetDetails'
          component={BetDetails}
        />
        <Stack.Screen
          name='ResolveBets'
          component={ResolveBets}
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