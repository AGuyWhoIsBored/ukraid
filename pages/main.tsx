import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text, onChildClick }) => (
  <div 
    onClick={ onChildClick }
    style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

const NEW_ZEALAND_BOUNDS = {
  north: -34.36,
  south: -47.35,
  west: 166.28,
  east: -175.81,
};
const AUCKLAND = {center: { lat: -37.06, lng: 174.58 }, zoom: 7, bounds: NEW_ZEALAND_BOUNDS};
const RESTRICTIONS = {
latLngBounds: NEW_ZEALAND_BOUNDS,
strictBounds: true,
}

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
        markers: [],
    }
  }

  componentDidMount(){
    // or you can set markers list somewhere else
    // please also set your correct lat & lng
    // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
    this.setState({
      markers: [{lat: -37.06, lng: 174.58, txt: 'asdf', id: 1},{lat: -30, lng: 175, txt: 'hijk', id: 2},{lat: -35, lng: 180,  txt: 'jijkjk', id: 3}],
    });
  }

  markerClicked(marker) {
    console.log("The marker that was clicked is", marker);
    // you may do many things with the "marker" object, please see more on tutorial of the library's author:
   // https://github.com/istarkov/google-map-react/blob/master/API.md#onchildclick-func 
   // Look at their examples and you may have some ideas, you can also have the hover effect on markers, but it's a bit more complicated I think 
  }
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBj9uPwBexPUrVp3JHkGDZJUDHfpWveUW4" }}
          defaultCenter={AUCKLAND.center}
          defaultZoom={AUCKLAND.zoom}
        >
            { this.state.markers.map((marker, i) => {
              return(
                <AnyReactComponent key={marker.id}
                  lat={marker.lat}
                  lng={marker.lng}
                  text={marker.txt}
                  onChildClick={() => this.markerClicked(marker)}
                />

              )
            })}  
        </GoogleMapReact>
      </div>
    );
  }
}

export default Main
