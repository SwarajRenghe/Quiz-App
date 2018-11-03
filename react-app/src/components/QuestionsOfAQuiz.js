import React, { Component } from 'react';
import './QuestionsOfAQuiz.css';
// import { Link } from 'react-router-dom';
import takeQuiz from './takeQuiz';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class QuestionsOfAQuiz extends Component {
  constructor() {
    super();
    this.state = {
      sessionData: {
        email: window.sessionStorage.getItem('email'),
      },
      formData: {
        title: ""
      },
      userdata: {},
      quizzes: [],
      scoreData: [],
    }
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("loggedIn") == "false") {
      this.props.history.push('/')
    }
    this.state.formData.title = this.props.match.params.quiztitle
    console.log(this.state.formData)
    fetch('http://localhost:8080/getPerson', {
      method: 'POST',
      body: JSON.stringify(this.state.sessionData),
    }).then(response => response.json())
        .then(
          data => {
            this.setState ({userdata: data}) 
          }
        );
    fetch('http://localhost:8080/getSpecificQuestions', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    }).then(response => response.json())
        .then(
          data => {
            this.setState ({quizzes: data}) 
            console.log(this.state.quizzes)
          }
        );

    const request = new Request('http://127.0.0.1:8080/getScoresForQuiz/'+this.props.match.params.quiztitle);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({scoreData: data}));
  }

  deleteQuestion (event) {
    const request = new Request('http://localhost:8080/deleteQuestion/'+event.target.id);
    fetch(request, {
      method: 'DELETE',
    })
      .then(response => {
          if(response.status >= 200 && response.status < 300)
            this.setState({deleted: true});
          }
        );

    setTimeout(function() {
      window.location.reload ()
    }, 2000);
  }


  ifAdminRenderQuestionsAndAnswers () {
    if (window.sessionStorage.getItem("isAdmin") == "true") {
      return (
        <div >
          <br/><br/>
          <h1 class="display-4 heading"> All Questions Under { this.props.match.params.quiztitle } </h1>


          <a href= {'/Quiz/'+this.props.match.params.genre} > 
            <button type="button" class="btn btn-danger"> 
              "Go Back to Quizzes"
            </button>
          </a> <br/><br/>
          { this.leaderBoard() }
          <br/><br/>
          <div> 
            <table className="table table-">
              <thead>
                <tr>
                  <th> Question </th>
                  <th> Option1 + Answer1 </th>
                  <th> Option2 + Answer2 </th>
                  <th> Option3 + Answer3 </th>
                  <th> Option4 + Answer4 </th>
                  <th> Edit </th>
                  <th> Delete </th>
                </tr>
              </thead>
              <tbody>{this.state.quizzes.map((item, key) => {
                   return (
                      <tr key = {key}>
                          <td> { item.question} </td>
                          <td> { item.option1 } + { item.answer1.toString() }  </td>
                          <td> { item.option2 } + { item.answer2.toString() } </td>
                          <td> { item.option3 } + { item.answer3.toString() } </td>
                          <td> { item.option4 } + { item.answer4.toString() } </td>
                          <td>
                            <a href={"/updateQuestion/"+item.id}> 
                              <button type="button" class="btn btn-warning"> Edit Question </button> 
                            </a>
                          </td> 
                          <td> <button type="button" id={item.id} class="btn btn-danger" onClick={this.deleteQuestion}> Delete Question </button> </td>                     
                      </tr>
                    )
                 })}

              <Link to={'/CreateQuestion/'+this.state.formData.title} >
                <button type="button" class="btn btn-primary btn-lg test"> 
                  Create Question
                </button>
              </Link>

              </tbody>
           </table>
           </div>
          </div>
      )
    }
  }

  ifUserTakeQuiz () {
    if (window.sessionStorage.getItem("isAdmin") == "false") {
      this.props.history.push('/takeQuiz/'+this.props.match.params.quiztitle)
    }
  }

  leaderBoard () {
    return (
      <div>
         <table class="table table-striped table-dark score-table text-center">
           <thead>
             <tr>
              <th scope="col"> Email </th>
              <th scope="col"> Score </th>
             </tr>
           </thead>
           <tbody>{this.state.scoreData.map(function(item, key) {
                return (
                   <tr>
                      <th scope="row"> { item.email } </th>
                      <th scope="row"> { item.score } </th>                  
                   </tr>
                 )
              })}

           </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div >
        { this.ifAdminRenderQuestionsAndAnswers() } 
        { this.ifUserTakeQuiz() } 

        {this.state.deleted &&
          <div>
            <h2>
              Question was successfully Deleted.
            </h2>
          </div>
        }
      </div>

    )
  }
}

export default QuestionsOfAQuiz;