import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './SignIn.css'
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';

class SignIn extends Component { 
  state = {
    email: '',
    password: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password, false);
  }

  render() {
    let error = undefined;
    let spinner = undefined;
    if (this.props.error) {
      error = <p>Error: {this.props.error.message}</p>
    }

    if (this.props.loading) {
      spinner = <Spinner />
    }

    return (
      <div style={{'textAlign':'center'}}>
        <form className="RegisterForm">
        <p><strong>Sign in to your acount</strong></p>
          <TextField 
            className="TextField"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={this.state.email}
            onChange={event => this.setState({email: event.target.value})}
          />
          <TextField 
            className="TextField"
            id="password"
            name="password"
            label="Password"
            value={this.state.password}
            onChange={event => this.setState({password: event.target.value})}
            type="password"
          />
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            Sign In
          </Button>
          {error}
        </form>
        {spinner}
        <p>Not signed up? <Link to='/register'>Click here</Link> to register</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);