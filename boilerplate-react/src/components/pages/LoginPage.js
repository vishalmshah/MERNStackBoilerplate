import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginForm } from '../forms';
import { login } from '../../actions/auth';

class LoginPage extends Component {

  submit = (data) =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <Link to='/'>Home</Link>

        <LoginForm submit={this.submit} />
      </div>
    )
  }

}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
