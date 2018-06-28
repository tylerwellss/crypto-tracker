import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  error: null,
  loading: true,
  holdings: undefined,
  portfolioValue: undefined,
};

const fetchPortfolioStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const fetchPortfolioSuccsess = (state, action) => {
  return {
    ...state,
    holdings: action.holdings,
    portfolioValue: action.portfolioValue,
    loading: false,
    error: null,
  };
};

const fetchPortfolioFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const addCoinStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const addCoinSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const addCoinFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };  
};

const deleteCoinStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const deleteCoinSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const deleteCoinFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.FETCH_PORTFOLIO_START: return fetchPortfolioStart(state, action);
    case actionTypes.FETCH_PORTFOLIO_SUCCESS: return fetchPortfolioSuccsess(state, action);
    case actionTypes.FETCH_PORTFOLIO_FAIL: return fetchPortfolioFail(state, action);
    case actionTypes.ADD_COIN_START: return addCoinStart(state, action);
    case actionTypes.ADD_COIN_SUCCESS: return addCoinSuccess(state, action);
    case actionTypes.ADD_COIN_FAIL: return addCoinFail(state, action);
    case actionTypes.DELETE_COIN_START: return deleteCoinStart(state, action);
    case actionTypes.DELETE_COIN_SUCCESS: return deleteCoinSuccess(state, action);
    case actionTypes.DELETE_COIN_FAIL: return deleteCoinFail(state, action);
    default: return state;
  };
};

export default reducer;