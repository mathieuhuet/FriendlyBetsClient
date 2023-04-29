import React, { FunctionComponent, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import NotConnectedStack from './navigators/notConnectedStack';
import ConnectedStack from './navigators/connectedStack';

const getAccessToken: () => Promise<string> = async () => {
  let result = await SecureStore.getItemAsync('accessToken');
  if (result) {
    return result;
  } else {
    return '';
  }
}

const App: FunctionComponent = () => {
  let accessToken = '';
  useEffect(() => {
    const fetchAccessToken = async () => {
      await getAccessToken().then(data => {
        accessToken = data;
      }).catch(err => {
        console.log(err);
      });
    }
    fetchAccessToken();
  }, [])
  return (
    <>
      {accessToken ? <ConnectedStack/> : <NotConnectedStack/>}
    </>
  );
}

export default App;