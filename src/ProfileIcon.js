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
      <div className="profile justify-content-center">
        <div className="row">
          <img className="small-profiles-icon" src={this.props.profile.image} alt="user icon" />
        </div>
        <div className="row">
          {this.props.profile.username}
        </div>
      </div>

    )
  }
}

export default ProfileIcon;
