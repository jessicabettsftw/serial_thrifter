import React, { Component } from "react";
import FindPoloroid from "./FindPoloroid";
import { Redirect } from "react-router-dom";

class Finds extends Component {
  constructor(props){
    super(props)

    this.state = {
      finds: [],
      filteredFinds: [],
      userLocation: {},
      stores: [],
      filteredStores: []
    }
    this.getFinds()
    this.getStores()
  }

  getFinds = () => {
    let url = "http://localhost:3000/finds"
    let jwt = localStorage.getItem('jwt')
    console.log(jwt)
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        filteredFinds: data.finds,
        finds: data.finds
      })
    })
  }

  isLiked = (find_id) => {
    if (this.props.likes !== undefined){
      return this.props.likes.map(find => find.find_id).includes(find_id)
    } else {
      return []
    }
  }

  displayFinds = () => {
    if (this.state.filteredFinds) {
      return this.state.filteredFinds.map((find, index) => {
        let liked = this.isLiked(find.id)
        return <FindPoloroid selectFind={(id) => this.props.selectFind(id)} key={index} isLiked={liked} find={find} unlikeFind={(id) => this.unlikeFind(id)} likeFind={(id) => this.likeFind(id)}/>
      })
    }
  }

  brandFilter = (finds, brand) => {
    let brandFiltered = []
    if (brand !== ""){
      finds.forEach(find => {
        if (find.brand === brand) {
          brandFiltered.push(find)
        }
      })
      return brandFiltered
    }
    return finds
  }

  priceFilter = (finds, price) => {
    let priceFiltered = []
    if (price !== ""){
      finds.forEach(find => {
        if (find.price < parseInt(price)) {
          priceFiltered.push(find)
        }
      })
      return priceFiltered
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

  getStores = () => {
    let jwt = localStorage.getItem('jwt')
    let url = "http://localhost:3000/stores"
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({stores: data.stores, filteredStores: data.stores})
    })
  }

  locationFilter = (finds) => {
      let myZip = this.props.user.zip
      let locationFiltered = this.state.filteredFinds.filter(find => {
        //console.log(find.id)
        let store = this.state.stores[find.store_id]
        if (store !== undefined){
          //console.log("my zip", myZip)
          //console.log("store zip", )
          if (store.zip === myZip){
            return find
          }
        }
      })
      //let uniqStoreIds = [... new Set(storeIds)]
      //console.log(uniqStoreIds)
      //console.log(locationFiltered)
    //this.getDistance()
    if (locationFiltered.length !== 0){
      return locationFiltered
    } else {
      return []
    }
  }

  likeFind = (findId) => {
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

  filterFinds = (ev) => {
    ev.preventDefault()

    let brand = ev.target.elements['brandInput'].value
    let price = ev.target.elements['priceInput'].value
    let location = ev.target.elements['myLocation'].checked
    console.log(ev.target.elements['myLocation'].checked)

    let brand_filtered = this.brandFilter(this.state.finds, brand)
    console.log(brand_filtered)
    let price_filtered = this.priceFilter(brand_filtered, price)
    console.log(price_filtered)
    let location_filtered = price_filtered
    if (location === true) {
      location_filtered = this.locationFilter(price_filtered)
    }
    this.setState({filteredFinds: location_filtered})

  }

  clearFilters = (event) => {
    console.log(event)

  }


  render (){
    return (this.props.selectedFind !== undefined) ? (
      <Redirect to="/find" />
    ) : (
      <div>
        <div className="">
          <form onSubmit={(ev) => this.filterFinds(ev)} onChange={(event) => this.clearFilters(event)} className="finds-filters">
            <div className="row form-inline justify-content-center">
              <div className="col-2 form-check-inline">
                <input className="form-check-input" name="myLocation" type="checkbox" value="" id="defaultCheck1" />
                <label className="form-check-label text-secondary" >
                  My Location
                </label>
              </div>
              <div className="col">
                <input type="text" className="form-control" name="brandInput" placeholder="Brand:"/>
              </div>
              <div className="col">
                  <select name="priceInput" className="form-control text-secondary">
                    <option value="">Less Than:</option>
                    <option value="100">$100</option>
                    <option value="50">$50</option>
                    <option value="25">$25</option>
                    <option value="15">$15</option>
                    <option value="5">$5</option>
                  </select>
              </div>
              <div className="col">
                 <button type="submit" className="btn btn-primary button">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row justify-content-center flex main-content">
            {this.displayFinds()}
        </div>
      </div>
    );
  }
}
export default Finds;
