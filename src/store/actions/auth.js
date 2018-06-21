import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.SIGN_OUT
  };
};

export const auth = (email, password, method) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCHcrcMy0M2qj3Kf5o4Yo4Rkg3u34dLgMM'
    if (method === 'register') {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCHcrcMy0M2qj3Kf5o4Yo4Rkg3u34dLgMM'
    }
    dispatch(authStart());
    axios.post(url, authData)
      .then(response => {
        console.log('*** AUTH RESPONSE ***')
        console.log(response);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}