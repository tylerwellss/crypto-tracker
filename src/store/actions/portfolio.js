import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchPortfolioStart = () => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_START
  };
};

export const fetchPortfolioSuccess = (holdings) => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_SUCCESS,
    holdings: holdings,
  };
};

export const fetchPortfolioFail = (error) => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_FAIL,
    error: error,
  }
}

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
      for (let i = 0; i < fetchedHoldings.length; i++) {
        axios.get('http://coincap.io/page/' + fetchedHoldings[i].coin)
          .then(response => {
            fetchedHoldings[i].price = response.data.price;
            fetchedHoldings[i].cap24hrChange = response.data.cap24hrChange
            fetchedHoldings[i].market_cap = response.data.market_cap;
            fetchedHoldings[i].volume = response.data.volume;
            fetchedHoldings[i].holdingsValue = response.data.price * fetchedHoldings[i].amount;
            fetchedHoldings[i].value = 1
        })
        if (i == fetchedHoldings.length - 1) {
          setTimeout(() => {
            dispatch(fetchPortfolioSuccess(fetchedHoldings))
          }, 1000)
        }
      }
    })
    .catch(error => {
      dispatch(fetchPortfolioFail(error))
    })
  }
}