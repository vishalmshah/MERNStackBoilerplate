import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Validator from 'validator';
import { InlineError } from '../messages';

class BoilerplateForm extends Component {
  state = {
    data: {},
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
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
    // Form validation
    // if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    // if (!dta.password) errors.password = 'Can\'t be blank';
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
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

        <div error={!!errors.password}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError>{errors.password}</InlineError>}
        </div>

        <button>Sign Up</button>
      </form>
    );
  }
}

BoilerplateForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default BoilerplateForm;
