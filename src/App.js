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
import Profile from "./Profile";
import Profiles from "./Profiles";
import Photos from "./Photos";
import Header from "./template/Header";

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: undefined,
      likes: undefined,
      selectedFind: undefined,
      selectedUser: undefined
    }
  }

  componentDidUpdate(){
    if ((this.state.user !== undefined) && (this.state.likes === undefined)){
      this.getLikes()
    }
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
    this.setState((prevState) => ({
      likes: [like, ... prevState.likes]
    }))
  }

  removeLike = (findId) => {
    this.setState((prevState) => ({
      likes: prevState.likes.filter(function(thisLike) {
      return thisLike.find_id !== findId
    })}))
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
              <Route path="/finds" component={() => <Finds clearSelects={this.clearSelects} selectFind={(id) => this.selectFind(id)}  selectedFind={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} user={this.state.user} likes={this.state.likes}/>}/>
              <Route path="/find" component={() => <Find setFind={this.setFind} selectedUser={this.state.selectedUser} setSelectedUser={this.setSelectedUser} user={this.state.user} likes={this.state.likes} find={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route path="/upload-find" component={() => <UploadFind selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} clearSelects={this.clearSelects} user={this.state.user}/>}/>
              <Route path="/user" component={() => <User selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} clearSelects={this.clearSelects} setUser={this.setUser} user={this.state.user} likes={this.state.likes} selectFind={(id) => this.selectFind(id)} selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route to="/profile" component={() => <Profile selectedFind={this.state.selectedFind} selectFind={(id) => this.selectFind(id)} user={this.state.user} selectedUser={this.state.selectedUser} likes={this.state.likes} addLike={this.addLike} removeLike={this.removeLike}/>}/>
            <Route to="/profiles" component={() => <Profiles user={this.state.user} selectedUser={this.state.selectedUser} setSelectedUser={this.setSelectedUser}/>}/>
            </Switch>
          </Router>
      </div>
    );
  }
}
export default App;
