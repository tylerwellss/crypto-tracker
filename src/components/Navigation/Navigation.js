import React from 'react';
import './Navigation.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Icon from '@material-ui/core/Icon';


const navigation = (props) => {
  let authLinks = (
    <Toolbar>
    <Link to="/"><Icon>home</Icon></Link>
    {/* <Link to="/">Biggest Winners/Losers</Link>
    <Link to="/">Distance to ATH</Link> */}
    <div className="Spacer"></div>
    <Link to="/portfolio">My Portfolio</Link>
    <Icon style={{'color':'black'}}onClick={props.onSignOut}>account_circle</Icon>
    </Toolbar>
  );

  let unAuthLinks = (
    <Toolbar>
    <Link to="/"><Icon>home</Icon></Link>
    <div className="Spacer"></div>
    <Link to="/sign-in">Sign In / Register</Link>
    </Toolbar>
  );
  
  return (
    <AppBar className="AppBar">
      {props.authUser !== null ? authLinks : unAuthLinks}
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigation);