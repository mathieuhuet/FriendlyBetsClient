import React, { FunctionComponent, useEffect, useState } from 'react';
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
  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    const fetchAccessToken = async () => {
      await getAccessToken().then(data => {
        setAccessToken(data);
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