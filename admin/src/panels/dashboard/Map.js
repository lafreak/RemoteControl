import React from 'react';

import MapUtil from './MapUtil';

export default class Map extends React.Component {
  render() {
    return (
      <div>
        <MapUtil
          containerElement={<div style={{ height: this.props.height}}/>}
          mapElement={<div style={{ height: this.props.height}} />}
          center={this.props.center} />
      </div>
    );
  }
}