import React, { Component } from 'react';
import Spinner from '../../components/Shared/Spinner/Spinner';
import './Portfolio.css'

class Portfolio extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    /// Do something
    this.setState({loading: false});
  }

  render() {
    let portfolio = undefined;
    if (!this.state.loading) {
      portfolio = <p>Some Data</p>
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