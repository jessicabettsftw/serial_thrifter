import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FindPoloroid from "./FindPoloroid"

class User extends Component {
  constructor(props){
    super(props)

    this.state = {
      display: "finds",
      userDisplay: "show",
      myFinds: [],
      myLikedFinds: []

    }
    this.getFinds()
    this.getLikedFinds()
    console.log()
  }

  EditUser = () => {
    this.setState({userDisplay: "edit"})
  }

  getFinds = () => {
    let url = `http://localhost:3000/finds/user/${this.props.user.id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      //console.log(data)
      this.setState({myFinds: data.finds})
    })
  }

  getLikedFinds = () => {
    let url = `http://localhost:3000/likes/finds/${this.props.user.id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({myLikedFinds: data.likes})
    })

  }

  likeFind = (findId) => {
    console.log("liking")
    if (this.isLiked(findId) === false){
      let url = "http://localhost:3000/likes"
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "user_id": this.props.user.id,
          "find_id": findId
        })})
        .then( res => res.json())
        .then(data => {
          this.props.addLike(data)
        })
    }
  }

  unlikeFind = (findId) => {
    if (this.isLiked(findId)){
      let url = `http://localhost:3000/likes/user/${this.props.user.id}/find/${findId}`
      fetch(url, {
        method: "DELETE"})
      .then( this.props.removeLike(findId))
    }
  }

  isLiked = (find_id) => {
    return this.props.likes.map(find => find.find_id).includes(find_id)
  }

  displayFinds = () => {
    return this.state.myFinds.map((find, index) => {
      let liked = this.isLiked(find.id)
      return <FindPoloroid selectFind={(id) => this.props.selectFind(id)} key={index} isLiked={liked} find={find} unlikeFind={(id) => this.unlikeFind(id)} likeFind={(id) => this.likeFind(id)}/>
    })
  }

  displayLikedFinds = () => {
    console.log(this.state.myLikedFinds)
    return this.state.myLikedFinds.map((find, index) => {
      let liked = this.isLiked(find.id)
      return <FindPoloroid selectFind={(id) => this.props.selectFind(id)} key={index} isLiked={liked} find={find} unlikeFind={(id) => this.unlikeFind(id)} likeFind={(id) => this.likeFind(id)}/>
    })
  }

  displayContent = () => {
    if (this.state.display === "finds") {
      return this.displayFinds()
    }
    if (this.state.display === "likes") {
      return this.displayLikedFinds()
    }
  }

  displayUser = () => {
    if (this.state.userDisplay === "show") {
      return (
        <div>
          <p>{this.props.user.name} </p>
          <p>{this.props.user.email} </p>
          <p>{this.props.user.bio} </p>
          <p>{this.props.user.zip} </p>
          <button className="btn btn-primary" onClick={() => this.EditUser()}>Edit</button>
        </div>
      )
    }
    if (this.state.userDisplay=== "edit") {
      return (
        <div>
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <div className="form-group" >
              <label for="exampleInputEmail1">Name</label>
              <input name="name" type="name" className="form-control" id="nameInput" placeholder="Enter Name" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group" >
              <label for="exampleInputEmail1">Zip</label>
              <input name="zip" type="zip" className="form-control" id="zipInput" placeholder="Enter Zip" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Bio</label>
              <textarea class="form-control" name="bio" id="bioInput" placeholder="Enter Bio" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Photo</label>
              <input name="photo" className="form-control" id="photoInput" placeholder="Enter Photo URL" />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      )
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let bio = event.target.elements['bio'].value
    let email = event.target.elements['email'].value
    let password = event.target.elements['password'].value
    let image = event.target.elements['photo'].value
    let name = event.target.elements['name'].value
    let zip = event.target.elements['zip'].value

    console.log(bio)
    console.log(email)
    console.log(password)
    console.log(image)
    console.log(name)
    console.log(zip)
    let url = `http://localhost:3000/users/${this.props.user.id}`
    console.log(url)
    fetch( url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "bio": bio,
        "password": password,
        "name": name,
        "image": this.props.user.image,
        "zip": zip
      })})
      .then( res => res.json())
      .then(data => {
        console.log(data)
        this.props.setUser(data)
      })
  }

  changeDisplay = (display) => {
    this.setState({display: display})
  }

  render(){
    return (this.props.selectedFind !== undefined) ? (
      <Redirect to="/find" />
    ) : (
      <div className="">
        <div className="row">
          <div className="col sml-user-info">
            <img className="lrg-profile-img float-right" src={this.props.user.image} alt="" />
          </div>
          <div className="col sml-user-info">
            {this.displayUser()}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={() => this.changeDisplay("finds")}>Finds</button><button className="btn btn-primary" onClick={() => this.changeDisplay("likes")}>Likes</button>
            <hr></hr>
          </div>
        </div>
        <div className="row justify-content-center flex main-content">
            {this.displayContent()}
        </div>
      </div>

    )
  }
}

export default User;
