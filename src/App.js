import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./stores/GoogleMapComponent";

class App extends Component {
  render (){
    return (
      <div className="App">
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
