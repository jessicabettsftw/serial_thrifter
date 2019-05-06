import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let username = event.target.elements['username'].value
    let password = event.target.elements['password'].value

    // console.log(username)
    // console.log(email)
    // console.log(password)
    let url = "http://localhost:3000/login"
    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          "username": username,
          "password": password
        }
      })})
      .then( res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  render(){
    return (this.state.redirect === true)?
    (<Redirect to="/finds" /> )
    : (
      <div >
      <form onSubmit={(ev) => this.handleSubmit(ev)}>
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input name="username" type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter email" />
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

export default Login;
