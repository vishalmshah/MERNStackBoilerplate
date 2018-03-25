import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HomePage, LoginPage, SignupPage, DashboardPage, ConfirmationPage, ForgotPasswordPage, ResetPasswordPage } from "./components/pages";
import { UserRoute, GuestRoute } from './components/routes';
// import { Grid } from 'react-flexbox-grid';

// TODO: Change div to <Grid fluid></Grid>
// OPTION: add {location} as a parameter
const App = ({ location }) => (
  <div>
    <Route location={location}  path='/' exact component={HomePage} />
    <Route location={location}  path='/confirmation/:token' exact component={ConfirmationPage} />
    <GuestRoute location={location}  path='/login' exact component={LoginPage} />
    <GuestRoute location={location}  path='/signup' exact component={SignupPage} />
    <GuestRoute location={location}  path='/forgot_password' exact component={ForgotPasswordPage} />
    <GuestRoute location={location}  path='/reset_password/:token' exact component={ResetPasswordPage} />
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
  </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
