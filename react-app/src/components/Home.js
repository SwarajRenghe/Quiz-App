import React, { Component } from 'react';
import { Redirect } from 'react-router';

import './Home.css';
import Login from './Login';
import Register from './CreateUser';

class Home extends React.Component {
    constructor() {
      super();
      this.goToLogin = this.goToLogin.bind(this);
      this.goToRegister = this.goToRegister.bind(this);
    }

    goToLogin (event) {
      this.props.history.push('/login')
    }
    
    goToRegister (event) {
      this.props.history.push('/register')
    }
    
    render() {
      return (
        <div>
          <br/><br/>
          <h1 class="display-4 text-center"> Welcome to Quiz App! </h1>
            <div class="container centre">
              <div class="row">
                <button type="button" class="btn btn-primary btn-lg mx-auto centre element" onClick={this.goToLogin}>
                  Login 
                </button>
                <div class="w-100"></div>
                <button type="button" class="btn btn-primary btn-lg mx-auto centre element" onClick={this.goToRegister}> 
                  Register 
                </button>
              </div>
            </div> 
        </div>
      );
    }
}

export default Home;
