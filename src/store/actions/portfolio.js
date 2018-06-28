import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchPortfolioStart = () => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_START
  };
};

export const fetchPortfolioSuccess = (holdings, portfolioValue) => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_SUCCESS,
    holdings: holdings,
    portfolioValue: portfolioValue,
  };
};

export const fetchPortfolioFail = (error) => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_FAIL,
    error: error,
  };
};

export const fetchPortfolio = (userId) => {
  return dispatch => {
    dispatch(fetchPortfolioStart());
    let fetchedHoldings = [];
    let url = 'https://track-my-crypto.firebaseio.com/portfolios/' + userId + '/holdings.json'
    axios.get(url)
    .then(response => {
      for (let key in response.data) {
        fetchedHoldings.push({
          id: key,
          ...response.data[key],
      })};
      let portfolioValue = 0;
      for (let i = 0; i < fetchedHoldings.length; i++) {
        axios.get('http://coincap.io/page/' + fetchedHoldings[i].coin)
          .then(response => {
            fetchedHoldings[i].price = response.data.price;
            fetchedHoldings[i].cap24hrChange = response.data.cap24hrChange
            fetchedHoldings[i].market_cap = response.data.market_cap;
            fetchedHoldings[i].volume = response.data.volume;
            fetchedHoldings[i].holdingsValue = response.data.price * fetchedHoldings[i].amount;
            fetchedHoldings[i].value = (fetchedHoldings[i].holdingsValue).toFixed(2)
            portfolioValue = portfolioValue + fetchedHoldings[i].holdingsValue;
        })
        if (i == fetchedHoldings.length - 1) {
          setTimeout(() => {
            dispatch(fetchPortfolioSuccess(fetchedHoldings, portfolioValue))
          }, 3000)
        }
      }
    })
    .catch(error => {
      dispatch(fetchPortfolioFail(error))
    })
  };
};

export const addCoinStart = () => {
  return {
    type: actionTypes.ADD_COIN_START,
  };
};

export const addCoinSuccess = () => {
  return {
    type: actionTypes.ADD_COIN_SUCCESS
  };
};

export const addCoinFail = (error) => {
  return {
    type: actionTypes.ADD_COIN_FAIL,
    error: error,
  };
};

export const addCoin = (userId, payload) => {
  return dispatch => {
    dispatch(addCoinStart());
    axios.post('https://track-my-crypto.firebaseio.com/portfolios/' + userId + '/holdings.json', payload)
      .then(response => {
        dispatch(addCoinSuccess());
      })
      .catch(error => {
        dispatch(addCoinFail());
      })
  };
};

export const deleteCoinStart = () => {
  return {
    type: actionTypes.DELETE_COIN_START
  };
};

export const deleteCoinSuccess = () => {
  return {
    type: actionTypes.DELETE_COIN_SUCCESS
  };
};

export const deleteCoinFail = () => {
  return {
    type: actionTypes.DELETE_COIN_FAIL
  };
};

export const deleteCoin = (userId, coinId) => {
  return dispatch => {
    dispatch(deleteCoinStart())
    axios.delete('https://track-my-crypto.firebaseio.com/portfolios/' + userId + '/holdings/' + coinId + '.json')
      .then(response => {
        dispatch(deleteCoinSuccess())
      })
      .catch(error => {
        dispatch(deleteCoinFail(error))
      })
  };
};