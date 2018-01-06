import React, { Component } from 'react';
import MainAppWithStyles from "./main.js";
import StatusIndicator from './components/status-indicator/StatusIndicator';


class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
                <StatusIndicator />
                <MainAppWithStyles />
            </div>
         )
        }
      </div>
    );
  }
}

export default Home;
