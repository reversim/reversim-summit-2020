import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import s from './Map.css';

const position = {
  lat: 32.076914,
  lng: 34.784622,
};

const MapWithLoader = withScriptjs(
  withGoogleMap(() => {
    const markerEl = <Marker position={position} defaultAnimation={2} />;

    return (
      <GoogleMap defaultZoom={17} defaultCenter={position}>
        {markerEl}
      </GoogleMap>
    );
  }),
);

const Map = () => (
  <MapWithLoader
    loadingElement={<div />}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }`}
    containerElement={<div className={s.mapContainer} />}
    mapElement={<div className={s.mapEl} />}
  />
);

export default Map;
