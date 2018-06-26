import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import './App.css'
import 'leaflet/dist/leaflet.css'
import community from './data/community';
import neighbor from './data/neighbor';

class SimpleExample extends Component {
  constructor() {
    super();
    this.state = {
      lat: 41.83893781173967,
      lng: -87.67867584228514,
      zoom: 10,
      open: false
    };
  }

	getStyle(feature, layer) {
    const currentCommunity = parseInt(feature.properties.area_num_1);

    let color='#006400';

    if (this.state.activeCommunity == currentCommunity){
      color='#FF00FF';
    } else if ((this.state.activeCommunity) &&
        (neighbor[this.state.activeCommunity-1].indexOf(currentCommunity) != -1)){
      color='#880088';
    }
    return {
      color,
      weight: 2,
      opacity: 0.65
    }
  }

  setCommunity(feature) {

    this.setState({
      activeCommunity: feature.properties.area_num_1,
      currentFeatureProps: feature.properties
    });
  }

  setupMouseOver(feature, layer) {
    layer.on('mouseover', ()=> this.setCommunity(feature));
  }

  getTable() {
    if (!this.state.activeCommunity){
      return (<div></div>);
    }
    return (
      <div>
      <table>
        <tr>
          <th>Highlighted Neighborhood</th>
          <th>Code</th>
        </tr>
        <tr>
          <td>{this.state.currentFeatureProps.community}</td>
          <td>{this.state.activeCommunity}</td>
        </tr>
      </table>
      </div>
    )
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <Map center={position}
             zoom={this.state.zoom}
             zoomControl={false}
             dragging={false}
             scrollWheelZoom={false}
             touchZoom={false}
             doubleClickZoom={false}
        >
          <GeoJSON data={community}
                   style={(f,l) => this.getStyle(f,l)}
                   onEachFeature={(f,l) => this.setupMouseOver(f,l)}
          />
        </Map>
        {this.state.activeCommunity && this.getTable()}
      </div>
    );
  }
}

export default SimpleExample;
