import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';

const TopNavigation = ({ user, logout }) => (
  <div>
    <Link to='/dashboard'>Dashboard</Link>
    <img src={gravatarUrl(user.email)} alt={user.email} />
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  </div>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
};
 
export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);