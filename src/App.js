import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './containers/Landing/Landing';
import * as routes from './constants/routes'
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Portfolio from './containers/Portfolio/Portfolio';
import Cryptocurrency from './containers/Cryptocurrency/Cryptocurrency';
import Auth from './containers/UserAuth/UserAuth'

class App extends Component {

  componentDidMount() {
    if (this.props.storedUser === null) {
      this.props.ifNoStoredUser();
    } else {
      this.props.ifStoredUser(localStorage.getItem('token'), localStorage.getItem('userId'));
    }
  }

  render() {
    return (
      <Router className="App">
        <div>
          <Navigation />
          <Route path='/' exact
            component={() => <Landing />} 
          />
          <Route exact path={routes.SIGN_IN}
            component={() => <Auth />} 
          />
          <Route exact path={routes.PORTFOLIO}
            component={() => <Portfolio />} 
          />
          <Route path={routes.CRYPTOCURRENCY}
            component={Cryptocurrency}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    storedUser: localStorage.getItem('userId')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ifNoStoredUser: () => dispatch(actions.signOut()),
    ifStoredUser: (token, userId) => dispatch(actions.authSuccess(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);