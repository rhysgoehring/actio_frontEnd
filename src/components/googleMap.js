import React, {Component} from 'react';
const google = window.google;


class GoogleMap extends Component {

  constructor(props){
    super(props);


    this.map = {}
    this.markers = [];
    this.makeMarkers = this.makeMarkers.bind(this);
    this.removeMarkers = this.removeMarkers.bind(this);
  }
  componentDidMount() {
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

  makeMarkers(map){
    console.log("this.props", this.props)
    if(this.props.markerData){
      this.props.markerData.forEach((pos) =>{
        let icon = {
          url: pos.icon,
          scaledSize: new google.maps.Size(40, 40)
        }
        // console.log("pos",pos);
        let marker = new google.maps.Marker({
              position: {
                lat: parseFloat(pos.lat),
                lng: parseFloat(pos.lng)
              },
              icon:icon,
              animation: google.maps.Animation.DROP,
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
    this.removeMarkers();
    this.makeMarkers(this.map);
    console.log("ALL THE MARKERS!!! ", this.markers)
    //anywhere else in this component we can call this.refs.map
    // to get access to that div
    return <div id="homeMap" ref="map" />;
  }
}

export default GoogleMap;
