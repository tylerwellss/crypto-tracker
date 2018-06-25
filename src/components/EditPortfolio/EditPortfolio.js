import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import HoldingsTable from '../HoldingsTable/HoldingsTable';
import axios from 'axios';
import Spinner from '../Shared/Spinner/Spinner';

import './EditPortfolio.css'

class EditPortfolio extends Component {
  state = {
    holdings: [],
    coin: '',
    amount: 0,
    loading: true
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

  handleClick = (event) => {
    this.setState({loading: true});
    const payload = {
      coin: this.state.coin,
      amount: this.state.amount,
      value: this.state.amount,
      label: this.state.coin
    }
    axios.post('https://track-my-crypto.firebaseio.com/portfolios/' + localStorage.getItem('userId') + '/holdings.json', payload)
      .then(response => {
        this.setState({loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
      })
  }
 
  render() {
    let holdings = undefined;
    if (this.state.holdings.length > 0) {
      holdings = (
        Object.keys(this.state.holdings).map((key, index) => {
          const myHolding = this.state.holdings[key]
          return <p key={index}>{myHolding.amount} {myHolding.coin}</p>
        })
      )
    }
    return (
      <div className="EditPortfolio FlexRow">
        <div className="FlexColumn">
          <HoldingsTable holdings={this.state.holdings}/>
        </div>
        <div className="FlexColumn AddCoin">
          <p><strong>Add to your portfolio</strong></p>
          <TextField 
            id="coin"
            name="coin"
            label="Coin to Add"
            type="text"
            placeholder="Coin name"
            value={this.state.coin}
            onChange={(event) => this.setState({coin: event.target.value})}
          />
          <TextField 
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            placeholder="#"
            value={this.state.value}
            onChange={(event) => this.setState({amount: event.target.value})}
          />
          <Button
            onClick={this.handleClick}
            variant="contained"
            color="primary"
            style={{'margin':'20px 25% 10px 25%'}}
          >
            Add
          </Button>
          {this.state.loading ? <Spinner /> : null}
        </div>
      </div>
    );
  };
};

export default EditPortfolio;