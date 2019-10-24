import React from 'react';
import styled from 'styled-components';

import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
// import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const position = {
  lat: 32.104836,
  lng: 34.807388
};

// React components section
const MapContainer = styled.div`
  ${ ({ theme: { space, mq, color } }) => `
    height: 480px;
    width: 480px;
    margin-right: ${space.xxl};

    border: 4px solid ${color.box_shadow_1};

    @media (max-width: ${mq.l}) {
      width: 100%;
      margin-right: 0;
    }
  `}
`;

const MapElement = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

// React components section
const MapWithLoader = withScriptjs(
  withGoogleMap(() => {
    const markerEl = <Marker position={position} defaultAnimation={2} />;

    return (
      <GoogleMap defaultZoom={17} defaultCenter={position}>
        {markerEl}
      </GoogleMap>
    );
  })
);

const Map = () => (
  <MapWithLoader
    loadingElement={<div />}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }`}
    containerElement={<MapContainer />}
    mapElement={<MapElement />}
  />
);

export default Map;
