import React, { Component } from 'react';
import './App.css';

import Home from './Home';
import Login from './Login';
import CreateUser from './CreateUser';
import Dashboard from './Dashboard';
import Logout from './Logout';
import Quiz from './Quiz';
import CreateQuestion from './CreateQuestion';
import CreateQuiz from './CreateQuiz';
import CreateGenre from './CreateGenre';
import takeQuiz from './takeQuiz';
import QuizzesOfAGenre from './QuizzesOfAGenre';
import QuestionsOfAQuiz from './QuestionsOfAQuiz';
import viewPeople from './viewPeople';
import updateQuestion from './updateQuestion';
import deleteUser from './deleteUser'
import Leaderboard from './Leaderboard'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    if (!window.sessionStorage.getItem('loggedIn')) {
      window.sessionStorage.setItem('loggedIn', 'false');
      window.sessionStorage.setItem('isAdmin', 'false');
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link class="nav-link" to={'/'}> <img width={'60vh'} class="img-fluid" src={require('./quiz-logo_2728-12.png')}/> </Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">

                { !window.sessionStorage.getItem('email') && 
                  <li class="nav-item active">
                    <Link class="nav-link" to={'/Login'}> Login </Link>
                  </li>
                }
                { !window.sessionStorage.getItem('email') &&
                  <li class="nav-item active">
                    <Link class="nav-link" to={'/Register'}> Register </Link>
                  </li>
                }
                { window.sessionStorage.getItem('email') &&
                  <li class="nav-item active">
                    <Link class="nav-link" to={'/'}> Dashboard </Link>
                  </li>
                }
                { window.sessionStorage.getItem('email') &&
                  <li class="nav-item active">
                    <Link class="nav-link" to={'/Logout'}> Logout </Link>
                  </li>
                }
                { window.sessionStorage.getItem('email') &&
                  <li class="nav-item active">
                    <Link class="nav-link" to={'/Leaderboard'}> Leaderboard </Link>
                  </li>
                }
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </nav>
            <Switch>
                  { !window.sessionStorage.getItem('email') &&
                     <Route exact path='/' component={Home}/>
                  }
                  { window.sessionStorage.getItem('email') &&
                     <Route exact path='/' component={Dashboard}/>
                  }
                 <Route exact path='/Login' component={Login}/>
                 <Route exact path='/Register' component={CreateUser}/>
                 <Route exact path='/Register' component={CreateUser}/>
                 <Route exact path="/Logout" component={Logout}/>
                 <Route exact path="/viewPeople" component={viewPeople}/>
                 <Route exact path="/Quiz" component={Quiz}/>
                 <Route exact path="/Quiz/:genre" component={QuizzesOfAGenre}/>
                 <Route exact path="/Quiz/:genre/:quiztitle" component={QuestionsOfAQuiz}/>
                 <Route exact path="/CreateQuestion/:quiztitle" component={CreateQuestion}/>
                 <Route exact path="/CreateQuiz/:genre" component={CreateQuiz}/>
                 <Route exact path="/CreateGenre" component={CreateGenre}/>
                 <Route exact path="/takeQuiz/:quiztitle" component={takeQuiz}/> 
                 <Route exact path="/updateQuestion/:id" component={updateQuestion}/> 
                 <Route exact path="/deleteUser/:id" component={deleteUser}/> 
                 <Route exact path="/Leaderboard" component={Leaderboard}/> 
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
