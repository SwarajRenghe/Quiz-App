import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './Dashboard.css';
import Admin from './Admin';

class Dashboard extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          email: window.sessionStorage.getItem('email'),
        },
        data: [],
        scoreData: [],
      }
    }

    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        this.props.history.push('/')
      }
      fetch('http://localhost:8080/getPerson', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      }).then(response => { 
            return response.json() 
          })
          .then(
            data => {
              this.setState ({data: data}) 
            }
          );

      fetch('http://localhost:8080/getScoresFromAttemptedQuizzes', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      }).then(
          response => { 
              return response.json() 
            }).then(
              data => {
                this.setState ({scoreData: data}) 
             }
            );
    }

    renderAdminVerification() {
       if(window.sessionStorage.getItem("isAdmin") == 'true') {
         return (
            <div class="container centre text-centre">
              <div class="row">
                <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You are an admin. </div>
              </div>
            </div> 
         );
       } else {
         return (
            <div>  </div>
         );
       }
    }

    renderAdminControl() {
         return (
            <div>
            <Admin/>
            </div>
         );
    }

    renderScore() {
      if(window.sessionStorage.getItem("isAdmin") != 'true') {
        return (
          <div>
            <h5 class="text-center"> Here are your stats </h5>
           <table class="table table-striped table-dark score-table text-center">
             <thead>
               <tr>
                <th scope="col"> Quiz Title </th>
                <th scope="col"> Score </th>
               </tr>
             </thead>
             <tbody>{this.state.scoreData.map(function(item, key) {
                  return (
                     <tr>
                        <th scope="row"> { item.title } </th>
                        <th scope="row"> { item.score } </th>                  
                     </tr>
                   )
                })}

             </tbody>
          </table>
         </div>
        )
      }
    }

    render() {
      return (
        <div>
          <br/><br/>
          <h1 class="display-4 text-center"> Welcome {this.state.data.username}! </h1>
        <br/>
          { this.renderAdminVerification() }
          <br/>
          { this.renderScore() }
          { this.renderAdminControl() }
        </div>
      );
    }
}

export default Dashboard;
