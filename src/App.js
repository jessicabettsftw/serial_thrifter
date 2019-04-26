import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./GoogleMapComponent";
import Header from "./template/Header"

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: {id: 1, username: "jekka", name: "jessica",
        password: "cats", email: "jessiaannbettsis@gmail.com",
        zip: 98010, bio: null, image:null}
    }
  }

  render (){
    return (
      <div>
          <Header />
          <Router>
            <Switch>
              <Route path="/find_stores" component={() => <GoogleMap />}/>
            </Switch>
          </Router>
      </div>
    );
  }
}
export default App;
