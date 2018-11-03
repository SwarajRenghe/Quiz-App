import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './CreateQuestion.css';

class CreateQuestion extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          title: "",
          genre: "",
        },
        sessionData: {
          email: window.sessionStorage.getItem('email'),
        },
        genre: "",
        tickedNothing: true,
        addedQuiz: false,
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleQuizChange = this.handleQuizChange.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();
      if (this.state.formData.answers1 == false && this.state.formData.answers2 == false 
        && this.state.formData.answers3 == false && this.state.formData.answers4 == false) {
        this.setState({tickedNothing: false});
      }
      else {
        this.setState({tickedNothing: true});
        console.log(this.state.formData)
        console.log(this.state.formData)
        fetch('http://localhost:8080/createQuiz', {
          method: 'POST',
          body: JSON.stringify(this.state.formData),
        }).then(response => response.json())
            .then(
              data => {
                this.setState({addedQuiz: true});
                setTimeout(function() {
                  window.location = "http://localhost:3000/"
                  }, 2000);
                }
            );
      }
    }
    handleQuizChange (event) {
      this.state.formData.title = event.target.value
    }

    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        this.props.history.push('/')
      }
      if (window.sessionStorage.getItem("isAdmin") == "false") {
        this.props.history.push('/')
      }
      this.state.formData.genre = this.props.match.params.genre;
      console.log(this.state.formData.genre)
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
          <h1 class="display-4 heading"> Add a Quiz to { this.props.match.params.genre } </h1>
          <form class="form" onSubmit = { this.handleSubmit }>
            <div class="form-group all extraWidth">
              <label for="Question"> Quiz! </label>
              <input required placeholder="Enter Quiz Title" class="form-control" id="Question" type="text" onChange={this.handleQuizChange}/>
            </div>
            <button type="submit" class="btn btn-primary btn-lg"> Add Quiz </button>
          </form>
          {this.state.addedQuiz &&
            <div>
              <h2>
                Quiz successfully added to genre { this.props.match.params.genre }.
              </h2>
            </div>
          }
        </div>
      );
    }

}

export default CreateQuestion;