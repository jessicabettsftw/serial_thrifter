import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ProfileIcon from "./ProfileIcon"

class Profiles extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      profiles: [],
      redirect: false
    }
    this.getProfiles()
  }

  getProfiles = () => {
    let jwt = localStorage.getItem('jwt')
    let url = "https://serialthrifterbackend.herokuapp.com/users"
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
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
    if (this.props.user !== undefined) {
      return (this.props.selectedUser !== undefined)?
      (<Redirect to="/profile" /> )
      : (
      <div id="find" className="row">
        {this.displayProfiles()}
      </div>

      )
    } else { return <Redirect to="/" />}
  }
}

export default Profiles;
