import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Register.css'
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Spinner from '../Shared/Spinner/Spinner'

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    // disabled: true
  };

  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password, 'register');
    console.log(this.props)
  }

  handleInput = (event, field) => {
    if (field === 'email') {
      this.setState({email: event.target.value})
    } else if (field === 'password') {
      this.setState({password: event.target.value})
    } else if (field === 'password2') {
      this.setState({password2: event.target.value})
    }
    // Add validation
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
        <p>Register Account</p>
          <TextField 
            className="TextField"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={this.state.email}
            onChange={(event, field) => this.handleInput(event, 'email')}
          />
          <TextField 
            className="TextField"
            id="password"
            name="password"
            label="Password"
            value={this.state.password}
            onChange={(event, field) => this.handleInput(event, 'password')}
            type="password"
          />
          <TextField 
            className="TextField"
            id="password2"
            name="password2"
            label="Confirm your password"
            value={this.state.password2}
            onChange={(event, field) => this.handleInput(event, 'password2')}
            type="password"
          />
          <Button disabled={this.state.disabled} variant="contained" color="primary" onClick={this.handleSubmit}>
            Register
          </Button>
          {error}
        </form>
        {spinner}
        <p>Already registered? <Link to='/sign-in'>Click here</Link> to sign in</p>
      </div>
    );
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);