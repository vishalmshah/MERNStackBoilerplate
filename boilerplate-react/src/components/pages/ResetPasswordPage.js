import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResetPasswordForm } from '../forms';
import { validateToken, resetPassword } from '../../actions/auth';

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      success: false
    }
  }

  componentDidMount() {
    this.props.validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }
  
  submit = data => 
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push('/login'));

  render() { 
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        { loading && <p>Loading...</p> }
        { !loading && success && <ResetPasswordForm submit={this.submit} token={token} /> }
        { !loading && !success && <p>Invalid Token</p> }
      </div>
    )
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    token: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
 
export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);