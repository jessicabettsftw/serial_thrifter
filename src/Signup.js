import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props){
    super(props)

    this.state = {
      img: undefined
    }
  }

  updatePhoto = (event) => {
    event.preventDefault()
    let photo = event.target.files[0]
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
    //let image = event.target.elements['photo'].value

    console.log(username)
    console.log(email)
    console.log(password)
    //sconsole.log(image)
    let file = event.target.elements['photo'].files[0]
    console.log(file.name)
    console.log(file)
    this.getBase64(file)
    .then( myfile => {
    let url = "https://serialthrifterbackend.herokuapp.com/users"
    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          "username": username,
          "email": email,
          "password": password,
          "file": myfile,
          "name": file.name
        }
      })})
      .then( res => console.log(res))
      //.then( res => res.json())
      // .then(data => {
      //   if (data.error) {
      //     alert(data.error)
      //   } else if (data.user){
      //     localStorage.setItem('jwt', data.jwt)
      //     this.props.setUser(data.user.users)
      //   }
      // })
    })
  }

  render(){
    return (this.props.user !== undefined)?
    (<Redirect to="/finds" /> )
    : (
    <div className="row justify-content-center flex">
      <div className="col-4 lrg-poloroid justify-content-center">
          {(this.state.img !== undefined)? <img src={this.state.img} alt="find" className="lrg-poloroid-img"/> : null}
      </div>
      <div className="col-4 lrg-info">
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
            <label for="exampleInputEmail1">Photo</label><br></br>
            <input onChange={(event) => this.updatePhoto(event)} type="file" name="photo" id="photoInput" placeholder="enter photo url" required/>
          </div>
          <button type="submit" className="styledButton btn btn-primary">Submit</button>
        </form>
      </div>
      </div>

    )
  }
}

export default Signup;
