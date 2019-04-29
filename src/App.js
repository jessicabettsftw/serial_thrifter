import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./GoogleMapComponent";
import Finds from "./Finds"
import Find from "./Find"
import Header from "./template/Header"

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
    this.setState({selectedFind: findId})
  }

  render (){
    return (
      <div className="grid-container">
          <Header />
          <Router>
            <Switch>
              <Route path="/stores" component={() => <GoogleMap />}/>
              <Route path="/finds" component={() => <Finds selectFind={(id) => this.selectFind(id)} selectedFind={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} user={this.state.user} likes={this.state.likes}/>}/>
              <Route path="/find" component={() => <Find findId={this.state.selectedFind} />}/>
            </Switch>
          </Router>
      </div>
    );
  }
}
export default App;
