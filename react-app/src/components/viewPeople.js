import React, { Component } from 'react';
import './viewPeople.css';

class viewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      deleted: false,
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    if (window.sessionStorage.getItem("loggedIn") == "false") {
      this.props.history.push('/')
    }
    const request = new Request('http://localhost:8080/getUsers');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  deleteUser (event) {
    const request = new Request('http://localhost:8080/deleteUser/'+event.target.id);
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
            {this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      <th scope="row"> {item.id} </th>
                      <td> {item.Email} </td>
                      <td> {item.username} </td>
                      <td> {item.score} </td>
                      <td> <button type="button" id={item.id} class="btn btn-primary" onClick={this.deleteUser}> Delete User </button> </td>
                  </tr>
                )
             })}
         </tbody>
       </table>
       {this.state.deleted &&
         <div>
           <h2>
             Question was successfully Deleted.
           </h2>
         </div>
       }
      </div>
    );
  }
}

export default viewPeople;
