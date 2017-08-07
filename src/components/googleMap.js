import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';
const google = window.google;


class GoogleMap extends Component {

  constructor(props){
    super(props);


    this.map = {}
    this.markers = [];
    this.makeMarkers = this.makeMarkers.bind(this);
    this.removeMarkers = this.removeMarkers.bind(this);
    this.initMap = this.initMap.bind(this);
  }

  initMap(){
    if(window.google != undefined){
      this.map = new window.google.maps.Map(this.refs.map, {
        zoom: this.props.zoom,
        center: {
          lat: parseFloat(this.props.lat),
          lng: parseFloat(this.props.lng)
        }
      });
      let marker = new window.google.maps.Marker({
            position: {
              lat: parseFloat(this.props.lat),
              lng: parseFloat(this.props.lng)
            },
            map: this.map
          });
    }
  }
  componentDidMount() {
    //loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyA3f0w4Sl-VqmXIZsr12TnK3xRmIrFQ6mA&callback=initMap')
    setTimeout(this.initMap(), 200);

  }

  makeMarkers(map){
    console.log("this.props", this.props)
    console.log("this.map", this.map)
    if(this.props.markerData){
      this.props.markerData.forEach((pos) =>{
        let icon = {
          url: pos.icon,
          scaledSize: new window.google.maps.Size(40, 40)
        }
        // console.log("pos",pos);
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
    console.log('the window map made in index.js', window.gmap)
    if(window.google != undefined){
      console.log("removing markers");
      this.removeMarkers();
      console.log('making markers');
      this.makeMarkers(this.map);
      console.log("ALL THE MARKERS!!! ", this.markers)
    }

    //anywhere else in this component we can call this.refs.map
    // to get access to that div
    return <div id="homeMap" ref="map" />;
  }
}


function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
export default GoogleMap;
