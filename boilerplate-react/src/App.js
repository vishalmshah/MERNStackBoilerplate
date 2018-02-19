import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from "./components/pages";
// import { Grid } from 'react-flexbox-grid';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';

// TODO: Change div to <Grid fluid></Grid>
// OPTION: add {location} as a parameter
const App = () => (
  <div>
    <Route path='/' exact component={HomePage} />
    <Route path='/login' exact component={LoginPage} />
  </div>
)

export default App;
