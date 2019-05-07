import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FindPoloroid from "./FindPoloroid"

class User extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = this.props.user ? {
      display: "finds",
      userDisplay: "show",
      myFinds: [],
      myLikedFinds: [],
      zip: this.props.user.zip,
      bio: this.props.user.bio,
      image: this.props.user.image
    } : {
      display: "finds",
      userDisplay: "show",
      myFinds: [],
      myLikedFinds: [],
      zip: "",
      bio: "",
      image: ""
    }
    if (this.props.user !== undefined) {
      this.getFinds()
      this.getLikedFinds()
    }
  }

  // componentDidMount() {
  //   if ((this.props.selectedFind !== undefined) || (this.props.selectedUser !== undefined)){
  //     this.props.clearSelects()
  //   }
  // }

  EditUser = () => {
    this.setState({userDisplay: "edit"})
  }

  getFinds = () => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/finds/user/${this.props.user.id}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      //console.log(data)
      this.setState({myFinds: data.finds})
    })
  }

  getLikedFinds = () => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/likes/finds/${this.props.user.id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      this.setState({myLikedFinds: data.likes})
    })

  }

  likeFind = (findId) => {
    console.log("liking")
    if (this.isLiked(findId) === false){
      let jwt = localStorage.getItem('jwt')
      let url = "https://serialthrifterbackend.herokuapp.com/likes"
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': 'Bearer ' + jwt
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
      let jwt = localStorage.getItem('jwt')
      let url = `https://serialthrifterbackend.herokuapp.com/likes/user/${this.props.user.id}/find/${findId}`
      fetch(url, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + jwt
        }})
      .then( this.props.removeLike(findId))
    }
  }

  changingForm = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({[event.target.name]: event.target.value})
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
    //console.log(this.state.myLikedFinds)
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
          <p>{this.props.user.username} </p>
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
              <label for="exampleInputEmail1">Zip</label>
              <input onChange={(event) => this.changingForm(event)} name="zip" type="zip" className="form-control" id="zipInput" placeholder="Enter Zip" value={this.state.zip} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Bio</label>
              <textarea onChange={(event) => this.changingForm(event)} className="form-control" name="bio" id="bioInput" placeholder="Enter Bio" rows="3" value={this.state.bio} required></textarea>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Image</label>
              <input onChange={(event) => this.changingForm(event)} name="image" className="form-control" id="imageInput" placeholder="Enter Photo URL" value={this.state.image} required/>
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
    let image = event.target.elements['image'].value
    let zip = event.target.elements['zip'].value

    // console.log(bio)
    // console.log(email)
    // console.log(password)
    // console.log(image)
    // console.log(zip)
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/users/${this.props.user.id}`
    fetch( url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify({
        "bio": bio,
        "image": image,
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
    if (this.props.user !== undefined){
    return (this.props.selectedFind !== undefined) ? (
      <Redirect to="/find" />
    ) : (
      <div className="">
        <div className="row">
          <div className="col sml-user-info">
            <img className="lrg-profile-img float-right" src={this.state.image} alt="" />
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

    )} else { return <Redirect to="/" /> }
  }
}

export default User;
