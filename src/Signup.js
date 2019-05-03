import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props){
    super(props)

    this.state = {
      img: undefined,
      redirect: false
    }
  }

  updatePhoto = (event) => {
    event.preventDefault()
    let photo = event.target.value
    console.log(photo)
    // let photo = event.target.files[0]
    // //check ext
    // //update state
    //
    // const fileAsBlob = new Blob([photo]);
    //
    // console.log(fileAsBlob);
    //
    // const blobAsFile = new File([fileAsBlob], photo.name, {type: photo.type, lastModified: photo.lastModifiedDate});
    //
    // console.log(blobAsFile);
    this.setState({img: photo})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let username = event.target.elements['username'].value
    let email = event.target.elements['email'].value
    let password = event.target.elements['password'].value
    let image = event.target.elements['photo'].value

    console.log(username)
    console.log(email)
    console.log(password)
    console.log(image)
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
        "password": password,
        "image": this.state.img
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
    <div id="find" className="row justify-content-center">
      <div className="col lrg-poloroid justify-content-center">
          {(this.state.img !== undefined)? <img src={this.state.img} alt="find" className="lrg-poloroid-img"/> : null}
      </div>
      <div className="col lrg-info">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <div className="form-group" >
            <label for="exampleInputEmail1">Username</label>
            <input name="username" type="username" className="form-control" id="usernameInput" placeholder="Enter Username" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Photo</label>
            <input onChange={(event) => this.updatePhoto(event)} name="photo" className="form-control" id="photoInput" placeholder="enter photo url" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      </div>

    )
  }
}

export default Signup;
