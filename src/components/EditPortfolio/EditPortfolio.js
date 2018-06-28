import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import HoldingsTable from '../HoldingsTable/HoldingsTable';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../Shared/Spinner/Spinner';
import './EditPortfolio.css'

class EditPortfolio extends Component {
  state = {
    coin: '',
    amount: 0,
  };

  componentDidMount() {
    this.props.onFetchPortfolio(localStorage.getItem('userId'));
  }

  handleClick = (event) => {
    const payload = {
      coin: this.state.coin.toUpperCase(),
      amount: this.state.amount,
      label: this.state.coin.toUpperCase(),
    }
    this.props.onAddCoin(localStorage.getItem('userId'), payload)
  }
 
  render() {
    console.log('render', this.props.loading)
    let editPortfolio = (
      <div className="EditPortfolio FlexRow" style={{'justifyContent':'center'}}>
        <Spinner />
      </div>
    )
    if (!this.props.loading) {
      editPortfolio = (
        <div className="EditPortfolio FlexRow">
          <div className="FlexColumn">
            <HoldingsTable data={this.props.holdings}/>
          </div>
          <div className="FlexColumn AddCoin">
            <p><strong>Add to your portfolio</strong></p>
            <TextField 
              id="coin"
              name="coin"
              label="Coin to Add"
              type="text"
              placeholder="Coin name"
              inputProps={{ maxLength: 4 }}
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
          </div>
        </div>
      )
    }
    return (
      <div>
        {editPortfolio}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    holdings: state.portfolio.holdings,
    loading: state.portfolio.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPortfolio: (userId) => dispatch(actions.fetchPortfolio(userId)),
    onAddCoin: (userId, payload) => dispatch(actions.addCoin(userId, payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPortfolio);