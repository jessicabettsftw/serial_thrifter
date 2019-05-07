import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class UploadFind extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      img: undefined,
      find_id: 0,
      stores: [],
      redirect: false,
      selectedStore: undefined
    }

  }

  handleSubmit = (event) => {
    event.preventDefault()
    let photo = event.target.elements['photo'].value
    let price = event.target.elements['price'].value
    let brand = event.target.elements['brand'].value
    let description = event.target.elements['description'].value
    //let city = event.target.elements['city'].value
    let store = this.state.selectedStore
    console.log(price)
    console.log(brand)
    console.log(description)
    console.log(store)
    //console.log(city)
    console.log(photo)
    let jwt = localStorage.getItem('jwt')
    let url = "https://serialthrifterbackend.herokuapp.com/stores/"
    let body = ""
    if (store !== undefined) {
      body = {
        'phone_number': store.display_phone,
        'name': store.name,
        'zip': store.location.zip_code,
        'street': store.location.address1,
        'city': store.location.city,
        'state': store.location.state,
        'country': store.location.country,
        'latitude': store.coordinates.latitude,
        'longitude': store.coordinates.longitude,
        'rating': store.rating
      }
    } else {
      body = {
        'phone_number': 'N/A',
        'name': 'N/A',
        'zip': 'N/A',
        'street': 'N/A',
        'city': 'N/A',
        'state': 'N/A',
        'country': 'N/A',
        'latitude': 0,
        'longitude': 0,
        'rating': 0
      }
    }


    fetch( url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(store => {
          console.log(store)
          let jwt = localStorage.getItem('jwt')
          let url = "https://serialthrifterbackend.herokuapp.com/finds"
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify({
              'price': parseInt(price),
              'brand': brand,
              'description': description,
              'photo': photo,
              'user_id': this.props.user.id,
              'store_id': store.id
            })})
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.setState({redirect: true, })
            })
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

  showStores = () => {
    return this.state.stores.map((store, index) => {
      return <option key={index} value={store.id}>{store.name} - {store.location.city}, {store.location.address1}</option>
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
      document.getElementById("store").disabled = false
      this.setState({stores: data.businesses})
    })
  }

  setStore = (event) => {
    let chosen = this.state.stores.filter(store => store.id === event.target.value)
    this.setState({selectedStore: chosen[0]})
  }

  render(){
    if (this.props.user !== undefined) {
      return (this.state.redirect === true) ? (<Redirect to="/user" />)
      :(
        <div id="find" className="row justify-content-center">
          <div className="col lrg-poloroid justify-content-center">
              {(this.state.img !== undefined)? <img src={this.state.img} alt="find" className="lrg-poloroid-img"/> : null}
          </div>
          <div className="col lrg-info overflow-auto">
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
              {/*
                <label >Photo</label>
                <input type="file" className="form-control-file" name="photoInput" onChange={(event) => this.updatePhoto(event)}/>
                */}
            <div className="form-group">
              <label >Photo</label>
              <input onChange={(event) => this.updatePhoto(event)} name="photo" className="form-control" id="photoInput" placeholder="enter photo url" required/>
            </div>
            <div className="form-group">
              <label >Price</label>
              <input name="price" className="form-control" id="priceInput" placeholder="enter price" required/>
            </div>
            <div className="form-group">
              <label >Brand</label>
              <input name="brand" className="form-control" id="brandInput" placeholder="enter brand" required/>
            </div>
            <div className="form-group">
              <label >Description</label>
              <textarea className="form-control" name="description" id="descriptionInput" placeholder="enter description" rows="3" required></textarea>
            </div>
            <div className="form-group">
              <label >Store City & State</label>
              <input onBlur={(event) => this.getStores(event)} type="text" className="form-control" name="city" id="descriptionInput" placeholder="enter city & state" rows="3" required/>
            </div>
            <label >Choose Store</label>
            <select disabled onChange={(ev) => this.setStore(ev)} name="store" id="store" className="form-group custom-select" required>
              {this.showStores()}
              <option value="0">None of these</option>
            </select>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>

        </div>

      )
    } else {return <Redirect to="/" />}
  }
}

export default UploadFind;
