import React, { useState } from 'react';
import { validateEmail } from '../helpers/general';
import * as styles from './forgot.module.css';

import Layout from '../components/Layout/Layout';
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';
import AttributeGrid from '../components/AttributeGrid';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY
);

const ForgotPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (validateEmail(email) !== true) {
      setError('Not a valid email address');
      return;
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setError(error.message || 'Failed to send reset email.');
        return;
      }

      setSuccessMessage(
        'If your email is registered, a password reset link has been sent.'
      );
      setEmail('');
    } catch (err) {
      setError('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.message}>
          Fill in your email below to request a new password. An email will be
          sent to the address below containing a link to verify your email
          address.
        </p>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <form
          className={styles.formContainer}
          noValidate
          onSubmit={handleSubmit}
        >
          <FormInputField
            id={'email'}
            value={email}
            handleChange={(_, e) => setEmail(e)}
            type={'email'}
            labelName={'Email'}
            error={error}
          />
          <div className={styles.buttonContainer}>
            <Button fullWidth level={'primary'} type={'submit'}>
              reset password
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.gridContainer}>
        <AttributeGrid />
      </div>
    </Layout>
  );
};

export default ForgotPage;
