import axios from 'axios';
const API = process.env.REACT_APP_BET_API
? process.env.REACT_APP_BET_API
: 'http://127.0.0.1:5000/bet';

export const getParticipants = (betId, accessToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${API}/getParticipants`, 
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