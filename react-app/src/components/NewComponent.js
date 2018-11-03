import React, { Component } from 'react';
// import './App.css';

class NewComponent extends Component {
  render() {
    return (
        <h2> bitch {this.props.text} {this.props.question} </h2>
    );
  }
}

export default NewComponent;
