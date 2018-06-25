import React, { Component } from 'react';
import Spinner from '../../components/Shared/Spinner/Spinner';
import './Portfolio.css'
import PieChart from '../../components/PieChart/PieChart';

class Portfolio extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({loading: false})
    }, 1000);
    // GET portfolio data, save in state? In Redux?
  }

  render() {
    let portfolio = undefined;
    if (!this.state.loading) {
      portfolio =  (
        <div>
          <h1>Value: $12,213.34</h1>
          <p>Biggest Daily Gainer: BTC ( +4.44% ) | Biggest Daily Loser: BCH ( -2.34% )</p>
          <a style={{'color':'#0074D9'}}><strong>Add coins or edit your holdings</strong></a>
          <PieChart />
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