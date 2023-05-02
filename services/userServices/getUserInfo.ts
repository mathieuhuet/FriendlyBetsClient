import axios from 'axios';
import {REACT_NATIVE_USER_API} from '@env'
const API = REACT_NATIVE_USER_API
? REACT_NATIVE_USER_API
: 'http://127.0.0.1:5000/user';

export const getUserInfo = (accessToken: string) => {
  return new Promise((resolve, reject) => {
    console.log(API);
    axios.get(
      `${API}/getUserInfo`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      }
    ).then((response) => {
      const { data } = response;
      resolve(data);
    }).catch(err => {
      try {
        if (err.response.data.error) {
          reject(err.response.data);
        }
      } catch (error) {
        reject(error);
      }
    })
  })
};