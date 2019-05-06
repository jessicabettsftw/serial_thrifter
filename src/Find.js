import React, { Component } from "react";
import notLiked from "./images/flame.png"
import { Redirect } from "react-router-dom";

class Find extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      store: {},
      poster: {},
      numLikes: "",
      findDisplay: "show",
      stores: [],
      redirect: false,

    }
  }

  componentDidMount(){
    if (this.props.find !== undefined) {
      this.getStore()
      this.getUserAvatar(this.props.find.user_id)
      this.getNumLikes()
      this.setState({price: this.props.find.price, brand: this.props.find.brand, description: this.props.find.description})
    }
  }

  isLiked = (find_id) => {
    return this.props.likes.map(find => find.find_id).includes(find_id)
  }

  getNumLikes = () => {
    //console.log(this.props.find.id)
    let jwt = localStorage.getItem('jwt')
    let url = `http://localhost:3000/likes/find/${this.props.find.id}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      //console.log("num likes", data.likes.length)
      if (data.likes) {
        this.setState({numLikes: data.likes.length})
      } else {
        this.setState({numLikes: 0})
      }
    })
  }

  getStore = () => {
    //console.log(this.props.find.store_id)
    let jwt = localStorage.getItem('jwt')
    let url = `http://localhost:3000/stores/${this.props.find.store_id}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }})
    .then(res => res.json())
    .then(data => {
      this.setState({store: data})
    })
  }

  likeFind = (findId) => {
    console.log("liking")
    if (this.isLiked(findId) === false){
      let jwt = localStorage.getItem('jwt')
      let url = "http://localhost:3000/likes"
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
        let url = `http://localhost:3000/likes/user/${this.props.user.id}/find/${findId}`
        fetch(url, {
          method: "DELETE",
          headers: {
              'Authorization': 'Bearer ' + jwt
          }})
          .then( this.props.removeLike(findId))
        }
    }

    getUserAvatar = (userId) => {
      let jwt = localStorage.getItem('jwt')
      let url = `http://localhost:3000/users/${userId}`
      return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + jwt
        }})
      .then(res => res.json())
      .then(data => {
        this.setState({poster: data})
      })
    }

    showStores = () => {
      return this.state.stores.map((store, index) => {
        return <option value={index}>{store.name}</option>
      })
    }

    getStores = (event) => {
      let location = event.target.value
      console.log(location)
      let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=thrift_store&location=${location}&limit=30&radius=20000`

      fetch(url, {
        'headers': {
          'Authorization': "Bearer GeTWZrzUC-yLbRt8--5cYSypgjILaAFpYIMpC6xpgXMxwk86EQcmhzo51ZJPpBzEwdFBFYd_hXZwTIU4hwyzDqI9bcPyhyw9iBnXwwlSlJ2nSJBElOpVDhsXEP69XHYx"
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({stores: data.businesses})
      })
    }

    displayEdit = () => {
      if (this.props.user.id === this.state.poster.id){
        return (
          <div>
            <button className="btn btn-primary" onClick={() => this.editFind()}>Edit</button>
            <button className="btn btn-primary" onClick={() => this.deleteFind()}>Delete</button>
          </div>
        )
      }
    }

    editFind = () => {
      this.setState({findDisplay: "edit"})
    }

    deleteFind = () => {
      let jwt = localStorage.getItem('jwt')
      let url = `http://localhost:3000/finds/${this.props.find.id}`
      fetch(url, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      })
      .then(this.props.setFind(undefined))
    }

    changingForm = (event) => {
      //console.log(event.target.name)
      this.setState({[event.target.name]: event.target.value})
    }

    displayFind = () => {
      if (this.state.findDisplay === "show") {
        return (
          <div>
            <p>Brand: {this.props.find.brand} </p>
            <p>Desc: {this.props.find.description}</p>
            <p>${this.props.find.price}.00</p>
            <br></br><br></br><br></br>
            <p>Store: {this.state.store.name}</p>
            <p>{this.state.poster.username}: <img onClick={() => this.props.setSelectedUser(this.state.poster)} src={this.state.poster.image} alt="user avatar" className="user-avatar" /></p>
            {this.displayEdit()}
        </div>

        )
      }
      if (this.state.findDisplay=== "edit") {
        return (
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
              {/*
                <label for="exampleInputEmail1">Photo</label>
                <input type="file" className="form-control-file" name="photoInput" onChange={(event) => this.updatePhoto(event)}/>
                */}
            <div className="form-group">
              <label for="exampleInputEmail1">Price</label>
              <input onChange={(event) => this.changingForm(event)} name="price" className="form-control" id="priceInput" placeholder="enter price" value={this.state.price} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Brand</label>
              <input onChange={(event) => this.changingForm(event)} name="brand" className="form-control" id="brandInput" placeholder="enter brand" value={this.state.brand} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Description</label>
              <textarea onChange={(event) => this.changingForm(event)} class="form-control" name="description" id="descriptionInput" placeholder="enter description" value={this.state.description} rows="3" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )
      }
    }

    handleSubmit = (event) => {
      event.preventDefault()
      let price = event.target.elements['price'].value
      let brand = event.target.elements['brand'].value
      let description = event.target.elements['description'].value

      console.log(price)
      console.log(brand)
      console.log(description)

      let jwt = localStorage.getItem('jwt')
      let url = `http://localhost:3000/finds/${this.props.find.id}`
      console.log(url)
      fetch( url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify({
          "price": price,
          "description": description,
          "brand": brand
        })})
        .then( res => res.json())
        .then(data => {
          console.log(data)
          this.props.setFind(data)
          //this.setState({findDisplay: "show"})
        })
    }

  render(){
    return (this.props.selectedUser !== undefined)? (<Redirect to="/profile" />)
  :( (this.props.find === undefined)? (<Redirect to="/finds" />): (
      <div id="find" className="row justify-content-center">
        <div className="col lrg-poloroid justify-content-center">
            <img src={this.props.find.photo} alt="find" className="lrg-poloroid-img"/>
            <span>{this.isLiked(this.props.find.id).toString() === "true" ? <span role="img" alt="liked" onClick={() => this.unlikeFind(this.props.find.id)}>{this.state.numLikes}🔥</span> : <span>{this.state.numLikes}<img src={notLiked} alt="not liked" onClick={() => this.likeFind(this.props.find.id)} /></span>}</span>
        </div>
        <div className="col lrg-info">
          {this.displayFind()}
        </div>
      </div>

    ))
  }
}

export default Find;
