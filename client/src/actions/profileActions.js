import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS , GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types';
export const getCurrentProfile=()=>dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res => dispatch({
        type:GET_PROFILE,
        payload:res.data
    }))
    .catch(err =>dispatch({
        type:GET_PROFILE,
        payload:{}
    }))
};

//profile loading
export const setProfileLoading=()=>{
return {
    type: PROFILE_LOADING
}
};
//profile clear
export const clearCurrentProfile=()=>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
    };
