import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div className="col">
        <div className="row">
          <p>
            Reduce. Reuse. Recycle. Rewear....
          </p>
        </div>
        <div className="row navbar-nav links">
          <a className="nav-item nav-link" href="/login">Login</a>
          <a className="nav-item nav-link" href="/signup">Sign Up</a>
        </div>
      </div>

    )
  }
}

export default Home;
