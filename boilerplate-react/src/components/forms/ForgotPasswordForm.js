import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { InlineError } from '../messages';

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ''
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

    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    // if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    // if (!dta.password) errors.password = 'Can\'t be blank';

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {!!errors.global && <InlineError>{errors.global}</InlineError>}
        <div error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='email@email.com'
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError>{errors.email}</InlineError>}
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
