import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ProfileIcon from "./ProfileIcon"

class Profiles extends Component {
  constructor(props){
    super(props)

    this.state = {
      profiles: [],
      redirect: false
    }
    this.getProfiles()
  }

  getProfiles = () => {
    let url = "http://localhost:3000/users"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({profiles: data.users})
    })
  }

  displayProfiles = () => {
    return this.state.profiles.map(profile => {
      console.log(profile)
      return (
        <div onClick={() => this.props.setSelectedUser(profile)}><ProfileIcon profile={profile} /></div>
      )
    })
  }

  render(){
    return (this.props.selectedUser !== undefined)?
    (<Redirect to="/profile" /> )
    : (
    <div id="find" className="row">
      {this.displayProfiles()}
    </div>

    )
  }
}

export default Profiles;
