import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props){
    super(props)
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let username = event.target.elements['username'].value
    let email = event.target.elements['email'].value
    let password = event.target.elements['password'].value
    let image = event.target.elements['image'].value

    console.log(username)
    console.log(email)
    console.log(password)
    //sconsole.log(image)
    let url = "http://localhost:3000/users"
    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          "username": username,
          "email": email,
          "password": password,
          "image": image
        }
      })})
      .then( res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else if (data.user){
          localStorage.setItem('jwt', data.jwt)
          this.props.setUser(data.user.users)
        }
      })
  }

  render(){
    return (this.props.user !== undefined)?
    (<Redirect to="/finds" /> )
    : (
    <div id="loginContainter" className="row justify-content-center flex">
      <div className="signupForm">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <div className="form-group" >
            <label for="exampleInputEmail1">Username</label>
            <input name="username" type="username" className="form-control" id="usernameInput" placeholder="Enter Username" required/>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" required/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" placeholder="Password" required/>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Image</label><br></br>
            <input type="text" name="image" id="imageInput" placeholder="Enter Image Url" required/>
          </div>
          <button type="submit" className="styledButton btn btn-primary">Submit</button>
        </form>
      </div>
      </div>

    )
  }
}

export default Signup;
