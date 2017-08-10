import React, {Component} from 'react';


const google = window.google;


class GoogleMap extends Component {

  constructor(props){
    super(props);


    this.map = undefined;
    this.markers = [];
    this.makeMarkers = this.makeMarkers.bind(this);
    this.removeMarkers = this.removeMarkers.bind(this);
    this.initMap = this.initMap.bind(this);
  }

  initMap(google){
    if(google !== undefined){
      this.map = new google.maps.Map(this.refs.map, {
        zoom: this.props.zoom,
        center: {
          lat: parseFloat(this.props.lat),
          lng: parseFloat(this.props.lng)
        }
      });
      let marker = new google.maps.Marker({
            position: {
              lat: parseFloat(this.props.lat),
              lng: parseFloat(this.props.lng)
            },
            map: this.map
          });
    }
    this.makeMarkers(this.map)
  }
  componentDidMount() {
    window.GoogleMapsLoader.load(this.initMap);
  }

  makeMarkers(map){
    if(this.props.markerData){
      this.props.markerData.forEach((pos) =>{
        let icon = {
          url: pos.icon,
          scaledSize: new window.google.maps.Size(40, 40)
        }

        let marker = new window.google.maps.Marker({
              position: {
                lat: parseFloat(pos.lat),
                lng: parseFloat(pos.lng)
              },
              icon:icon,
              animation: window.google.maps.Animation.DROP,
              map: map,
            });
        this.markers.push(marker);

      })
    }
  }
  removeMarkers(){
    this.markers.forEach((marker) =>{
      marker.setMap(null);
      marker.visible = false;
    })
    this.markers = [];
  }
  render(){

    if(window.google !== undefined && this.map !== undefined){
      this.removeMarkers();
      this.makeMarkers(this.map);
    }

    return <div id="homeMap" ref="map" />;
  }
}



export default GoogleMap;
