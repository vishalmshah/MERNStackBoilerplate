import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ForgotPasswordForm } from '../forms';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
  }

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() { 
    return (
      <div>
        {this.state.success ? (
          <p>Email has been sent.</p>
         ) : (
          <ForgotPasswordForm submit={this.submit} />
         )}
      </div>
    )
  }

}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);