import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class User extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
  }

  EditUser = () => {
    console.log("edit me")
  }

  render(){
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <img className="lrg-profile-img" src={this.props.user.image} alt="" />
        </div>
        <div className="col lrg-user-info">
          <p>{this.props.user.name} </p>
          <p>{this.props.user.email} </p>
          <p>{this.props.user.bio} </p>
          <p>{this.props.user.zip} </p>
          <button className="btn btn-primary" onClick={() => this.EditUser()}>Edit</button>
        </div>
      </div>
    )
  }
}

export default User;
