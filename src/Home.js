import React, { Component } from "react";

class Home extends Component {

  render(){
    return (
      <div className="col justify-content-center text-align-center">
        <div className="justify-content-center text-align-center intro">
          <p>
            Time to make a change
          </p>
          <p>
            We can minimize our participation in consumerism
          </p>
          <p>
            Reduce. Reuse. Recycle. Rewear....
          </p>
        </div>
        <div className="navbar-nav session-links">
          <a className="nav-item nav-link" href="/signup">Sign Up</a>
          <a className="nav-item nav-link" href="/login">Login</a>
        </div>
      </div>

    )
  }
}

export default Home;
