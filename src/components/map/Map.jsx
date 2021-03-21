import React, { useEffect, useState, useRef } from 'react';

import { connect } from 'react-redux';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
  GeoJSON,
  MapConsumer,
  useMapEvents,
} from 'react-leaflet';

import { Typography } from '@material-ui/core';

const maps = {
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const Map = ({ geoData, selected_country }) => {
  const [map, setMap] = useState(null);
  const [fillOpacity, setFillOpacity] = useState(0.0);

  const mapRef = useRef(null);

  useEffect(() => {
    console.log('geoData', geoData);
  }, [geoData]);

  const onGeoJsonMouseEvent = (event, type) => {
    switch (type) {
      case 'over':
        setFillOpacity(0.5);
        break;
      case 'out':
        setFillOpacity(0.0);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MapContainer
        center={[-10, -45]}
        zoom={3}
        zoomControl={false}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={(map) => setMap(map)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Light Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.light}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Country Borders" checked>
            <LayerGroup>
              {Array.from(geoData).map((data) => {
                return (
                  <>
                    <GeoJSON
                      key={`${data.display_name}-geojson`}
                      data={data.geojson}
                      pathOptions={{
                        color: '#757de8',
                        weight: 2,
                        opacity: 1,
                        fillOpacity,
                      }}
                      eventHandlers={{
                        mouseover: (event, type) =>
                          onGeoJsonMouseEvent(event, 'over'),
                        mouseout: (event, type) =>
                          onGeoJsonMouseEvent(event, 'out'),
                      }}
                    />
                    <Marker
                      key={`${data.display_name}-marker`}
                      position={[data.lat, data.lon]}
                      eventHandlers={{
                        add: () => map.flyTo([data.lat, data.lon]),
                      }}
                    >
                      <Popup key={`${data.display_name}-popup`}>
                        <Typography variant="h6" align="center">
                          {data.display_name}
                        </Typography>
                      </Popup>
                    </Marker>
                  </>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    geoData: state.geoData.geoData,
    selected_country: state.countries.selected_country,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
