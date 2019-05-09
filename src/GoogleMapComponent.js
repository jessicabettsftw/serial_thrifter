import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  'width': '400px',
  'height': '400px'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      centerPoint: {lat: 47.49855629475769, lng: -122.14184416996333},
      clickedStore: {}
    }
    this.getStores("kent washington")
  }

  // componentDidMount() {
  //   if ((this.props.selectedFind !== undefined) || (this.props.selectedUser !== undefined)){
  //     this.props.clearSelects()
  //   }
  // }

  getStores = (location) => {
    let url = ""
    if (location !== "") {
      if ((typeof location) === "string") {
        url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=thrift_store&location=${location}&limit=30&radius=20000`
      } else {
        url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=thrift_store&longitude=${location.lng}&latitude=${location.lat}&limit=30&radius=20000`
      }
    } else {
      url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=thrift_store&location=seattle&limit=30&radius=20000`
    }



    fetch(url, {
      'headers': {
        'Authorization': "Bearer GeTWZrzUC-yLbRt8--5cYSypgjILaAFpYIMpC6xpgXMxwk86EQcmhzo51ZJPpBzEwdFBFYd_hXZwTIU4hwyzDqI9bcPyhyw9iBnXwwlSlJ2nSJBElOpVDhsXEP69XHYx"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      let center = this.findCenterPoint(data)
      this.setState({stores: data.businesses, centerPoint: center})
    })
  }

  findCenterPoint = (data) => {
    if (data.businesses !== undefined){
      let latitude = 0
      let longitude = 0
      data.businesses.forEach(store => {
        latitude += store.coordinates.latitude
        longitude += store.coordinates.longitude
      })
      let avgLat = latitude / data.businesses.length
      let avgLong = longitude / data.businesses.length
      return {lat: avgLat, lng: avgLong}
    } else {
      return {lat: 122.00, lng: 123.00}
    }
    //console.log(data.businesses)

  }

  getStoreInfo = (obj) => {
    console.log(this.state.stores[obj])
    this.setState({clickedStore: this.state.stores[obj]})
  }

  getLocation = () => {
    let url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCLTnIgnmTHVA87V0pTg7n2N2Y6HZxE7hA"
    fetch(url, {
      method: 'POST'
    })
    .then(result => result.json())
    .then(data =>{
      console.log(data.location)
      this.getStores(data.location)
    })
  }

  displayMarkers = () => {
    if (this.state.stores !== undefined){
      return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.coordinates.latitude,
         lng: store.coordinates.longitude
       }}
       onClick={(obj) => this.getStoreInfo(obj.id)} />
      })
    }
  }

  displayStores = () => {
    return this.state.stores.map((store, index) => {
      return <li >{store.name}</li>
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    if (ev.target.elements['myLocation'].checked === true){
      this.getLocation()
    } else {
      this.getStores(ev.target.elements['cityInput'].value)
    }
  }

  clearForm = (ev) => {
    if (ev.target.name === 'cityInput') {
      document.getElementsByName('myLocation')[0].checked = false
    } else {
      if (ev.target.checked){
        document.getElementsByName('cityInput')[0].value = ""
      }
    }

  }

  render() {
    if (this.props.user !== undefined) {
      return (
        <div id="find">
          <div className="row justify-content-center map-filters">
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
              <div className="form-row">
                <div className="col-5">
                  <input type="text" className="form-control" name="cityInput" placeholder="City & State:" onChange={(ev) => this.clearForm(ev)}/>
                </div>
                <div className="col form-check-inline">
                  <input className="form-check-input" name="myLocation" type="checkbox" onChange={(ev) => this.clearForm(ev)} value="" id="defaultCheck1" />
                  <label className="form-check-label text-secondary" for="myLocation">
                    My Location
                  </label>
                </div>
                <div className="col">
                   <button type="submit" className="btn btn-primary button">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col">
            <hr></hr>
          </div>
          <div className="row">
            <div className="col text-align-left lrg-info">
              <p>
                Name: {this.state.clickedStore.name}
              </p>
              <p>
                Address: {(this.state.clickedStore.location !== undefined ) ? this.state.clickedStore.location.display_address : null}
              </p>
              <p>
                Phone: {this.state.clickedStore.display_phone}
              </p>
              <p>
                Rating: {this.state.clickedStore.rating}
              </p>
            </div>
            {/*<div className="col-2 ">
              <ul className="stores-list">
                {this.displayStores()}
              </ul>
            </div>*/}
          <div className="col lrg-info">
            <Map
              google={this.props.google}
              zoom={9}
              style={mapStyles}
              center={this.state.centerPoint}
            >
            {this.displayMarkers()}
            </Map>
          </div>
        </div>
        </div>
      );
    } else { return <Redirect to="/" />}
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDIfPwIi6IVmHH8WNpQE0q9iLpY1XaB4m0'
})(MapContainer);
