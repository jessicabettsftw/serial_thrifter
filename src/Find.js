import React, { Component } from "react";
import converse from "./images/lrg-Converse.png"
import notLiked from "./images/flame.png"
import { Redirect } from "react-router-dom";

class Find extends Component {
  constructor(props){
    super(props)
    this.state = {
      store: {},
      poster: {},
      numLikes: ""
    }
    console.log(this.props)
  }

  componentDidMount(){
    if (this.props.find !== undefined) {
      this.getStore()
      this.getUserAvatar(this.props.find.user_id)
      this.getNumLikes()
    }
  }

  isLiked = (find_id) => {
    return this.props.likes.map(find => find.find_id).includes(find_id)
  }

  getNumLikes = () => {
    //console.log(this.props.find.id)
    let url = `http://localhost:3000/likes/find/${this.props.find.id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      //console.log("num likes", data.likes.length)
      this.setState({numLikes: data.likes.length})
    })
  }

  getStore = () => {
    //console.log(this.props.find.store_id)
    let url = `http://localhost:3000/stores/${this.props.find.store_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({store: data})
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

    getUserAvatar = (userId) => {
      let url = `http://localhost:3000/users/${userId}`
      return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({poster: data})
      })
    }

  render(){
    return (this.props.selectedUser !== undefined)? (<Redirect to="/profile" />)
  :( (this.props.find === undefined)? (null): (
      <div id="find" className="row justify-content-center">
        <div className="col lrg-poloroid justify-content-center">
            <img src={this.props.find.photo} alt="find" className="lrg-poloroid-img"/>
            <span>{this.isLiked(this.props.find.id).toString() === "true" ? <span role="img" alt="liked" onClick={() => this.unlikeFind(this.props.find.id)}>{this.state.numLikes}🔥</span> : <span>{this.state.numLikes}<img src={notLiked} alt="not liked" onClick={() => this.likeFind(this.props.find.id)} /></span>}</span>
        </div>
        <div className="col lrg-info">
          <p>Brand: {this.props.find.brand} </p>
          <p>Desc: {this.props.find.description}</p>
          <p>${this.props.find.price}.00</p>
          <br></br><br></br><br></br>
          <p onClick={() => console.log(this.state.store.phone_number)}>Store: {this.state.store.name}</p>
          <p>{this.state.poster.username}: <img onClick={() => this.props.setSelectedUser(this.state.poster)} src={this.state.poster.image} alt="user avatar" className="user-avatar" /></p>
        </div>
      </div>

    ))
  }
}

export default Find;
