import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleMap from "./GoogleMapComponent";
import Finds from "./Finds";
import Signup from "./Signup";
import Login from "./Login"
import UploadFind from "./UploadFind";
import Find from "./Find";
import Home from "./Home";
import User from "./User";
import Profiles from "./Profiles";
import Profile from "./Profile";
import Photos from "./Photos";
import Header from "./template/Header";

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: undefined,
      likes: undefined,
      selectedFind: undefined,
      selectedUser: undefined,
      myFinds: []
    }
    this.getFinds()
  }

  componentDidUpdate(){
    if ((this.state.user !== undefined) && (this.state.likes === undefined)){
      this.getLikes()
      this.getMyFinds()
      this.getLikedFinds()
    }
  }

  getFinds = () => {
    console.log("getting finds", this.state.finds)
    let url = "https://serialthrifterbackend.herokuapp.com/finds"
    let jwt = localStorage.getItem('jwt')
    //console.log(jwt)
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data)
      this.setState({
        finds: data.finds
      })
    })
  }

  getLikedFinds = () => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/likes/finds/${this.state.user.id}`;
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

  getMyFinds = () => {
    console.log("again")
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/finds/user/${this.state.user.id}`
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

  getLikes = () => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/likes/user/${this.state.user.id}`
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({likes: data.likes})
    })
  }

  clearSelects = () => {
    this.setState({selectedFind: undefined,
                   selectedUser: undefined})
  }

  addLike = (like) => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/finds/${like.find_id}`
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState((prevState) => ({
        likes: [like, ... prevState.likes],
        myLikedFinds: [data, ... prevState.myLikedFinds]
      }))
    })
  }

  addFind = (find) => {
    this.setState((prevState) => ({
      finds: [find, ... prevState.finds],
      myFinds: [find, ... prevState.myFinds]
    }))
  }

  removeFind = (find) => {
    this.setState((prevState) => ({
      myFinds: prevState.myFinds.filter(function(thisFind) {
      return thisFind.id !== find.id
      }),
      selectedFind: undefined,
      finds: prevState.finds.filter(function(thisFind) {
      return thisFind.id !== find.id
      }),
    }))
  }

  removeLike = (findId) => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/finds/${findId}`
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState((prevState) => ({
        likes: prevState.likes.filter(function(thisLike) {
        return thisLike.find_id !== findId
        }),
        myLikedFinds: prevState.myLikedFinds.filter(function(thisFind) {
        return thisFind.id !== findId
        })
      }))
    })

  }

  selectFind = (findId) => {
    let jwt = localStorage.getItem('jwt')
    let url = `https://serialthrifterbackend.herokuapp.com/finds/${findId}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({selectedFind: data, selectedUser: undefined})
    })
  }

  setSelectedUser = (user) => {
    this.setState({selectedUser: user, selectedFind: undefined})
  }

  setUser = (user) => {
    console.log(user)
    this.setState({user: user})
  }

  setFind = (find) => {
    console.log(find)
    this.setState({selectedFind: find})
  }

  render (){
    return (
      <div className="grid-container">

          <Router>
            <Header user={this.state.user}/>
            <Switch>
              <Route exact path="/" component={() => <Home />}/>
              <Route path="/photos" component={() => <Photos/>}/>
              <Route path="/signup" component={() => <Signup user={this.state.user} setUser={this.setUser}/>}/>
              <Route path="/login" component={() => <Login user={this.state.user} setUser={this.setUser}/>}/>
              <Route path="/stores" component={() => <GoogleMap selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} clearSelects={this.clearSelects} user={this.state.user}/>}/>
              <Route path="/finds" component={() => <Finds finds={this.state.finds} clearSelects={this.clearSelects} selectFind={(id) => this.selectFind(id)}  selectedFind={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} user={this.state.user} likes={this.state.likes}/>}/>
              <Route path="/find" component={() => <Find removeFind={this.removeFind} setFind={this.setFind} selectedUser={this.state.selectedUser} setSelectedUser={this.setSelectedUser} user={this.state.user} likes={this.state.likes} find={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route path="/upload-find" component={() => <UploadFind addFind={this.addFind} selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} clearSelects={this.clearSelects} user={this.state.user}/>}/>
              <Route path="/user" component={() => <User myLikedFinds={this.state.myLikedFinds} myFinds={this.state.myFinds} selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} clearSelects={this.clearSelects} setUser={this.setUser} user={this.state.user} likes={this.state.likes} selectFind={(id) => this.selectFind(id)} selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route path="/profiles" component={() => <Profiles user={this.state.user} selectedUser={this.state.selectedUser} setSelectedUser={this.setSelectedUser}/>}/>
              <Route path="/profile" component={() => <Profile selectedFind={this.state.selectedFind} selectFind={(id) => this.selectFind(id)} user={this.state.user} selectedUser={this.state.selectedUser} likes={this.state.likes} addLike={this.addLike} removeLike={this.removeLike}/>}/>
            </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
