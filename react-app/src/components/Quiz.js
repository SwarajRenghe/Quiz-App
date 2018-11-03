import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './Quiz.css';
import Genres from './Genres';
import QuizzesOfAGenre from './QuizzesOfAGenre';

class Quiz extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          genre: ""
        },
        sessionData: {
          email: window.sessionStorage.getItem('email'),
        },
        userdata: {},
        genreData: [],
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();
    }

    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        window.location = "http://localhost:3000/"        
      }
      fetch('http://localhost:8080/getPerson', {
        method: 'POST',
        body: JSON.stringify(this.state.sessionData),
      }).then(response => response.json())
          .then(
            data => {
              this.setState ({userdata: data}) 
            }
          );
      fetch('http://localhost:8080/getGenres',)
        .then(response => response.json())
          .then(
            data => {
              this.setState ({genreData: data}) 
              console.log(this.state.genreData)
            }
          );
      }

    renderGeneric (s) {
      console.log("s->" + s)
      return (
          <div> { s } </div>
        )
    }

    temp () {
      var a = window.location.href
      var count = 0
      for (var i = 0; i < a.length; i++) {
        if (a[i] == '/') {
          count++;
        }
      }
      if (count == 3) {
        return (
          <div> <Genres/> </div>
        )
      }
    }

    adminCreateGenreButton () {
      if (window.sessionStorage.getItem("isAdmin") == "true") {
        return (
          <a href={'/CreateGenre/'} >
            <button type="button" class="btn btn-danger btn-lg element"> 
              Create Genre
            </button>
          </a>
        )
      }
    }
 
    render() {
      return (
        <div class="centre">
          <Router>
            <div>
              <br/><br/>
              <a href= {'/'} > 
                <button type="button" class="btn btn-danger"> 
                  "Go Back to Dashboard"
                </button>
              </a>
              <Genres/>

          { this.adminCreateGenreButton() }

            </div>
          </Router>
        </div>
      );
    }

}

export default Quiz;