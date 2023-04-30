import axios from 'axios';
import {REACT_APP_USER_API} from '@env'
const API = REACT_APP_USER_API
? REACT_APP_USER_API
: 'http://127.0.0.1:5000/user';

export const updateUserInfo = () => {
  
};