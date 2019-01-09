import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS , SET_CURRENT_USER} from './types';
//register
export const registeruser= (userData,history)=> dispatch => {
    axios.post('/api/users/register',userData)
    .then(res=>history.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data})
        );
   
};
export const loginUser=(userData) => dispatch => {
    axios.post('/api/users/login',userData)
    .then(res =>{
//save to local storage
const {token} =res.data;
//set token to local storage
localStorage.setItem('jwtToken',token);
//auth token to header
setAuthToken(token);
//decode token to get user data
const decoded =jwt_decode(token);
//set current user
dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};
//set loged in user
export const setCurrentUser=(decoded)=>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    };
};