import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import './Admin.css';
import CreateUser from './CreateUser';


class Admin extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          email: window.sessionStorage.getItem('email'),
        },
        data: [],
      }
    }

    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        this.props.history.push('/')
      }
      fetch('http://localhost:8080/getPerson', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      }).then(response => response.json())
          .then(
            data => {
              this.setState ({data: data}) 
            }
          );
    }

    renderAdminQuizPanel() {
      if(window.sessionStorage.getItem("isAdmin") == 'true') {
        return (
           <table class="table table-striped score-table text-center">
             <tbody>
               <tr>
                 <tr scope="row"> 
                   <Link class="nav-link" to={'/Quiz'}> 
                     <button type="button" class="btn btn-primary btn-lg score-table"> 
                       Quizzes 
                     </button>
                   </Link>
                 </tr>
               </tr>
             </tbody>
             <br/><br/>
           </table>
        );
      } else {
        return (
           <div>  </div>
        );
      }
    }

    renderUserQuizPanel() {
      if(window.sessionStorage.getItem("isAdmin") == 'false') {
        return (
                   <Link class="nav-link" to={'/Quiz'}> 
                     <button type="button" class="btn btn-primary btn-lg score-table"> 
                       View Quizzes 
                     </button>
                   </Link>
        );
      } else {
        return (
           <div> </div>
        );
      }
    }

    renderAdminUserPanel() {
      if(window.sessionStorage.getItem("isAdmin") == 'true') {
        return (
            <table class="table table-striped score-table text-center">
              <tbody>
                <tr>
                  <tr scope="row">
                  <a href="/viewPeople" class="nav-link"> 
                    <button type="button" class="btn btn-primary btn-lg score-table "> 
                       Users 
                    </button>
                  </a>
                  </tr>
                </tr>
              </tbody>
            </table>
        );
      } else {
        return (
           <div>  </div>
        );
      }
    }

    renderAdminDetails () {
      if(window.sessionStorage.getItem("isAdmin") == 'true') {
        return (
            <div class="container-fluid text-center">
              <div class="row">
                <div class="col-sm">
                  <h1 class="display-5 text-center"> Quiz Management </h1>
                  <br/>
                  { this.renderAdminQuizPanel() }
                </div>
                <div class="col-sm">
                  <h1 class="display-5 text-center"> User Management </h1>
                  <br/>
                  { this.renderAdminUserPanel() }
                </div>
              </div>
            </div>
        );
      } else {
        return (
           <div>  </div>
        );
      }
    }

    renderUserDetails () {
      if(window.sessionStorage.getItem("isAdmin") == 'false') {
        return (
            <div class="container-fluid text-center">
              <div class="row">
                <div class="col-sm">
                  <h1 class="display-5 text-center"> Quiz Management </h1>
                  <br/>
                  { this.renderUserQuizPanel () }
                </div>
              </div>
            </div>
        );
      } else {
        return (
           <div> </div>
        );
      }
    }

    render() {
      return (
        <div>
          <br/><br/>
          { this.renderAdminDetails () }
          { this.renderUserDetails () }
        </div>
      );
    }
}

export default Admin;
