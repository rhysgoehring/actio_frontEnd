import React, {Component} from 'react';
const google = window.google;


class GoogleMap extends Component {

  constructor(props){
    super(props);

    this.makeMarkers = this.makeMarkers.bind(this);
    this.map = {}
  }
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: this.props.zoom,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
    // let marker = new google.maps.Marker({
    //       position: {
    //         lat: this.props.lat,
    //         lng: this.props.lng
    //       },
    //       map: map
    //     });
}

  makeMarkers(map){
    console.log("making map markers")
    this.props.latLngs.forEach((pos) =>{
      console.log("pos",pos);
      let marker = new google.maps.Marker({
            position: {
              lat: parseFloat(pos.lat),
              lng: parseFloat(pos.lng)
            },
            map: map
          });
    })
  }


  render(){
    console.log("The Map",this.map)
    console.log("ths lats and longs", this.props.latLngs)
    this.makeMarkers(this.map)
    //anywhere else in this component we can call this.refs.map
    // to get access to that div
    return <div id="homeMap" ref="map" />;
  }
}

export default GoogleMap;
