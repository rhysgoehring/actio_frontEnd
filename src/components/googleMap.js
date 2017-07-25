import React, {Component} from 'react';
const google = window.google;


class GoogleMap extends Component {
  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: this.props.zoom,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
  }
  
  render(){
    //anywhere else in this component we can call this.refs.map
    // to get access to that div
    return <div id="homeMap" ref="map" />;
  }
}

export default GoogleMap;