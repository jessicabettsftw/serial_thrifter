import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./GoogleMapComponent";
import Finds from "./Finds";
import Signup from "./Signup";
import Login from "./Login"
import UploadFind from "./UploadFind";
import Find from "./Find";
import Header from "./template/Header";

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: {id: 1, username: "jekka", name: "jessica",
        password: "cats", email: "jessiaannbettsis@gmail.com",
        zip: 98010, bio: null, image:null},
      likes: [],
      selectedFind: 0
    }
    this.getLikes()
  }

  getLikes = () => {
    let url = `http://localhost:3000/likes/user/${this.state.user.id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({likes: data.likes})
    })
  }

  addLike = (like) => {
    console.log("doing it")
    this.setState((prevState) => ({
      likes: [like, ... prevState.likes]
    }))
  }

  removeLike = (findId) => {
    this.setState((prevState) => ({
      likes: prevState.likes.filter(function(thisLike) {
      return thisLike.find_id !== findId
    })}))
  }

  selectFind = (findId) => {
    console.log("changing find", findId)
    let url = `http://localhost:3000/finds/${findId}`
    return fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({selectedFind: data})
    })
  }

  render (){
    return (
      <div className="grid-container">
          <Header />
          <Router>
            <Switch>
              <Route path="/signup" component={() => <Signup />}/>
              <Route path="/login" component={() => <Login />}/>
              <Route path="/stores" component={() => <GoogleMap />}/>
              <Route path="/finds" component={() => <Finds selectFind={(id) => this.selectFind(id)} selectedFind={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} user={this.state.user} likes={this.state.likes}/>}/>
              <Route path="/find" component={() => <Find user={this.state.user} likes={this.state.likes} find={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route path="/upload-find" component={() => <UploadFind />}/>
            </Switch>
          </Router>
      </div>
    );
  }
}
export default App;
