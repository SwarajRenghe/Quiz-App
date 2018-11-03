import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Router } from 'react-router';
import './Login.css';

class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          email: "",
          password: "",
        },
        userID: null,
        failed: false,
        authenticated: false,
      }
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange (event) {
      this.state.formData.email = event.target.value;
    }

    handlePasswordChange (event) {    
      this.state.formData.password = event.target.value;
    }

    handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
     }).then(
          response => {
            if (response.ok == true) {
              window.sessionStorage.setItem('loggedIn', 'true');
            }
            // else {
            //   alert("incorrect password")
            //   this.props.history.push('/')
            return response.json();
          }
        )
          .then(
            data => { 
              if (window.sessionStorage.getItem('loggedIn') == "true") { 
                if (data.Email == "swaraj@swaraj.com") {
                  window.sessionStorage.setItem('isAdmin', 'true');
                }
                window.sessionStorage.setItem('loggedIn', 'true');
                window.sessionStorage.setItem('email', data.Email);
                window.location = "http://localhost:3000/"
              }
            });
    };


    render() {
      return (
        <div>
        <h1 class="display-7 heading"> Login! </h1>
          <form class="form" onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1"> Email </label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailChange}/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePasswordChange}/>
            </div>
            <button type="submit" class="btn btn-primary btn-lg"> Submit </button>
          </form>
        {this.state.failed &&
          <div>
            <h2>
              Invalid Login!
            </h2>
          </div>
        }
        </div>
      );
    }

}

export default Login;
