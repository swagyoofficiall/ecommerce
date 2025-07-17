import React, { useState } from 'react';
import { navigate } from 'gatsby';
import {
  validateEmail,
  validateStrongPassword,
  isEmpty,
} from '../helpers/general';
import * as styles from './signup.module.css';

import AttributeGrid from '../components/AttributeGrid/AttributeGrid';
import Layout from '../components/Layout/Layout';
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY
);

const SignupPage = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const errorState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [signupForm, setSignupForm] = useState(initialState);
  const [errorForm, setErrorForm] = useState(errorState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (id, e) => {
    const tempForm = { ...signupForm, [id]: e };
    setSignupForm(tempForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validForm = true;
    const tempError = { ...errorState };
    setErrorMessage('');

    if (isEmpty(signupForm.firstName)) {
      tempError.firstName = 'Field required';
      validForm = false;
    }

    if (isEmpty(signupForm.lastName)) {
      tempError.lastName = 'Field required';
      validForm = false;
    }

    if (validateEmail(signupForm.email) !== true) {
      tempError.email =
        'Please use a valid email address, such as user@example.com.';
      validForm = false;
    }

    if (validateStrongPassword(signupForm.password) !== true) {
      tempError.password =
        'Password must have at least 8 characters, 1 lowercase, 1 uppercase and 1 numeric character.';
      validForm = false;
    }

    setErrorForm(tempError);

    if (!validForm) return;

    try {
      // Signup with email + password
      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            first_name: signupForm.firstName,
            last_name: signupForm.lastName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Signup failed');
        return;
      }

      if (data.user) {
        // Redirect to accountSuccess page after signup
        navigate('/accountSuccess');
      }
    } catch (err) {
      setErrorMessage('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <Layout disablePaddingBottom={true}>
      <div className={styles.root}>
        <div className={styles.signupFormContainer}>
          <h1 className={styles.title}>Create Account</h1>
          <span className={styles.subtitle}>
            Please enter your the information below:
          </span>

          {errorMessage && (
            <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</p>
          )}

          <form
            noValidate
            className={styles.signupForm}
            onSubmit={handleSubmit}
          >
            <FormInputField
              id={'firstName'}
              value={signupForm.firstName}
              handleChange={handleChange}
              type={'input'}
              labelName={'First Name'}
              error={errorForm.firstName}
            />

            <FormInputField
              id={'lastName'}
              value={signupForm.lastName}
              handleChange={handleChange}
              type={'input'}
              labelName={'Last Name'}
              error={errorForm.lastName}
            />

            <FormInputField
              id={'email'}
              value={signupForm.email}
              handleChange={handleChange}
              type={'email'}
              labelName={'Email'}
              error={errorForm.email}
            />

            <FormInputField
              id={'password'}
              value={signupForm.password}
              handleChange={handleChange}
              type={'password'}
              labelName={'Password'}
              error={errorForm.password}
            />

            <Button fullWidth type={'submit'} level={'primary'}>
              create account
            </Button>
            <span className={styles.reminder}>Have an account?</span>
            <Button
              type={'button'}
              onClick={() => navigate('/login')}
              fullWidth
              level={'secondary'}
            >
              log in
            </Button>
          </form>
        </div>

        <div className={styles.attributeGridContainer}>
          <AttributeGrid />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
