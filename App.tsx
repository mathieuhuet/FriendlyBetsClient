import React, { FunctionComponent, useEffect, useReducer, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import NotConnectedStack from './navigators/notConnectedStack';
import ConnectedStack from './navigators/connectedStack';
import { UserContext, UserDispatchContext } from './context/user/userContext';
import { initialUser, userReducer } from './context/user/userReducer';


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