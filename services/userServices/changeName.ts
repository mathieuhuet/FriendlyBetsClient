import axios from 'axios';
const API = process.env.FRIENDLYBETS_USER_API
? process.env.FRIENDLYBETS_USER_API
: 'http://127.0.0.1:5000/user';

export const changeName = (data, accessToken: string) => {
    return new Promise((resolve, reject) => {
        console.log(API);
        axios.put(
          `${API}/changeName`, 
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
};