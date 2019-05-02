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
      numLikes: "",
      findDisplay: "show",
      stores: []
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
      console.log("delete me")
      //this.setState({findDisplay: "edit"})
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
              <input name="price" className="form-control" id="priceInput" placeholder="enter price" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Brand</label>
              <input name="brand" className="form-control" id="brandInput" placeholder="enter brand" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Description</label>
              <textarea class="form-control" name="description" id="descriptionInput" placeholder="enter description" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Store City & State</label>
              <input onBlur={(event) => this.getStores(event)} type="text" class="form-control" name="city" id="descriptionInput" placeholder="enter city & state" rows="3"/>
            </div>
            <select name="store" className="form-group custom-select">
              <option selected>Choose a Store</option>
              <option value="1">One</option>
              {this.showStores()}
            </select>
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
      let store = event.target.elements['store'].value

      console.log(price)
      console.log(brand)
      console.log(description)
      console.log(store)

      let url = `http://localhost:3000/finds/${this.props.find.id}`
      console.log(url)
      fetch( url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "price": price,
          "description": description,
          "brand": brand,
          "store": store
        })})
        .then( res => res.json())
        .then(data => {
          console.log(data)
          //this.props.setUser(data)
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
          {this.displayFind()}
        </div>
      </div>

    ))
  }
}

export default Find;
