import React, { Component } from 'react';
import Spinner from '../../components/Shared/Spinner/Spinner';
import './Portfolio.css'
import PieChart from '../../components/PieChart/PieChart';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import axios from 'axios';

class Portfolio extends Component {
  state = {
    loading: true,
    holdings: [],
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
        this.setState({holdings: fetchedHoldings, loading: false})
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false})
      })
  }

  render() {
    let portfolio = undefined;
    if (!this.state.loading) {
      portfolio =  (
        <div className="Portfolio">
          <h1>Value: $12,213.34</h1>
          <p>Biggest Daily Gainer: BTC ( +4.44% ) | Biggest Daily Loser: BCH ( -2.34% )</p>
          <Link to={routes.EDIT_PORTFOLIO} style={{'color':'#0074D9'}}><strong>Add coins or edit your holdings</strong></Link>
          <PieChart data={this.state.holdings}/>
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