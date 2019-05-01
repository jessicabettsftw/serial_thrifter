import React, { Component } from "react";
import converse from "./images/lrg-Converse.png"
import notLiked from "./images/flame.png"

class UploadFind extends Component {
  constructor(props){
    super(props)
    console.log(this.props.likes)
    this.state = {

    }

  }

  handleSubmit = (event) => {
    event.preventDefault()
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

  }

  updatePhoto = (event) => {
    event.preventDefault()
    console.log(event.target.files)
    //check ext
    //update state
  }

  render(){
    return(
      <div id="find" className="row justify-content-center">
        <div className="col lrg-poloroid justify-content-center">
            <img src="{}" alt="find" className="lrg-poloroid-img"/>
        </div>
        <div className="col lrg-info overflow-auto">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <label for="exampleInputEmail1">Photo</label>
            <input type="file" className="form-control-file" name="photoInput" onChange={(event) => this.updatePhoto(event)}/>
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
