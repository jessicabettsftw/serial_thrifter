import React, { Component } from "react";
import FindPoloroid from "./FindPoloroid"
import "./css/findpoloroid.css";


class Finds extends Component {
  constructor(props){
    super(props)

    this.state = {
      finds: [],
      filteredFinds: [],
      userLocation: {}
    }

  }

  componentDidMount(){
    this.get_finds()
  }

  getLocation = () => {
    let url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCLTnIgnmTHVA87V0pTg7n2N2Y6HZxE7hA"
    return fetch(url, {
      method: 'POST'
    })
    .then(result => result.json())
  }

  get_finds = () => {
    let url = "http://localhost:3000/finds"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({finds: data, filteredFinds: data})
    })
  }

  isLiked = (find_id) => {
    return this.props.likes.includes(find_id)
  }

  displayFinds = () => {
    //if (this.state.finds.length > 0) {
      return this.state.filteredFinds.map((find, index) => {
        let liked = this.isLiked(find.id)
        return <FindPoloroid key={index} isLiked={liked} find={find} />
      })
    //}
  }

  brandFilter = (finds, brand) => {
    let brand_filtered = []
    if (brand !== ""){
      finds.forEach(find => {
        if (find.brand === brand) {
          brand_filtered.push(find)
        }
      })
      return brand_filtered
    }
    return finds
  }

  priceFilter = (finds, price) => {
    let price_filtered = []
    if (price !== ""){
      finds.forEach(find => {
        if (find.price < parseInt(price)) {
          price_filtered.push(find)
        }
      })
      return price_filtered
    }
    return finds
  }

  getDistance = () => {
    let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&key=AIzaSyDIfPwIi6IVmHH8WNpQE0q9iLpY1XaB4m0"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  locationFilter = (finds) => {
    this.getLocation().then(data => console.log(data.location))
    this.getDistance()
    return finds
  }

  filterFinds = (ev) => {
    ev.preventDefault()

    let brand = ev.target.elements['brand'].value
    let price = ev.target.elements['price'].value
    let nearMe = ev.target.elements['nearMe'].checked

    let brand_filtered = this.brandFilter(this.state.finds, brand)
    let price_filtered = this.priceFilter(brand_filtered, price)
    let location_filtered = this.locationFilter(price_filtered)


    this.setState({filteredFinds: price_filtered})

  }

  render (){
    return (
      <div>
        <div className="side">
          <form onSubmit={(ev) => this.filterFinds(ev)}>
            <label>Brand:</label>
            <input name="brand" type="text"/>
            <label>Near Me:</label>
            <input name="nearMe" type="checkbox"/>
            <label>Less Than: </label>
            <select name="price">
              <option value=""></option>
              <option value="100">$100</option>
              <option value="50">$50</option>
              <option value="25">$25</option>
              <option value="15">$15</option>
              <option value="5">$5</option>
            </select>
              <input type="submit" />
          </form>
        </div>
        <div className="main">
            {this.displayFinds()}
        </div>
      </div>
    );
  }
}
export default Finds;
