import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.sass'

const InlineError = ({ text }) => <span className={styles.error}>{text}</span>

InlineError.propTypes = {
  text: PropTypes.string.isRequired
}

export default InlineError;
