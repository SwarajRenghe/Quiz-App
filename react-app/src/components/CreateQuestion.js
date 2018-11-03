import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './CreateQuestion.css';

class CreateQuestion extends React.Component {
    constructor() {
      super();
      this.state = {
        formData: {
          quiz: "",
          question: "",
          option1:"", 
          option2:"", 
          option3:"", 
          option4:"",
          answer1: false, 
          answer2: false, 
          answer3: false, 
          answer4: false,
        },
        sessionData: {
          email: window.sessionStorage.getItem('email'),
        },
        questionType: false,
        quiztitle: "",
        userdata: {},
        tickedNothing: true,
        addedQuestion: false,
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleQuestionChange = this.handleQuestionChange.bind(this);
      this.handleOption1Change = this.handleOption1Change.bind(this);
      this.handleOption2Change = this.handleOption2Change.bind(this);
      this.handleOption3Change = this.handleOption3Change.bind(this);
      this.handleOption4Change = this.handleOption4Change.bind(this);
      this.handleAnswer1Change = this.handleAnswer1Change.bind(this);
      this.handleAnswer2Change = this.handleAnswer2Change.bind(this);
      this.handleAnswer3Change = this.handleAnswer3Change.bind(this);
      this.handleAnswer4Change = this.handleAnswer4Change.bind(this);
      this.handleAnswerImageChange = this.handleAnswerImageChange.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();
      if (this.state.formData.answer1 == false && this.state.formData.answer2 == false 
        && this.state.formData.answer3 == false && this.state.formData.answer4 == false) {
        this.setState({tickedNothing: false});
      }
      else {
        this.setState({tickedNothing: true});
        console.log(this.state.formData)
        fetch('http://localhost:8080/createQuestion', {
          method: 'POST',
          body: JSON.stringify(this.state.formData),
        }).then(response => response.json())
            .then(
              data => {
                this.setState({addedQuestion: true});
                setTimeout(function() {
                  window.location = "http://localhost:3000/"
                }, 2000);
              }
            );
      }
    }
    handleQuestionChange (event) {
      this.state.formData.question = event.target.value
    }
    handleOption1Change (event) {
      this.state.formData.option1 = event.target.value
    }
    handleOption2Change (event) {
      this.state.formData.option2 = event.target.value
      console.log(this.state.formData.option2)
    }
    handleOption3Change (event) {
      this.state.formData.option3 = event.target.value
    }
    handleOption4Change (event) {
      this.state.formData.option4 = event.target.value
    }
    handleAnswer1Change (event) {
      this.state.formData.answer1 = event.target.checked
    }
    handleAnswer2Change (event) {
      this.state.formData.answer2 = event.target.checked
    }
    handleAnswer3Change (event) {
      this.state.formData.answer3 = event.target.checked
    }
    handleAnswer4Change (event) {
      this.state.formData.answer4 = event.target.checked
    }
    handleAnswerImageChange (event) {
      this.setState({questionType: !this.state.questionType})
    }



    componentDidMount() {
      if (window.sessionStorage.getItem("loggedIn") == "false") {
        window.location = "http://localhost:3000/"
      }
      if (window.sessionStorage.getItem("isAdmin") == "false") {
        window.location = "http://localhost:3000/"        
      }
      this.state.quiztitle = this.props.match.params.quiztitle;
      this.state.formData.quiz = this.props.match.params.quiztitle;
      fetch('http://localhost:8080/getPerson', {
        method: 'POST',
        body: JSON.stringify(this.state.sessionData),
      }).then(response => response.json())
          .then(
            data => {
              this.setState ({data: data}) 
            }
          );
    }

    render() {
      return (
        <div class="centre">
        <a href= {'/Quiz/'} > 

          <button type="button" class="btn btn-danger"> 
            "Go Back to Quizzes"
          </button>
        </a>
          <br/><br/>

          <br/><br/>
          <h1 class="display-4 heading"> Add a question to { this.state.quiztitle } </h1>
          <form class="form" onSubmit = { this.handleSubmit }>
            <div class="form-group all extraWidth">
              <label for="Question"> Question! </label>
              <textarea required placeholder="Enter Question" class="form-control" id="Question" onChange={this.handleQuestionChange} rows="3"></textarea>
            </div>
            <div class="row">
                <div class="col">
                  <div class="form-group extraLeft extraWidthButNotThatMuch all">
                    <label for="option1"> Option 1 </label>
                    <input type="text" required class="form-control" id="option1" placeholder="Enter Option 1" onChange={this.handleOption1Change}/>
                  </div>
                </div>
                <div class="col ">
                  <div class="custom-control custom-checkbox option">
                    <input type="checkbox" class="custom-control-input " id="customCheck1" onChange={this.handleAnswer1Change}/>
                    <label class="custom-control-label" for="customCheck1"> This is a right answer. </label>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                  <div class="form-group extraLeft extraWidthButNotThatMuch all">
                    <label for="option2"> Option 2 </label>
                    <input type="text" required class="form-control" id="option2" placeholder="Enter Option 2" onChange={this.handleOption2Change}/>
                  </div>
                </div>
                <div class="col ">
                  <div class="custom-control custom-checkbox option">
                    <input type="checkbox" class="custom-control-input " id="customCheck2" onChange={this.handleAnswer2Change}/>
                    <label class="custom-control-label" for="customCheck2"> This is a right answer. </label>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                  <div class="form-group extraLeft extraWidthButNotThatMuch all">
                    <label for="option2"> Option 3 </label>
                    <input type="text" required class="form-control" id="option3" placeholder="Enter Option 3" onChange={this.handleOption3Change}/>
                  </div>
                </div>
                <div class="col ">
                  <div class="custom-control custom-checkbox option">
                    <input type="checkbox" value="true" class="custom-control-input" id="customCheck3" onChange={this.handleAnswer3Change}/>
                    <label class="custom-control-label" for="customCheck3"> This is a right answer. </label>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                  <div class="form-group extraLeft extraWidthButNotThatMuch all">
                    <label for="option4"> Option 4 </label>
                    <input type="text" required class="form-control" id="option4" placeholder="Enter Option 4" onChange={this.handleOption4Change}/>
                  </div>
                </div>
                <div class="col ">
                  <div class="custom-control custom-checkbox option">
                    <input type="checkbox" class="custom-control-input " id="customCheck4" onChange={this.handleAnswer4Change}/>
                    <label class="custom-control-label" for="customCheck4"> This is a right answer. </label>
                  </div>
                </div>
            </div>



            <button type="submit" class="btn btn-primary btn-lg"> Add Question </button>
          </form>
          { !this.state.tickedNothing &&
            <div class="heading">
              <h2>
                You must pick at least one option!
              </h2>
            </div>
          }
          {this.state.addedQuestion &&
            <div>
              <h2>
                Question successfully added to quiz { this.state.quiztitle }.
              </h2>
            </div>
          }
        </div>
      );
    }

}

export default CreateQuestion;