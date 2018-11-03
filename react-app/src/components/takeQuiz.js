import React, { Component } from 'react';
// import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NewComponent from './NewComponent';

class takeQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        title: "",
        answer1: false, 
        answer2: false, 
        answer3: false, 
        answer4: false,
      },
      sendingData: {
        id: null,
        title: "",
        Answer1: false, 
        Answer2: false, 
        Answer3: false, 
        Answer4: false,
        email: "",
      },
      sessionData: {
        email: window.sessionStorage.getItem('email'),
      },
      userdata: {},
      quizzes: [],
      quiztitle: "",
      selectedAnswers: [],
      recievedData: {},
      recieved: false,
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clone = this.clone.bind(this);
  }

  clone(obj) {
      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj) return obj;

      // Handle Date
      if (obj instanceof Date) {
          var copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
          var copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = this.clone(obj[i]);
          }
          return copy;
      }

      // Handle Object
      if (obj instanceof Object) {
          var copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
          }
          return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("loggedIn") == "false") {
      this.props.history.push('/')
    }
    this.state.formData.title = this.props.match.params.quiztitle
    this.state.sendingData.title = this.props.match.params.quiztitle
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
            console.log("DTATA - > " + JSON.stringify(this.state.quizzes))
            for (var i = 0; i < this.state.quizzes.length; ++i) {
                let a = this.clone(this.state.sendingData)
                // var a = $.extend( true, {}, this.state.sendingData );
                a.id = this.state.quizzes[i].id
                a.email = this.state.userdata.Email

                console.log("empty->"+JSON.stringify(a))
                this.state.selectedAnswers.push(a)
                console.log("bitches1->"+JSON.stringify(this.state.selectedAnswers))

                console.log("i->" + i)
                // this.state.selectedAnswers[i].id = this.state.quizzes[i].id
                console.log("selectedamswer["+ i+"] = " +JSON.stringify(this.state.selectedAnswers[i]))
            }
          console.log("bitches2->"+JSON.stringify(this.state.selectedAnswers))
          }
        );
  }

  handleCheck = (event) => {

    // for (var i = 0; i < this.state.selectedAnswers.length; i++) {
      
    // }
    console.log("----------------------")
    console.log(event.target.checked)
    console.log(event.target.id)
    console.log("hello-."+event.target.name)
    var temp = event.target.id.toString()[6]
    var optionNumber = parseInt(temp, 10)
    var temp2 = "";
    for (var i = 0; i < event.target.id.toString().length; i++) {
      if (i > 16)
        temp2 += event.target.id.toString()[i];
    }
    var questionNumber = parseInt(temp2, 10)
    var key = parseInt(event.target.name, 10)

    console.log("option number-> "+typeof(optionNumber) + " " + optionNumber)
    console.log("question number-> "+typeof(questionNumber) + " " + questionNumber)
    console.log("key-> "+typeof(key) + " " + key)

    var answer = "Answer"+optionNumber
    console.log("answer->"+answer)

    this.state.selectedAnswers[key].id = questionNumber
    this.state.selectedAnswers[key][answer] = event.target.checked
    console.log(this.state.selectedAnswers[key])
  }

  handleSubmit () {
    console.log("gonna send")
    console.log(JSON.stringify(this.state.selectedAnswers))

    fetch('http://localhost:8080/FinishedQuiz', {
      method: 'POST',
      body: JSON.stringify(this.state.selectedAnswers),
    }).then(response => response.json())
        .then(
          data => {
            this.setState ({recievedData: data}) 
            this.setState ({recieved: true}) 
            console.log(this.state.recievedData)
            setTimeout(function() {
              window.location = "http://localhost:3000/"
            }, 2000);
          }
        );
  }

  render() {
    return (
      <div>
        <h2 class="display-4"> Quiz - > {this.props.match.params.quiztitle} { this.state.userdata.Email }</h2>
        <br/><br/>
        
         <table className="table table-">
           <thead>
             <tr>
               <th> Question Number </th>
               <th> Question </th>
               <th> Option1 </th>
               <th> Option2 </th>
               <th> Option3 </th>
               <th> Option4 </th>
             </tr>
           </thead>


           <tbody>{
            this.state.quizzes.map(function(item, key) {
                return (
                   <tr key = {key}>
                      <td> { key + 1 } </td>
                      <td> { item.question } </td> 
                      <td>
                        <input type="checkbox" id={"option1OfQuestion"+item.id} name={key} onChange={this.handleCheck}/> 
                        { item.option1 } 
                      </td> 
                      <td>
                        <input type="checkbox" id={"option2OfQuestion"+item.id} name={key} onChange={this.handleCheck}/>  
                        { item.option2 } 
                      </td> 
                      <td> 
                        <input type="checkbox" id={"option3OfQuestion"+item.id} name={key} onChange={this.handleCheck}/>  
                        { item.option3 } 
                      </td> 
                      <td> 
                        <input type="checkbox" id={"option4OfQuestion"+item.id} name={key} onChange={this.handleCheck}/>  
                        { item.option4 } 
                      </td> 
                   </tr>
                 )
              }, {handleCheck: this.handleCheck})}
           </tbody>
        </table>
        <button type="Submit" class="btn btn-primary btn-lg element" onClick={this.handleSubmit}> 
          Submit
        </button>
        <NewComponent text={"hello"} question={"hi"}/>
        {this.state.recieved &&
          <div>
            <h2>
              You Scored { this.state.recievedData.score }
            </h2>
          </div>
        }
      </div>
    );
  }
}

export default takeQuiz;
