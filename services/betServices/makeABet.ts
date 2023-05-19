import axios from 'axios';
const API = process.env.REACT_NATIVE_BET_API
? process.env.REACT_NATIVE_BET_API
: 'http://127.0.0.1:5000/bet';

export const makeABet = (sendData, accessToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${API}/makeABet`, 
        sendData,
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