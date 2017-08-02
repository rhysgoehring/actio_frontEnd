import React, {Component} from 'react';
const google = window.google;

const INITIAL_LOCATION = {
  address: 'Boulder, CO',
  position: {
    latitude: 40.014984,
    longitude: -105.270546
  }
}

const INITIAL_ZOOM = 8


class MapGeoCoder extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      gcError: false,
      foundAddress: INITIAL_LOCATION.address
    }
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
  
  geoCodeAddress(address){
    this.geocoder.geocode({ 'address': address}, function(results, status){
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('results:', results);
        this.setState({
          foundAddress: results[0].formatted_address,
          gcError: false
        });
        
        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        return;
      }
      
      this.setState({
        foundAddress: null,
        isGeoCodingError: true
      })
    }.bind(this));
  }
  
  handleFormSubmit(e){
    e.preventDefault()
    const address = this.refs.address.value
    this.geoCodeAddress(address)
   
  }
  
  render(){
    const {handleFormSubmit} = this.props
    
    return(
      <div className='container'>
        <div className='row'>
          <div ref='map2' id="codeMap" />
           {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}
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
      </div>
    )
  }
}

export default MapGeoCoder;