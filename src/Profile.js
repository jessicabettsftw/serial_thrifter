import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FindPoloroid from "./FindPoloroid"

class Profile extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      selectedUserFinds: []
    }
    if (this.props.selectedUser !== undefined) {
      this.getselectedUserFinds()
    }
  }

  getselectedUserFinds = () => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/finds/user/${this.props.selectedUser.id}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({selectedUserFinds: data.finds})
    })
  }

  isLiked = (find_id) => {
    return this.props.likes.map(find => find.find_id).includes(find_id)
  }

  displayFinds = () => {
    if (this.state.selectedUserFinds.length !== 0){console.log(this.state)
      return this.state.selectedUserFinds.map((find, index) => {
        let liked = this.isLiked(find.id)
        return <FindPoloroid selectFind={(id) => this.props.selectFind(id)} key={index} isLiked={liked} find={find} unlikeFind={(id) => this.unlikeFind(id)} likeFind={(id) => this.likeFind(id)}/>
      })
    }

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

  render(){
    if (this.props.user !== undefined) {
      return (this.props.selectedFind !== undefined) ? (
        <Redirect to="/find" />
      ) : ( (this.props.selectedUser === undefined)? (null): (
        <div className="profile-area">
          <div className="row">
            <div className="col lrg-user-info">
              <img className="lrg-profile-img float-right" src={this.props.selectedUser.image} alt="" />
            </div>
            <div className="col lrg-user-info">
              <p>{this.props.selectedUser.username} </p>
              <p>{this.props.selectedUser.bio} </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <hr></hr>
            </div>
          </div>
          <div className="row justify-content-center flex main-content">
              {this.displayFinds()}
          </div>
        </div>
      ))
    } else { return <Redirect to ="/" />}
  }
}

export default Profile;
