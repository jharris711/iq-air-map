import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import {
  makeStyles,
  Divider,
  Grid,
  Paper,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  PinDropIcon,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';

import {
  getCountries,
  selectCountry,
  selectState,
  getGeoData,
  getStates,
  getStateGeoData,
} from '../../redux';

import { paperStyles } from './styles';

const InfoColumn = ({
  geoData,
  countries,
  states,
  selected_country,
  selected_state,
  getGeoData,
  getStateGeoData,
  getCountries,
  getStates,
  selectCountry,
  selectState,
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
    console.log(selected_state);
    getStateGeoData(selected_state);
  }, [selected_state, getStateGeoData]);

  useEffect(() => {
    console.log(states);
  }, [states]);

  const handleSelectCountry = (event) => {
    const countryToSelect = event.target.value;
    selectCountry(countryToSelect);
  };

  const handleSelectState = (event) => {
    const stateToSelect = event.target.value;
    selectState(stateToSelect);
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
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    geodata: state.geodata.geodata,
    countries: state.countries.countries,
    states: state.states.states,
    selected_country: state.countries.selected_country,
    selected_state: state.states.selected_state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGeoData: (country) => dispatch(getGeoData(country)),
    getStateGeoData: (state) => dispatch(getStateGeoData(state)),
    getCountries: () => dispatch(getCountries()),
    getStates: (country) => dispatch(getStates(country)),
    selectCountry: (country) => dispatch(selectCountry(country)),
    selectState: (state) => dispatch(selectState(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoColumn);
