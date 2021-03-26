import React, { useState } from 'react'

import { connect } from 'react-redux'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
  GeoJSON,
} from 'react-leaflet'

import { Typography } from '@material-ui/core'

const maps = {
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark:
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
}

const Map = ({ border_color, state_geodata, city_geodata }) => {
  const [map, setMap] = useState(null)
  const [countryFillOpacity, setCountryFillOpacity] = useState(0.0)

  const onGeoJsonMouseEvent = (event, type) => {
    switch (type) {
      case 'over':
        setCountryFillOpacity(0.5)
        break
      case 'out':
        setCountryFillOpacity(0.0)
        break
      default:
        break
    }
  }

  return (
    <>
      <MapContainer
        maxBounds={[
          [78, -40],
          [23, -190],
        ]}
        center={[37, -104]}
        minZoom={5}
        zoom={5}
        zoomControl={false}
        style={{ height: '100vh', width: '100%', padding: 0 }}
        whenCreated={(map) => setMap(map)}
      >
        <LayersControl position='topright'>
          <LayersControl.BaseLayer checked name='Map'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.dark}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name='State' checked>
            <LayerGroup>
              {Array.from(state_geodata).map((state) => {
                return (
                  <>
                    <GeoJSON
                      key={`${state.display_name}-stategeojson`}
                      data={state.geojson}
                      pathOptions={{
                        color: '#ff7961',
                        weight: 3,
                        opacity: 1,
                        fillOpacity: 0,
                      }}
                    />
                    <Marker
                      key={`${state.display_name}-statemarker`}
                      position={[state.lat, state.lon]}
                      eventHandlers={{
                        add: () => map.flyTo([state.lat, state.lon], 6),
                      }}
                    >
                      <Popup key={`${state.display_name}--statepopup`}>
                        <Typography variant='h6' align='center'>
                          {state.display_name}
                        </Typography>
                      </Popup>
                    </Marker>
                  </>
                )
              })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='City' checked>
            <LayerGroup>
              {Array.from(city_geodata).map((city) => {
                return (
                  <>
                    <GeoJSON
                      key={`${city.display_name}-citygeojson`}
                      data={city.geojson}
                      pathOptions={{
                        color: border_color,
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                      }}
                    />
                    <Marker
                      key={`${city.display_name}-citymarker`}
                      position={[city.lat, city.lon]}
                      eventHandlers={{
                        add: () => map.flyTo([city.lat, city.lon], 11),
                      }}
                    >
                      <Popup key={`${city.display_name}-citypopup`}>
                        <Typography variant='h6' align='center'>
                          {city.display_name}
                        </Typography>
                      </Popup>
                    </Marker>
                  </>
                )
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <ZoomControl position='topright' />
      </MapContainer>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    state_geodata: state.stateGeodata.state_geodata,
    city_geodata: state.cityGeodata.city_geodata,
    border_color: state.borderColor.border_color,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
