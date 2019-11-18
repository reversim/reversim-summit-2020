import React from 'react';
import styled from 'styled-components';

import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import mediaQueryMin from '../styles/MediaQueriesMixin';
const coordinates = {
  lat: 32.104836,
  lng: 34.807388
};

// React components section
const MapContainer = styled.div`
  ${ ({ theme: { space, mq, color } }) => `
    width: 300px;
    height: 300px;
    margin: 0 -${space.xl} calc(3 * ${space.xxl}) 0;
    
    border: 4px solid ${color.box_shadow_1};
    `}

    ${mediaQueryMin.m`
      ${({ theme: { space } }) => `
        width: 300px;
        height: 300px;

        margin: ${space.xxl} -${space.m} ${space.l} 0;
        `}`}

    ${mediaQueryMin.l`
      ${({ theme: { space } }) => `
        height: 350px;
        width: 350px;
        margin-right: ${space.xxl};
        `}`}
    
    ${mediaQueryMin.xl`
      height: 480px;
      width: 480px;
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
    const markerEl = <Marker position={coordinates} defaultAnimation={2} />;

    return (
      <GoogleMap defaultZoom={17} defaultCenter={coordinates}>
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
