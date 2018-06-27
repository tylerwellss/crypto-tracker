import React, { Component } from 'react';
import Spinner from '../../components/Shared/Spinner/Spinner';
import './Portfolio.css'
import PieChart from '../../components/PieChart/PieChart';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import PortfolioTable from '../../components/PortfolioTable/PortfolioTable';
import DiversificationTable from '../../components/DiversificationTable/DiversificationTable';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Portfolio extends Component {
  
  componentDidMount() {
    this.props.onFetchPortfolio(localStorage.getItem('userId'))
  }

  render() {
    let portfolio = <Spinner />

    const numberWithCommas = (x, type) => {
      return type === 'noDecimals'
      ?  x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    if (!this.props.loading) {
      portfolio =  (
        <div className="Portfolio">
          {/* <h1>Value: ${numberWithCommas(this.state.portfolioValue)}<span style={{'fontSize':'12px', 'paddingLeft':'10px'}}>( + 6.9% / $1,337 )</span></h1> */}
          <Link to={routes.EDIT_PORTFOLIO} style={{'color':'#0074D9'}}><strong>Edit your holdings</strong></Link>
          <PortfolioTable data={this.props.holdings} loading={this.props.loading}/>
          <div className="FlexRow" style={{'marginTop':'24px'}}>
            <div className="FlexColumn">
              {/* <PieChart data={this.props.holdings}/> */}
            </div>
            <div className="FlexColumn">
              {/* <DiversificationTable data={this.props.holdings} /> */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="Portfolio">
        {portfolio}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    holdings: state.portfolio.holdings,
    loading: state.portfolio.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPortfolio: (userId) => dispatch(actions.fetchPortfolio(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);