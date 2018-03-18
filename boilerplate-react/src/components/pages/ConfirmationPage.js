import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      success: false
    }
  }

  componentDidMount() {
    this.props.confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>

        {loading && (
          <p>Validating your email...</p>
        )}

        {!loading && success && (
          <div>
            <p>Email Validated!</p>
            <Link to='/dashboard'>Go to dashboard</Link>
          </div>
        )}

        {!loading && !success && (
          <div>
            <p>Invalid Token!</p>
          </div>
        )}
        
      </div>
    )
  }

}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);