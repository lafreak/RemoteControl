import { default as React } from 'react';

import {
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapUtil = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={4}
      defaultCenter={{ lat: 40.6944, lng: -73.9213 }}
      center={props.center}
    >
      <Marker
        position={props.center}
      />
    </GoogleMap>
  );
});

export default MapUtil;