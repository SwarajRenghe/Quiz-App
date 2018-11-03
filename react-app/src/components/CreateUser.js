import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './CreateUser.css';

class CreateUser extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          username: "",
          password: "",
          email: "",
          score: 0,
          isadmin: false,
        },
      }
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange (event) {
      this.state.formData.username = event.target.value;
    }

    handlePasswordChange (event) {    
      this.state.formData.password = event.target.value;
    }

    handleEmailChange (event) {    
      this.state.formData.email = event.target.value;
    }

    handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8080/createUser', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
     })
        .then(response => response.json()).then(
            data => { 
              window.sessionStorage.setItem('loggedIn', 'true');
              window.sessionStorage.setItem('email', data.Email);
              window.location = "http://localhost:3000/"
            });


      this.props.history.push('/')
    }


    render() {
      return (
        <div>
          <h1 class="display-7 heading"> Register! </h1>
          <form class="form" onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label for="Name"> Enter your name! </label>
              <input type="text" required class="form-control" id="Name" aria-describedby="textHelp" placeholder="Enter Name" onChange={this.handleUsernameChange}/>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1"> Enter your Email! </label>
              <input type="email" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailChange}/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"> Enter a Password! </label>
              <input type="password" required class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePasswordChange}/>
              <small id="passwordHelpBlock" class="form-text text-muted">
                Your password is recommended to be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </small>
            </div>
            <button type="submit" class="btn btn-primary btn-lg"> Register </button>
          </form>
        </div>
      );
    }

}

export default CreateUser;