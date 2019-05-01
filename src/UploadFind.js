import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import converse from "./images/lrg-Converse.png"
import notLiked from "./images/flame.png"

class UploadFind extends Component {
  constructor(props){
    super(props)
    console.log(this.props.likes)
    this.state = {
      img: undefined,
      find_id: 0,
      redirect: false
    }

  }

  handleSubmit = (event) => {
    event.preventDefault()
    let photo = event.target.elements['photo'].value
    let price = event.target.elements['price'].value
    let brand = event.target.elements['brand'].value
    let description = event.target.elements['description'].value
    let store = event.target.elements['store'].value
    let city = event.target.elements['city'].value
    console.log(price)
    console.log(brand)
    console.log(description)
    console.log(store)
    console.log(city)
    console.log(photo)

    let url = "http://localhost:3000/finds"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        'price': parseInt(price),
        'brand': brand,
        'description': description,
        'photo': photo,
        'user_id': this.props.user.id,
        'store_id': 1
      })})
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({redirect: true, })
      })
  }

  updatePhoto = (event) => {
    event.preventDefault()
    let photo = event.target.value
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

  render(){
    return (this.state.redirect === true) ? (<Redirect to="/finds" />)
    :(
      <div id="find" className="row justify-content-center">
        <div className="col lrg-poloroid justify-content-center">
            {(this.state.img !== undefined)? <img src={this.state.img} alt="find" className="lrg-poloroid-img"/> : null}
        </div>
        <div className="col lrg-info overflow-auto">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
            {/*
              <label for="exampleInputEmail1">Photo</label>
              <input type="file" className="form-control-file" name="photoInput" onChange={(event) => this.updatePhoto(event)}/>
              */}
          <div className="form-group">
            <label for="exampleInputEmail1">Photo</label>
            <input onChange={(event) => this.updatePhoto(event)} name="photo" className="form-control" id="photoInput" placeholder="enter photo url" />
          </div>
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
            <textarea class="form-control" name="city" id="descriptionInput" placeholder="enter city & state" rows="3"></textarea>
          </div>
          <select name="store" className="form-group custom-select">
            <option selected>Choose a Store</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>

      </div>

    )
  }
}

export default UploadFind;
