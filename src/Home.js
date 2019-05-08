import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component {

  render(){
    return (
      <div id="intro" className="col justify-content-center text-align-center">
        <div className="justify-content-center text-align-center">
          <p>
            Let's minimize our participation in consumerism
          </p>
          <p>
            By choosing ethically sourced products and partoning consignment store
          </p>
          <p>
            you can help diminish the impact of fast fashion
          </p>
          <p className="statement-text">
            Reduce. Reuse. Recycle. Rewear.
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
