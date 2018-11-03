import React, { Component } from 'react';
import './viewPeople.css';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    if (window.sessionStorage.getItem("loggedIn") == "false") {
      this.props.history.push('/')
    }
    const request = new Request('http://localhost:8080/getScores');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 class="display-4"> Leaderboard of All Users Across Genres Per Quiz </h1>
        </header>
       <table class="table">
         <thead>
           <tr>
             <th scope="col"> Email </th>
             <th scope="col"> Quiz Name </th>
             <th scope="col"> Score </th>
           </tr>
         </thead>
         <tbody>
            {this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      <td> { item.email } </td>
                      <td> { item.title } </td>
                      <td> { item.score } </td>
                  </tr>
                )
             })}
         </tbody>
       </table>
      </div>
    );
  }
}

export default Leaderboard;
