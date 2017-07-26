import React, {Component} from 'react';
const google = window.google;


class GoogleMap extends Component {
  componentDidMount() {
    let map = new google.maps.Map(this.refs.map, {
      zoom: this.props.zoom,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
    let marker = new google.maps.Marker({
          position: {
            lat: this.props.lat,
            lng: this.props.lng
          },
          map: map
        });
    
}
  
  
  render(){
    //anywhere else in this component we can call this.refs.map
    // to get access to that div
    return <div id="homeMap" ref="map" />;
  }
}

export default GoogleMap;