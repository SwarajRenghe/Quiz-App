import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './CreateGenre.css';

class CreateGenre extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          genre: "",
        },
        sessionData: {
          email: window.sessionStorage.getItem('email'),
        },
        genre: "",
        addedQuiz: false,
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleGenreChange = this.handleGenreChange.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();

      console.log(this.state.formData)
      fetch('http://localhost:8080/createGenre', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      }).then(response => response.json())
          .then(
            data => {
              this.setState({addedGenre: true});
              setTimeout(function() {
                window.location = "http://localhost:3000/"
                }, 2000);
              }
          );
    }

    handleGenreChange (event) {
      this.state.formData.genre = event.target.value
    }

    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        this.props.history.push('/')
      }
      if (window.sessionStorage.getItem("isAdmin") == "false") {
        this.props.history.push('/')
      }
    }

    render() {
      return (
        <div class="centre">
        <a href= {'/Quiz/'+this.props.match.params.genre} > 
          <button type="button" class="btn btn-danger"> 
            "Go Back to Quizzes"
          </button>
        </a>
          <br/><br/>
          <h1 class="display-4 heading"> Add a Genre </h1>
          <form class="form" onSubmit = { this.handleSubmit }>
            <div class="form-group all extraWidth">
              <label for="Genre"> Genre! </label>
              <input required placeholder="Enter Genre Title" class="form-control" id="Genre" type="text" onChange={this.handleGenreChange}/>
            </div>
            <button type="submit" class="btn btn-primary btn-lg"> Add Genre </button>
          </form>
          {this.state.addedGenre &&
            <div>
              <h2>
                Genre successfully added!
              </h2>
            </div>
          }
        </div>
      );
    }

}

export default CreateGenre;