import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS,GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER,GET_PROFILES} from './types';
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
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('/api/profile/all')
      .then(res =>
        dispatch({
          type: GET_PROFILES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILES,
          payload: null
        })
      );
  };
//create profile
export const createProfile=(profileData,history)=>dispatch=>{
    axios.post('/api/profile',profileData)
    .then(res=>history.push('/dashboard'))
    .catch(err=> dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
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
    //add education
export const addEducation = (eduData, history) => dispatch => {
        axios
          .post('/api/profile/education', eduData)
          .then(res => history.push('/dashboard'))
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
      };
      export const addAchieve = (achData, history) => dispatch => {
        axios
          .post('/api/profile/achieve', achData)
          .then(res => history.push('/dashboard'))
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
      };

//add project
      export const addProject = (proData, history) => dispatch => {
        axios
          .post('/api/profile/project', proData)
          .then(res => history.push('/dashboard'))
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
      };


      // Add experience
export const addExperience = (expData, history) => dispatch => {
    axios
      .post('/api/profile/experience', expData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  // Delete Experience
export const deleteExperience = id => dispatch => {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const deleteAchieve = id => dispatch => {
    axios
      .delete(`/api/profile/achieve/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
//delect project
  export const deleteProject = id => dispatch => {
    axios
      .delete(`/api/profile/project/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  // Delete Education
  export const deleteEducation = id => dispatch => {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
//delete account
export const deleteAccount=()=> dispatch=>{
    if(window.confirm('are you sure ? this cannot be undone!!')){
        axios.delete('/api/profile')
        .then(res =>
            dispatch({
                type:SET_CURRENT_USER,
                payload:{}
            })).catch(err=> dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }));
    }
   
}    

