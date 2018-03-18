import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignupForm } from '../forms';
import { signup } from '../../actions/users';

class SignupPage extends Component {

  submit = (data) =>
    this.props.signup(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>Sign Up Page</h1>
        <Link to='/'>Home</Link>

        <SignupForm submit={this.submit} />
      </div>
    )
  }

}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
