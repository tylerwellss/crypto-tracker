import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Register from '../../components/Register/Register';
import SignIn from '../../components/SignIn/SignIn';

class UserAuth extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs 
          value={value} 
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{'marginTop':'84px'}}
          >
          <Tab label="Register" />
          <Tab label="Sign In" />
        </Tabs>
        {value === 0 && <Register />}
        {value === 1 && <SignIn />}
      </div>
    );
  }
};

export default UserAuth;