import React, { FunctionComponent, useEffect, useReducer, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import NotConnectedStack from './navigators/notConnectedStack';
import ConnectedStack from './navigators/connectedStack';
import { UserContext, UserDispatchContext } from './context/user/userContext';
import { initialUser, userReducer } from './context/user/userReducer';
import { getUserInfo } from './services/userServices/getUserInfo';


const getAccessToken: () => Promise<string> = async () => {
  let result = await SecureStore.getItemAsync('accessToken');
  if (result) {
    return result;
  } else {
    return '';
  }
}

const App: FunctionComponent = () => {
  const [user, dispatch] = useReducer(userReducer, initialUser);
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        <BeforeStack/>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

const BeforeStack: FunctionComponent = () => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  useEffect(() => {
    const fetchAccessToken = async () => {
      await getAccessToken().then(data => {
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: data}});
      }).catch(err => {
        console.log(err, 'APP 1');
      }).finally(() => {
        if (user.accessToken) {
          getUserInfo(user.accessToken).then((result) => {
            dispatch({ type: 'SET_NAME', payload: {firstName: result.data.firstName, lastName: result.data.lastName}});
            dispatch({ type: 'SET_EMAIL', payload: {email: result.data.email}});
            dispatch({ type: 'SET_PROFILEICON', payload: {profileIconColor: result.data.profileIconColor, profileIconBackgroundColor: result.data.profileIconBackgroundColor, profileIconPolice: result.data.profileIconPolice}});
          }).catch((err) => {
            console.log(err, 'APP 2');
          })
        }
      });
    }
    fetchAccessToken();
  }, [])
  console.log(user, 'APP.tsx');
  return (
    <>
      {user.accessToken ? <ConnectedStack/> : <NotConnectedStack/>}
    </>
  )
}

export default App;