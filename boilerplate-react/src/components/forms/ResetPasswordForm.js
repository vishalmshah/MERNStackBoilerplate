import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineError } from '../messages';

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = data => {
    const errors = {};

    if(!data.password) errors.password = 'Can\'t be blank';
    if(data.password !== data.passwordConfirmation) errors.password = 'Passwords must match';

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {!!errors.global && <InlineError>{errors.global}</InlineError>}
        <div error={!!errors.email}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Your New Password'
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError>{errors.password}</InlineError>}
        </div>
        <div error={!!errors.email}>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            type='password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            placeholder='Type it again'
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && <InlineError>{errors.passwordConfirmation}</InlineError>}
        </div>
        <button>Reset</button>
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
