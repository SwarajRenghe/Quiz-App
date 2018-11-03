# Quiz App

A quiz taking decoupled SPA web application, with the banckend written in GoLang to make a RESTful API and the frontend written in ReactJS. Sqlite3 is used as the DBMS.

## Main Features

  - A hardcoded admin account exists, which when logged in can create Genres, Quizzes and Questions. The app is structured in such a way that multiple entities of genres, quizzes and questions exits, with multiple quizzes in each genre, and multiple questions in each quiz.
  - There exists a simple leaderboard implementation, where users and quizzes are presented.
  - Logged in users have a dashboard where they can view the quizzes they have attempted previously, and the scores they have received in each attempt.
  - The questions have 4 options, and anywhere between 1-4 correct answers. The admin can add questions, edit questions and delete questions.
  - Since the app is decoupled, even if the backend servers are down for maintainence or updation, the front end is always up and accessible. Plus, since the backend is a RESTful API, any frontend framework can use the API to implement the application.
  - Fully modular code, with each page divided into multiple components within React.
  - Database structure is intuitive and natural.

## Dependencies and Software Used

### 1. Go (https://golang.org/)
The backend for the application is a single Go file, with the main dependencies being the frameworks Gin and Gorm. 
### 2. React (https://reactjs.org/)
The frontend is written in React, with the built in react-engine and react-dom. Bootstrap was used as a CSS framework. 

## Installation
### 1. Go
The GoLang installation instructions can be found on the official Go page at  *https://golang.org/dl/*.
> It may be necessary to add the following line in your .bashrc, depending upon your installation.
> `export GOBIN=$GOPATH/bin`

Some Go frameworks are required to run the API. These can be installed by running these commands in a terminal.
```bash
$ go get -u -v github.com/gin-gonic/gin
$ go get -u -v github.com/jinzhu/gorm
$ go get -u -v github.com/jinzhu/gorm/dialects/sqlite
$ go get -u -v github.com/gin-contrib/cors
```
Once these are installed and the `$GOPATH` and `$GOROOT` environment variables are properly set up, the API can finally be run using 

```bash
$ go run QuizAPI.go
``` 

### 2. React
#### A. Using the Node Package Manage `npm`
On a separate terminal, open the React folder, and simply run 

```bash
$ npm install
```

This will install the dependencies required, namely React, the React DOM and the React Router. Once these are installed, the app can be run using 
```bash
$ npm start
```
#### B. Using `yarn`
- Ubuntu:
```bash
              curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
              sudo apt-get install -y nodejs
              npm install -g yarn
              yarn global add create-react-app
```
- MacOS:
```bash
              brew install node
              npm install -g yarn
              yarn global add react-app
```
Run the app by running 
```bash
yarn start
```

## Improvements, To-Dos and Issues
1. Implement a hashing and salting algorithm, preferably `sha256` to store the passwords of users, as they are currently stored as plain text in the database.
2.  Improve form validation on the server side. Frontend form validation is robust and effective, but API validation is necessary.
3. Implement a secure login feature like `OAuth`. This would enable logging in from other services like Google or Facebook.
4. Improve the quality of questions, such as allowing a multitude of formats (image, audio etc)
5. Enable email validation for new users.
6. Improve the leaderboard module to incorporate more filtering and sorting.
7. Incorporate `react-cookie` to improve the cookie storage mechanism, which is currently implemented using the browser's local storage. 