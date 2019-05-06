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
import Profiles from "./Profiles"
import Header from "./template/Header";

class App extends Component {
  constructor(){
    super()

    this.state = {
    //  user: {"id":1,"username":"jekka","password":"cats","email":"jessiaannbettsis@gmail.com","zip":"98010","bio":"i like cats","image":"https://scontent-ort2-2.cdninstagram.com/vp/2caa24e5ad88e58c012a04550cdc8493/5D7082B4/t51.2885-15/e35/52909898_2312312622424463_8539354381621977442_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com","created_at":"2019-05-02T23:59:49.207Z","updated_at":"2019-05-03T00:18:00.628Z"},
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
    let url = `http://localhost:3000/likes/user/${this.state.user.id}`
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
    let url = `http://localhost:3000/finds/${findId}`
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
              <Route path="/signup" component={() => <Signup user={this.state.user} setUser={this.setUser}/>}/>
              <Route path="/login" component={() => <Login user={this.state.user} setUser={this.setUser}/>}/>
              <Route path="/stores" component={() => <GoogleMap />}/>
              <Route path="/finds" component={() => <Finds selectFind={(id) => this.selectFind(id)}  selectedFind={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} user={this.state.user} likes={this.state.likes}/>}/>
              <Route path="/find" component={() => <Find setFind={this.setFind} selectedUser={this.state.selectedUser} setSelectedUser={this.setSelectedUser} user={this.state.user} likes={this.state.likes} find={this.state.selectedFind} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route path="/upload-find" component={() => <UploadFind user={this.state.user}/>}/>
              <Route path="/user" component={() => <User setUser={this.setUser} user={this.state.user} likes={this.state.likes} selectFind={(id) => this.selectFind(id)} selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} addLike={this.addLike} removeLike={this.removeLike} />}/>
              <Route path="/profile" component={() => <Profile addLike={this.addLike} removeLike={this.removeLike} selectFind={(id) => this.selectFind(id)} likes={this.state.likes} selectedFind={this.state.selectedFind} selectedUser={this.state.selectedUser} user={this.state.user}/>} />
              <Route to="/profiles" component={() => <Profiles users={this.state.user} selectedUser={this.state.selectedUser} setSelectedUser={this.setSelectedUser}/>}/>
            </Switch>
          </Router>
      </div>
    );
  }
}
export default App;
