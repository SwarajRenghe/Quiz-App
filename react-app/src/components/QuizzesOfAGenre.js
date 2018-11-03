import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './App.css';

class QuizzesOfAGenre extends Component {
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
      quizzes: [],
    }
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("loggedIn") == "false") {
      this.props.history.push('/')
    }
    this.state.formData.genre = this.props.match.params.genre;
    fetch('http://localhost:8080/getPerson', {
      method: 'POST',
      body: JSON.stringify(this.state.sessionData),
    }).then(response => response.json())
        .then(
          data => {
            this.setState ({userdata: data}) 
          }
        );
    fetch('http://localhost:8080/getSpecificQuizzes', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    }).then(response => response.json())
        .then(
          data => {
            this.setState ({quizzes: data}) 
          }
        );
  }

  adminCreateQuizButton () {
    if (window.sessionStorage.getItem("isAdmin") == "true") {
      return (
        <Link to={'/CreateQuiz/'+this.state.formData.genre} >
          <button type="button" class="btn btn-primary btn-lg element btn-danger"> 
            Create Quiz
          </button>
        </Link>
      )
    }
  }

  render() {
    const {formData} = this.state;
    return (
      <div>
        <br/><br/>
        <h1 class="display-4 heading"> All Quizzes Under { this.state.formData.genre } </h1>


        <a href= {'/Quiz/'} > 
          <button type="button" class="btn btn-danger"> 
            "Go Back to Genres"
          </button>
        </a>

        { this.state.quizzes.map (
            function (item, key) {
              return (
                <div>
                <div class="card text-center extrawidth">
                  <div class="card-body">
                    <h5 class="card-title"> { key+1 }. { item.title } </h5>
                    <a href= {'/Quiz/' + formData.genre + '/' + item.title } > 
                      <button type="button" class="btn btn-primary "> 
                        View This Quiz
                      </button>
                    </a>
                  </div>
                </div>
                <br/>
                </div>
              )
            }
          )}


          { this.adminCreateQuizButton() }

      </div>
    )
  }
}

export default QuizzesOfAGenre;