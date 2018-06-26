import React, { Component } from 'react';
import Spinner from '../../components/Shared/Spinner/Spinner';
import './Portfolio.css'
import PieChart from '../../components/PieChart/PieChart';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import axios from 'axios';
import PortfolioTable from '../../components/PortfolioTable/PortfolioTable';
import DiversificationTable from '../../components/DiversificationTable/DiversificationTable';

class Portfolio extends Component {
  state = {
    loading: true,
    holdings: [],
    diversificationData: [],
    portfolioValue: 'Loading...'
  };

  componentDidMount() {
    // TODO: Move this to redux
    axios.get('https://track-my-crypto.firebaseio.com/portfolios/' + localStorage.getItem('userId') + '/holdings.json')
      .then(response => {
        let fetchedHoldings = [];
        for (let key in response.data) {
          fetchedHoldings.push({
            ...response.data[key],
        })};
        for (let i = 0; i < fetchedHoldings.length; i++) {
          console.log('loop #' + i)
          axios.get('http://coincap.io/page/' + fetchedHoldings[i].coin)
            .then(response => {
              fetchedHoldings[i].price = response.data.price;
              fetchedHoldings[i].cap24hrChange = response.data.cap24hrChange
              fetchedHoldings[i].market_cap = response.data.market_cap;
              fetchedHoldings[i].volume = response.data.volume;
              fetchedHoldings[i].holdingsValue = response.data.price * fetchedHoldings[i].amount;
              fetchedHoldings[i].value = (response.data.price * fetchedHoldings[i].amount).toFixed(2);
          })
          .then(() => {
            let sum = 0;
            for (let i = 0; i < fetchedHoldings.length; i++) {
              sum = sum + fetchedHoldings[i].holdingsValue
            }
            this.setState({holdings: fetchedHoldings, loading: false, portfolioValue: sum})
          })
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({loading: false})
      })
  }

  render() {
    let portfolio = undefined;

    const numberWithCommas = (x, type) => {
      return type === 'noDecimals'
      ?  x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    if (!this.state.loading) {
      portfolio =  (
        <div className="Portfolio">
          <h1>Value: ${numberWithCommas(this.state.portfolioValue)}<span style={{'fontSize':'12px', 'paddingLeft':'10px'}}>( + 6.9% / $1,337 )</span></h1>
          <p>Biggest Daily Gainer: BTC ( +4.44% ) | Biggest Daily Loser: BCH ( -2.34% )</p>
          <Link to={routes.EDIT_PORTFOLIO} style={{'color':'#0074D9'}}><strong>Edit your holdings</strong></Link>
          <PortfolioTable data={this.state.holdings}/>
          <div className="FlexRow" style={{'marginTop':'24px'}}>
            <div className="FlexColumn">
              <PieChart data={this.state.holdings}/>
            </div>
            <div className="FlexColumn">
              <DiversificationTable data={this.state.holdings} />
            </div>
          </div>
        </div>
      );
    } else {
      portfolio = <Spinner />
    }

    return (
      <div className="Portfolio">
        {portfolio}
      </div>
    );
  };
};

export default Portfolio;