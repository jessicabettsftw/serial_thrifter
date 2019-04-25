import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./stores/GoogleMapComponent";
import Header from "./template/Header"



class App extends Component {
  render (){
    return (
      <div className="app">
        <div className="header">
          <Header />
        </div>
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
