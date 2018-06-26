import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Map, Marker, TileLayer, GeoJSON } from 'react-leaflet';


const alcatraz = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [-122.42305755615234, 37.82687023785448],
      }
    }
  ]
};

const styling = {
      color: '#006400',
      weight: 5,
      opacity: 0.65
    };

class App extends Component {
  render() {
    return(
      <div className='my-map'>
        <div className='my-map__map-container'>
          <Map zoom={13} center={[-122.42305755615234, 37.82687023785448]}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
            <GeoJSON data={alcatraz} style={styling}/>
          </Map>
        </div>
        <div className='my-map__debug'>
            {JSON.stringify(alcatraz)}
        </div>
      </div>
    );
  }
}



export default App;
