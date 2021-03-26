import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'

import moment from 'moment'

import {
  makeStyles,
  Divider,
  Grid,
  Paper,
  Typography,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Collapse,
  Avatar,
  Link,
  Icon,
} from '@material-ui/core'

import WbSunnyIcon from '@material-ui/icons/WbSunny'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import RoomIcon from '@material-ui/icons/Room'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import CloudIcon from '@material-ui/icons/Cloud'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import InvertColorsIcon from '@material-ui/icons/InvertColors'

import { useSnackbar } from 'notistack'

import {
  selectState,
  selectCity,
  getStates,
  getStateGeoData,
  getCities,
  getCityGeodata,
  getCityWeatherData,
  setBorderColorByTemp,
} from '../../redux'

import { paperStyles, listStyles } from './styles'
import Cloud from '@material-ui/icons/Cloud'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const InfoColumn = ({
  states,
  cities,
  selected_state,
  selected_city,
  city_weather_data,
  getStateGeoData,
  getCityGeodata,
  getStates,
  getCities,
  selectState,
  selectCity,
  getCityWeatherData,
  setBorderColorByTemp,
}) => {
  const [weatherListOpen, setWeatherListOpen] = useState(false)
  const classes = useStyles()
  const paperClasses = paperStyles()
  const listClasses = listStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    getStates('USA')
  }, [])

  useEffect(() => {
    if (selected_state) {
      getStateGeoData(selected_state, 'USA')
      getCities(selected_state, 'USA')
    }
  }, [selected_state, getStateGeoData, getCities])

  useEffect(() => {
    if (selected_state && selected_city) {
      getCityGeodata(selected_city, selected_state, 'USA')
      getCityWeatherData(selected_city, selected_state, 'USA')
    }
  }, [selected_state, selected_city, getCityGeodata, getCityWeatherData])

  useEffect(() => {
    if (
      Array.isArray(city_weather_data) &&
      city_weather_data.length &&
      city_weather_data[0].current
    ) {
      const temp = city_weather_data[0].current.weather.tp
      setBorderColorByTemp(temp)
    }
  }, [city_weather_data, setBorderColorByTemp])

  const handleSelectState = (event) => {
    const stateToSelect = event.target.value
    selectState(stateToSelect)
  }

  const handleSelectCity = (event) => {
    const cityToSelect = event.target.value
    selectCity(cityToSelect)
  }

  const toggleWeatherList = () => {
    setWeatherListOpen(!weatherListOpen)
  }

  return (
    <>
      <Paper className={paperClasses.root} elevation={3}>
        <Grid item xs={12}>
          <Typography
            variant='h5'
            gutterBottom
            align='center'
            style={{ padding: '10px' }}
          >
            Weather And Stuff
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <Typography
            variant='body1'
            gutterBottom
            align='center'
            style={{ padding: '10px' }}
          >
            This app uses the{' '}
            <Link
              href='https://www.iqair.com/us/air-pollution-data-api'
              target='_blank'
              rel='noopener noreferrer'
              color='secondary'
            >
              AirVisual Air Quality
            </Link>{' '}
            and{' '}
            <Link
              href='https://nominatim.org/release-docs/develop/'
              target='_blank'
              rel='noopener noreferrer'
              color='secondary'
            >
              Nominatim
            </Link>{' '}
            APIs
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id='filled-select-state'
              select
              value={selected_state}
              onChange={handleSelectState}
              helperText='Please select a state'
              variant='outlined'
              margin='dense'
              disabled={Array.isArray(states) && states.length ? false : true}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {Array.from(states).map((state) => {
                // console.log(country);
                return (
                  <MenuItem key={`${state}-key`} value={state}>
                    {state}
                  </MenuItem>
                )
              })}
            </TextField>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id='filled-select-city'
              select
              value={selected_city}
              onChange={handleSelectCity}
              helperText='Please select a city'
              variant='outlined'
              margin='dense'
              disabled={Array.isArray(cities) && cities.length ? false : true}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {Array.from(cities).map((city) => {
                // console.log(country);
                return (
                  <MenuItem key={`${city}-key`} value={city}>
                    {city}
                  </MenuItem>
                )
              })}
            </TextField>
          </div>
        </Grid>
        <Divider />
        <List className={listClasses.root} dense>
          {Array.isArray(city_weather_data) && city_weather_data.length ? (
            <>
              <ListItem button dense>
                <ListItemAvatar>
                  <ListItemIcon>
                    <RoomIcon />
                  </ListItemIcon>
                </ListItemAvatar>
                <ListItemText
                  primary='Location'
                  secondary={`${city_weather_data[0].city}, ${city_weather_data[0].state}, ${city_weather_data[0].country}`}
                />
              </ListItem>
              <ListItem button onClick={toggleWeatherList} dense>
                <ListItemIcon>
                  <CloudIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Current Weather'
                  secondary={`As of: ${moment(
                    city_weather_data[0].current.weather.ts
                  ).format('ddd, MMMM Do YYYY, hh:mm a')}`}
                />
                {weatherListOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={weatherListOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding dense>
                  <ListItem button className={classes.nested} dense>
                    <ListItemIcon>
                      <WbSunnyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary='Temp. (C° / F°)'
                      secondary={`${
                        city_weather_data[0].current.weather.tp
                      }° / ${
                        (city_weather_data[0].current.weather.tp * 9) / 5 + 32
                      }°`}
                    />
                  </ListItem>
                  <ListItem button className={classes.nested} dense>
                    <ListItemIcon>
                      <InvertColorsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary='Humidity'
                      secondary={`${city_weather_data[0].current.weather.hu}%`}
                    />
                  </ListItem>
                  <ListItem button className={classes.nested} dense>
                    <ListItemIcon>
                      <Icon className='fas fa-wind' />
                    </ListItemIcon>
                    <ListItemText
                      primary='Wind (m/s)'
                      secondary={`${
                        city_weather_data[0].current.weather.ws
                      } - ${
                        city_weather_data[0].current.weather.wd >= 0 &&
                        city_weather_data[0].current.weather.wd <= 89
                          ? `N`
                          : city_weather_data[0].current.weather.wd >= 90 &&
                            city_weather_data[0].current.weather.wd <= 179
                          ? 'E'
                          : city_weather_data[0].current.weather.wd >= 180 &&
                            city_weather_data[0].current.weather.wd <= 269
                          ? 'S'
                          : 'W'
                      }`}
                    />
                  </ListItem>
                  <ListItem button className={classes.nested} dense>
                    <ListItemIcon>
                      <Icon className='fas fa-compress-arrows-alt' />
                    </ListItemIcon>
                    <ListItemText
                      primary='Atmospheric Pressure (aHp)'
                      secondary={`${city_weather_data[0].current.weather.wd}`}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </>
          ) : (
            <></>
          )}
        </List>
      </Paper>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    states: state.states.states,
    cities: state.cities.cities,
    selected_state: state.states.selected_state,
    selected_city: state.cities.selected_city,
    city_weather_data: state.cityWeatherData.city_weather_data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBorderColorByTemp: (temp) => dispatch(setBorderColorByTemp(temp)),
    getStateGeoData: (state, country) =>
      dispatch(getStateGeoData(state, country)),
    getCityGeodata: (city, state, country) =>
      dispatch(getCityGeodata(city, state, country)),
    getStates: (country) => dispatch(getStates(country)),
    getCities: (state, country) => dispatch(getCities(state, country)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
    getCityWeatherData: (city, state, country) =>
      dispatch(getCityWeatherData(city, state, country)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoColumn)
