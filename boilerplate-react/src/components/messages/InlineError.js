import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.sass'

const InlineError = ({ children }) => <span className={styles.error}>{children}</span>

InlineError.propTypes = {
  children: PropTypes.string.isRequired
}

export default InlineError;
