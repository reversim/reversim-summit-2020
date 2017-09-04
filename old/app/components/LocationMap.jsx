import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

const cx = classNames.bind(styles);

const LocationMap = () => {
  return (
    <GoogleMapLoader
    containerElement={
      <div className={cx("map")} style={ {height: '560px'} } />
    }

    googleMapElement={
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 31.969843, lng: 34.7684663 }}
      >
        <Marker
        position={ { lat: 31.969843, lng: 34.7684663 } }
        defaultAnimation={2}
        />
      </GoogleMap>
    }
    />
  );
};

export default LocationMap;
