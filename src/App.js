import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./GoogleMapComponent";
import Finds from "./Finds"
import Header from "./template/Header"

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: {id: 1, username: "jekka", name: "jessica",
        password: "cats", email: "jessiaannbettsis@gmail.com",
        zip: 98010, bio: null, image:null},
      likes: []
    }
    this.getLikes()
  }

  getLikes = () => {
    let url = `http://localhost:3000/likes/user/${this.state.user.id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({likes: data.map(like => like.find_id)})
    })
  }

  render (){
    return (
      <div className="grid-container">
          <Header />
          <Router>
            <Switch>
              <Route path="/find_stores" component={() => <GoogleMap />}/>
              <Route path="/finds" component={() => <Finds user={this.state.user} likes={this.state.likes}/>}/>
            </Switch>
          </Router>
      </div>
    );
  }
}
export default App;
