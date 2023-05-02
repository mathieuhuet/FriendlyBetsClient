import axios from 'axios';
import {REACT_APP_USER_API} from '@env'
const API = REACT_APP_USER_API
? REACT_APP_USER_API
: 'http://127.0.0.1:5000/user';


export const logoutUser = (accessToken:string) => {
  return new Promise((resolve, reject) => {
    console.log(API);
    console.log(accessToken);
    axios.post(
      `${API}/logout`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
        reject(err);
      }
    })
  })
}