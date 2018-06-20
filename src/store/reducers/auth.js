import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  error: null,
  loading: false,
  authRedirectPath: '/',
  userId: null,
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    token: action.idToken,
    userId: action.userId,
    userEmail: action.userEmail
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  }
}

const signOut = (state, action) => {
  return {
    ...state,
    userId: null,
    token: null,
    userEmail: null,
    error: null,
    loading: false,
  }
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.SIGN_OUT: return signOut(state, action);
    default: return state;
  }
}

export default reducer;