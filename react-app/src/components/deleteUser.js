import React, { Component } from 'react';
import './viewPeople.css';

class deleteUser extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    console.log("bitchess")
    const request = new Request('http://localhost:8080/getUsers');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 class="display-4"> All Users </h1>
        </header>
       <table class="table">
         <thead>
           <tr>
             <th scope="col"> ID </th>
             <th scope="col"> Email </th>
             <th scope="col"> Name </th>
             <th scope="col"> Score </th>
           </tr>
         </thead>
         <tbody>
            {this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <th scope="row"> {item.id} </th>
                      <td> {item.Email} </td>
                      <td> {item.username} </td>
                      <td> {item.score} </td>
                  </tr>
                )
             })}
         </tbody>
       </table>
      </div>
    );
  }
}

export default deleteUser;