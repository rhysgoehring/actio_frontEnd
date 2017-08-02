import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewEventForm from './NewEventForm'
import * as actions from '../actions';
const google = window.google;


const INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

const INITIAL_ZOOM = 8

const ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

class NewEvent extends Component {
  constructor(props) {
    super(props);
    
    this.state=({
      gcError: false,
      foundAddress: INITIAL_LOCATION.address,
      lat: INITIAL_LOCATION.position.latitude,
      lng: INITIAL_LOCATION.position.longitude
     
    })
  }
  
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map2, {
      zoom: INITIAL_ZOOM,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    })
    
    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    })
    
    this.geocoder = new google.maps.Geocoder()
  }
  
  geoCodeAddress(address) {
  this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {
      
      this.setState({
        foundAddress: results[0].formatted_address,
        isGeocodingError: false,
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      });

      this.map.setCenter(results[0].geometry.location);
      this.marker.setPosition(results[0].geometry.location);
      console.log('this.marker.map.center.toJSON', this.marker.position.toJSON());
      return;
    }

    this.setState({
      foundAddress: null,
      isGeocodingError: true,
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng()
    });

    this.map.setCenter({
      lat: ATLANTIC_OCEAN.latitude,
      lng: ATLANTIC_OCEAN.longitude
    });

    this.marker.setPosition({
      lat: ATLANTIC_OCEAN.latitude,
      lng: ATLANTIC_OCEAN.longitude
    });

  }.bind(this));
}
  handleFormSubmit(e){
    e.preventDefault()
    const address = this.refs.address.value
    this.geoCodeAddress(address)
    
  }
  
  showForm() {
    if (this.state.foundAddress !== INITIAL_LOCATION.address) {
      return (
        <NewEventForm
        lat={this.state.lat}
        lng={this.state.lng}
        />
      )
    }
  }
  
  render(){
    const {handleFormSubmit} = this.props
    
    return(
      <div className='container'>
        <div className='row'>
          <div ref='map2' id="codeMap" />
           {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}
           {this.state.lat} {this.state.lng}
        </div>
        <div className='row'>
            <div className='col-lg-12 col-md-12'>
              <form className='input-group form-inline' onSubmit={this.handleFormSubmit.bind(this)}>
                <input type="text" className="form-control" ref="address" placeholder='Enter Address'/>
                <span className='input-group-btn'>
                  <button className='btnMain' type="submit">Find Location</button>
                </span>
              </form>
            </div>
        </div>
        {this.showForm()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    firstName: state.auth.firstName,
    id: state.auth.id,
    lastName: state.auth.lastName,
    picUrl: state.auth.profPic,
    zip: state.auth.zip
  })
}

export default connect(mapStateToProps, actions)(NewEvent);