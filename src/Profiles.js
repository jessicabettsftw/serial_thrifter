import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ProfileIcon from "./ProfileIcon"

class Profiles extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      profiles: [],
      filteredProfiles: [],
      redirect: false
    }
    this.getProfiles()
  }

  getProfiles = () => {
    let jwt = localStorage.getItem('jwt')
    let url = "http://localhost:3000/users"
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      this.setState({profiles: data.users, filteredProfiles: data.users})
    })
  }

  usernameFilter = (event) => {
    event.preventDefault()
    let username = event.target.elements['usernameInput'].value
    console.log(username)
    let usernameFiltered = []
    if (username !== ""){
      this.state.profiles.forEach(user => {
        if (user.username.toLowerCase().includes(username.toLowerCase())) {
          usernameFiltered.push(user)
        }
      })
      this.setState({filteredProfiles: usernameFiltered})
    } else {
      this.setState({filteredProfiles: this.state.profiles})
    }
  }

  displayProfiles = () => {
    return this.state.filteredProfiles.map(profile => {
      console.log(profile)
      return (
        <li onClick={() => this.props.setSelectedUser(profile)}><ProfileIcon profile={profile} /></li>
      )
    })
  }

  render(){
    if (this.props.user !== undefined) {
      return (this.props.selectedUser !== undefined)?
      (<Redirect to="/profile" /> )
      : (
      <div className="profiles-container">
        <div className="row">
          <form onSubmit={(ev) => this.usernameFilter(ev)} className="flex form-inline">
            <div className="col">
              <input type="text" className="form-control" name="usernameInput" placeholder="Username Search:"/>
            </div>
            <div className="col">
               <button type="submit" className="btn btn-primary button">Submit</button>
            </div>
            <div className="col">
               <p className="results">{this.state.filteredProfiles.length} Results</p>
            </div>
          </form>
        </div>
        <hr></hr>
      <div className="row">
        <ul >
          {this.displayProfiles()}
        </ul>
      </div>
    </div>
      )
    } else { return <Redirect to="/" />}
  }
}

export default Profiles;
