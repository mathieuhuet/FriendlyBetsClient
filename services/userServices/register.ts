import axios from 'axios';
const API = process.env.REACT_NATIVE_USER_API
? process.env.REACT_NATIVE_USER_API
: 'http://127.0.0.1:5000/user';

export const registerUser = (data) => {
  return new Promise((resolve, reject) => {
    console.log(API);
    axios.post(
      `${API}/register`, 
      data,
      {
        headers: {
          "Content-Type": "application/json"
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