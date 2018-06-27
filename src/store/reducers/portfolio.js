import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  error: null,
  loading: true,
  holdings: undefined,
};

const fetchPortfolioStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  }
}

const fetchPortfolioSuccsess = (state, action) => {
  return {
    ...state,
    holdings: action.holdings,
    loading: false,
    error: null,
  }
}

const fetchPortfolioFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  }
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.FETCH_PORTFOLIO_START: return fetchPortfolioStart(state, action);
    case actionTypes.FETCH_PORTFOLIO_SUCCESS: return fetchPortfolioSuccsess(state, action);
    case actionTypes.FETCH_PORTFOLIO_FAIL: return fetchPortfolioFail(state, action);
    default: return state;
  }
}

export default reducer;