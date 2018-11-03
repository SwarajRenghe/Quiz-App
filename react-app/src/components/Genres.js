import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './Genres.css';

class Genres extends React.Component {
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
      // this.handleSubmit = this.handleSubmit.bind(this);
      // this.temp = this.temp.bind(this);
    }

    // handleSubmit (event) {
    //   event.preventDefault();
    // }

    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        this.props.history.push('/')
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

    render() {
      return (
        <div class="centre">
          <br/><br/>
          <h1 class="display-4 heading"> All Genres! </h1>


          { this.state.genreData.map (
              function (item, key) {
                return (
                  <div>
                  <table class="table table-striped score-table text-center">
                    <tbody>
                      <tr>
                        <tr scope="row"> 
                        <a href= {'/Quiz/' + item.genre } > 
                          <button type="button" class="btn btn-primary btn-lg element"> 
                            { key+1 }. { item.genre }
                          </button>
                        </a>
                        </tr>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                )
              }
            )}


        </div>
      );
    }

}

export default Genres;