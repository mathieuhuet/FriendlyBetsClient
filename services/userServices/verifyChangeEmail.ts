import axios from 'axios';
import { FRIENDLYBETS_USER_API } from '../../secret';
const API = FRIENDLYBETS_USER_API
? FRIENDLYBETS_USER_API
: 'http://192.168.1.5:10101/user';

export const verifyChangeEmail = (data, accessToken: string) => {
  return new Promise((resolve, reject) => {
    console.log(API);
    axios.put(
      `${API}/verifyChangeEmail`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
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