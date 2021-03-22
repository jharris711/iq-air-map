import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import {
  Divider,
  Grid,
  Paper,
  Typography,
  MenuItem,
  TextField,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';

import {
  selectCountry,
  selectState,
  selectCity,
  getCountries,
  getGeoData,
  getStates,
  getStateGeoData,
  getCities,
  getCityGeodata,
} from '../../redux';

import { paperStyles } from './styles';

const InfoColumn = ({
  countries,
  states,
  cities,
  selected_country,
  selected_state,
  selected_city,
  getGeoData,
  getStateGeoData,
  getCityGeodata,
  getCountries,
  getStates,
  getCities,
  selectCountry,
  selectState,
  selectCity,
}) => {
  const paperClasses = paperStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selected_country) {
      getGeoData(selected_country);
      getStates(selected_country);
    }
  }, [selected_country, getGeoData, getStates]);

  useEffect(() => {
    getStateGeoData(selected_state, selected_country);
    getCities(selected_state, selected_country);
  }, [selected_state, getStateGeoData, getCities]);

  useEffect(() => {
    getCityGeodata(selected_city, selected_state, selected_country);
  }, [selected_city, getCityGeodata]);

  const handleSelectCountry = (event) => {
    const countryToSelect = event.target.value;
    selectCountry(countryToSelect);
  };

  const handleSelectState = (event) => {
    const stateToSelect = event.target.value;
    selectState(stateToSelect);
  };

  const handleSelectCity = (event) => {
    const cityToSelect = event.target.value;
    selectCity(cityToSelect);
  };

  return (
    <>
      <Paper className={paperClasses.root} elevation={3}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            style={{ padding: '10px' }}
          >
            Weather And Stuff
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            style={{ padding: '10px' }}
          >
            This app uses the{' '}
            <a
              href="https://www.iqair.com/us/air-pollution-data-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              AirVisual Air Quality API
            </a>
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
              id="filled-select-country"
              select
              value={selected_country}
              onChange={handleSelectCountry}
              helperText="Please select a country"
              variant="outlined"
              margin="dense"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.from(countries).map((country) => {
                // console.log(country);
                return (
                  <MenuItem key={`${country}-key`} value={country}>
                    {country}
                  </MenuItem>
                );
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
              id="filled-select-state"
              select
              value={selected_state}
              onChange={handleSelectState}
              helperText="Please select a state"
              variant="outlined"
              margin="dense"
              disabled={Array.isArray(states) && states.length ? false : true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.from(states).map((state) => {
                // console.log(country);
                return (
                  <MenuItem key={`${state}-key`} value={state}>
                    {state}
                  </MenuItem>
                );
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
              id="filled-select-city"
              select
              value={selected_city}
              onChange={handleSelectCity}
              helperText="Please select a city"
              variant="outlined"
              margin="dense"
              disabled={Array.isArray(cities) && cities.length ? false : true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.from(cities).map((city) => {
                // console.log(country);
                return (
                  <MenuItem key={`${city}-key`} value={city}>
                    {city}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries.countries,
    states: state.states.states,
    cities: state.cities.cities,
    selected_country: state.countries.selected_country,
    selected_state: state.states.selected_state,
    selected_city: state.cities.selected_city,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGeoData: (country) => dispatch(getGeoData(country)),
    getStateGeoData: (state, country) =>
      dispatch(getStateGeoData(state, country)),
    getCityGeodata: (city, state, country) =>
      dispatch(getCityGeodata(city, state, country)),
    getCountries: () => dispatch(getCountries()),
    getStates: (country) => dispatch(getStates(country)),
    getCities: (state, country) => dispatch(getCities(state, country)),
    selectCountry: (country) => dispatch(selectCountry(country)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoColumn);
