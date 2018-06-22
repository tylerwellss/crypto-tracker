import React, { Component } from 'react';
import './Cryptocurrency.css';
// import * as data from './MockData.json';
import Spinner from '../../components/Shared/Spinner/Spinner';
import CoinBrief from '../../components/CoinBrief/CoinBrief';
import CoinLinks from '../../components/CoinLinks/CoinLinks';
import CoinChart from '../../components/CoinChart/CoinChart';
import axios from 'axios';

class Cryptocurrency extends Component {
  state = {
    coinName: null,
    coinData: null
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({coinName: this.props.match.params.id, coinData: data});
    // }, 1000)
    axios.get('http://coincap.io/page/' + this.props.match.params.id.toUpperCase())
      .then(response => {
        this.setState({coinData: response.data, coinName: this.props.match.params.id})
      })
  };

  render() {
    let cryptocurrency = undefined;
    if (this.state.coinData == null) {
      cryptocurrency = <div style={{'textAlign':'center'}}><Spinner /></div>
    } else {
      cryptocurrency = (
        <div>
        <div className="FlexRow">
        <CoinBrief 
          coinData={this.state.coinData}
        />
        </div>
        <hr/>
        <div className="FlexRow">
          <div className="CoinLinksColumn">
            <CoinLinks 
              coinName={this.state.coinData.long}
            />
          </div>
          <div className="FlexColumn">
            <CoinChart 
              coinData={this.state.coinData}
            />
          </div>
        </div>
        </div>
      )
    }

    return (
      <div className="Cryptocurrency">
        {cryptocurrency}
      </div>
    );
  };
};

export default Cryptocurrency;