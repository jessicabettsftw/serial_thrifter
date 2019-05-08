import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component {

  render(){
    return (
      <div id="intro" className="col justify-content-center text-align-center">
        <div className="justify-content-center text-align-center">
          <p>
            let's minimize our participation in consumerism
          </p>
          <p>
            by choosing ethically sourced products and partoning consignment store
          </p>
          <p>
            reduce. reuse. recycle. rewear....
          </p>
        </div>
        <div className="navbar-nav session-links">
          <Link className="nav-item nav-link" to="/signup" >Signup</Link>
          <Link className="nav-item nav-link" to="/login" >Login</Link>
        </div>
      </div>

    )
  }
}

export default Home;
