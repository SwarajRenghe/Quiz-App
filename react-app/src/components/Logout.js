import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Router } from 'react-router';
import './Logout.css';

class Logout extends React.Component {
    constructor() {
      super();
      this.state = {
      }
    }

    componentDidMount() {
      console.log("hello")
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        this.props.history.push('/')
      }
      sessionStorage.removeItem('email');
      window.sessionStorage.setItem('loggedIn', 'false');
      window.sessionStorage.setItem('isAdmin', 'false');
      window.location = "http://localhost:3000/"
    }

    render() {
      return (
        <div>
        </div>
      );
    }
}

export default Logout;
