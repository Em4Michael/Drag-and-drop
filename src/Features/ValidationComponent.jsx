import React from 'react';

const ValidationComponent = ({ formData, validate }) => {
  const { email, password } = formData;
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  validate(errors);

  return null;
};

export default ValidationComponent;
