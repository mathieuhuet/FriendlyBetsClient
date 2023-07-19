import axios from 'axios';
import { FRIENDLYBETS_BET_API } from '../../secret';
const API = FRIENDLYBETS_BET_API
? FRIENDLYBETS_BET_API
: 'http://192.168.1.5:10101/bet';

export const checkJoinABet = (betId, accessToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${API}/checkJoinABet`, 
        betId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const { data } = response;
      resolve(data);
    } catch (error) {
      reject(error)
    }
  })
}