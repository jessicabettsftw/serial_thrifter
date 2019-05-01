import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class User extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
  }

  render(){
    return (
      <div >
        <img className="lrg-profile-img" src={this.props.user.image} alt="" />
      </div>

    )
  }
}

export default User;
