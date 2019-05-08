import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ProfileIcon extends Component {
  constructor(props){
    super(props)

    this.state = {
      img: undefined,
      redirect: false
    }
  }

  render(){
    return (this.state.redirect === true)?
    (<Redirect to="/finds" /> )
    : (
      <div>
        <div className="row">
          <div className="col">
            <img className="small-profiles-icon" src={this.props.profile.image} alt="user icon" />
          </div>
          <div className="col ">
            <p className="username">{this.props.profile.username}</p>
          </div>
        </div>
        <div className="col">
          <hr></hr>
        </div>
      </div>


    )
  }
}

export default ProfileIcon;
