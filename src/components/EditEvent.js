import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditEventForm from './EditEventForm';
import * as actions from '../actions';
const google = window.google;


const INITIAL_LOCATION = {
  address: 'Boulder, CO',
  position: {
    latitude: 40.014984,
    longitude: -105.270546
  }
};

const INITIAL_ZOOM = 8


class EditEvent extends Component {
  constructor(props) {
    super(props);
    
    this.state=({
      gcError: false,
      foundAddress: INITIAL_LOCATION.address,
      lat: INITIAL_LOCATION.position.latitude,
      lng: INITIAL_LOCATION.position.longitude,
      
      
    })

    this.map = {}
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    window.GoogleMapsLoader.load(this.initMap);
    this.props.getEvent(this.props.params.id)
      .then(() => this.setState({input: this.props.event.location}))
      
  }

  initMap(){
    if(window.google !== undefined){
      this.map = new window.google.maps.Map(this.refs.map2, {
        zoom: INITIAL_ZOOM,
        center: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        }
      })

      this.marker = new window.google.maps.Marker({
        map: this.map,
        position: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        }
      })

      this.geocoder = new window.google.maps.Geocoder()
    }
  }

  geoCodeAddress(address) {
  this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {

      this.setState({
        foundAddress: results[0].formatted_address,
        isGeocodingError: false,
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      });
      this.map.setCenter(results[0].geometry.location);
      this.map.setZoom(14)
      this.marker.setPosition(results[0].geometry.location);
    }
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
        <EditEventForm
        lat={this.state.lat}
        lng={this.state.lng}
        locationValue={this.state.foundAddress}
        editId={this.props.params.id}
        />
      )
    }
  }

  render(){
    
    return(
      <div className='container'>
        <div className='row'>
          <div ref='map2' id="codeMap" />
           {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info" style={{fontFamily: 'gothamReg'}}>{this.state.foundAddress}</p>}
           <p style={{fontFamily:'gothamReg'}}>{this.state.lat} {this.state.lng}</p>
        </div>
        <div className='row'>
            <div className='col-lg-12 col-md-12'>
              <form className='input-group form-inline' onSubmit={this.handleFormSubmit.bind(this)}>
                <input type="text" className="form-control actField" ref="address" placeholder='Enter Address' value={this.state.input} style={{color:'black'}} />
                <span className='input-group-btn'>
                  <button className='newBtn' type="submit">Find Location</button>
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
    zip: state.auth.zip,
    event: state.allEvents.selectedEvent
  })
}

export default connect(mapStateToProps, actions)(EditEvent);
