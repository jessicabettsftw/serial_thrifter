import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let username = event.target.elements['username'].value
    let email = event.target.elements['email'].value
    let password = event.target.elements['password'].value

    // console.log(username)
    // console.log(email)
    // console.log(password)
    let url = "http://localhost:3000/users"
    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password
      })})
      .then( res => {
        if (res.status === 200){
          localStorage.setItem('Authorized', true);
          localStorage.setItem('UserId', res.json().id);
          this.setState({redirect: true})
        }
      })
  }

  render(){
    return (this.state.redirect === true)?
    (<Redirect to="/finds" /> )
    : (
      <div >
      <form onSubmit={(ev) => this.handleSubmit(ev)}>
        <div className="form-group" >
          <label for="exampleInputEmail1">Username</label>
          <input name="username" type="username" className="form-control" id="usernameInput" placeholder="Enter Username" />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>

    )
  }
}

export default Signup;
