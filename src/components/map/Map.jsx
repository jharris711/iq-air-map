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

const Map = ({ geodata, state_geodata, city_geodata }) => {
  const [map, setMap] = useState(null);
  const [countryFillOpacity, setCountryFillOpacity] = useState(0.0);
  const [stateFillOpacity, setStateFillOpacity] = useState(0.0);

  useEffect(() => {
    console.log('city data', city_geodata);
  }, [city_geodata]);

  const onGeoJsonMouseEvent = (event, type) => {
    switch (type) {
      case 'over':
        setCountryFillOpacity(0.5);
        break;
      case 'out':
        setCountryFillOpacity(0.0);
        break;
      default:
        break;
    }
  };
  const onStateGeoJsonMouseEvent = (event, type) => {
    switch (type) {
      case 'over':
        setStateFillOpacity(0.5);
        break;
      case 'out':
        setStateFillOpacity(0.0);
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
              {Array.from(geodata).map((data) => {
                return (
                  <>
                    <GeoJSON
                      key={`${data.display_name}-geojson`}
                      data={data.geojson}
                      pathOptions={{
                        color: '#757de8',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: countryFillOpacity,
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
          <LayersControl.Overlay name="State Borders" checked>
            <LayerGroup>
              {Array.from(state_geodata).map((state_data) => {
                return (
                  <>
                    <GeoJSON
                      key={`${state_data.display_name}-stategeojson`}
                      data={state_data.geojson}
                      pathOptions={{
                        color: '#ff7961',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                      }}
                    />
                    <Marker
                      key={`${state_data.display_name}-statemarker`}
                      position={[state_data.lat, state_data.lon]}
                      eventHandlers={{
                        add: () =>
                          map.flyTo([state_data.lat, state_data.lon], 7),
                      }}
                    >
                      <Popup key={`${state_data.display_name}--statepopup`}>
                        <Typography variant="h6" align="center">
                          {state_data.display_name}
                        </Typography>
                      </Popup>
                    </Marker>
                  </>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="City Borders" checked>
            <LayerGroup>
              {Array.from(city_geodata).map((city) => {
                return (
                  <>
                    <GeoJSON
                      key={`${city.display_name}-stategeojson`}
                      data={city.geojson}
                      pathOptions={{
                        color: '#757de8',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                      }}
                    />
                    <Marker
                      key={`${city.display_name}-statemarker`}
                      position={[city.lat, city.lon]}
                      eventHandlers={{
                        add: () => map.flyTo([city.lat, city.lon], 12),
                      }}
                    >
                      <Popup key={`${city.display_name}--statepopup`}>
                        <Typography variant="h6" align="center">
                          {city.display_name}
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
    geodata: state.geodata.geodata,
    state_geodata: state.stateGeodata.state_geodata,
    city_geodata: state.cityGeodata.city_geodata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
