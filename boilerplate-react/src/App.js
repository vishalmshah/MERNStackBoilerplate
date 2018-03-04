import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HomePage, LoginPage, DashboardPage } from "./components/pages";
import { UserRoute, GuestRoute } from './components/routes';
// import { Grid } from 'react-flexbox-grid';

// TODO: Change div to <Grid fluid></Grid>
// OPTION: add {location} as a parameter
const App = ({ location }) => (
  <div>
    <Route location={location}  path='/' exact component={HomePage} />
    <GuestRoute location={location}  path='/login' exact component={LoginPage} />
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
  </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
