import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './settings.module.css';

import AccountLayout from '../../components/AccountLayout';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import FormInputField from '../../components/FormInputField';
import Layout from '../../components/Layout/Layout';

import {
  validateEmail,
  validateStrongPassword,
  isAuth,
} from '../../helpers/general';

import { supabase } from '../../lib/supabase';

const SettingsPage = () => {
  const user = isAuth();
  if (!user) {
    navigate('/login');
    return null;
  }

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const errorState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [updateForm, setUpdateForm] = useState(initialState);
  const [error, setError] = useState(errorState);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUpdateForm((prev) => ({
          ...prev,
          email: data.user.email || '',
        }));
        setIsAdmin(data.user.email === 'swagyoofficial@gmail.com');
      }
    };
    fetchUser();
  }, []);

  const handleChange = (id, e) => {
    const tempForm = { ...updateForm, [id]: e };
    setUpdateForm(tempForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validForm = true;
    const tempError = { ...errorState };

    if (updateForm.email !== '') {
      if (!validateEmail(updateForm.email)) {
        validForm = false;
        tempError.email = 'Please use a valid email address, such as user@example.com.';
      }
    }

    if (updateForm.password !== '') {
      if (!validateStrongPassword(updateForm.password)) {
        validForm = false;
        tempError.password = 'Password must have at least 8 characters, 1 lowercase, 1 uppercase and 1 numeric character.';
      }
      if (updateForm.password !== updateForm.confirmPassword) {
        validForm = false;
        tempError.confirmPassword = 'Confirm password does not match.';
      }
    }

    if (!validForm) {
      setError(tempError);
      return;
    }

    // Update Supabase user
    const updates = {};
    if (updateForm.email) updates.email = updateForm.email;
    if (updateForm.password) updates.password = updateForm.password;

    const { error: updateError } = await supabase.auth.updateUser(updates);

    if (updateError) {
      alert('Update failed: ' + updateError.message);
    } else {
      alert('Account updated successfully!');
      setError(errorState);
      setUpdateForm(initialState);
    }
  };

  return (
    <Layout>
      <AccountLayout>
        <Breadcrumbs
          crumbs={[
            { link: '/', label: 'Home' },
            { link: '/account', label: 'Account' },
            { link: '/account/settings', label: 'Settings' },
          ]}
        />
        <h1>Settings</h1>
        {isAdmin && <p style={{ color: 'green', fontWeight: 'bold' }}>Admin Account</p>}
        <div>
          <form onSubmit={(e) => handleSubmit(e)} noValidate>
            <div className={styles.nameSection}>
              <FormInputField
                id={'firstName'}
                value={updateForm.firstName}
                handleChange={(id, e) => handleChange(id, e)}
                type={'input'}
                labelName={'First Name'}
              />
              <FormInputField
                id={'lastName'}
                value={updateForm.lastName}
                handleChange={(id, e) => handleChange(id, e)}
                type={'input'}
                labelName={'Last Name'}
              />
              <FormInputField
                id={'email'}
                value={updateForm.email}
                handleChange={(id, e) => handleChange(id, e)}
                type={'email'}
                labelName={'Email'}
                error={error.email}
              />
            </div>

            <div className={styles.passwordContainer}>
              <h2>Change Password</h2>
              <div className={styles.passwordSection}>
                <FormInputField
                  id={'password'}
                  value={updateForm.password}
                  handleChange={(id, e) => handleChange(id, e)}
                  type={'password'}
                  labelName={'New Password'}
                  error={error.password}
                />
                <FormInputField
                  id={'confirmPassword'}
                  value={updateForm.confirmPassword}
                  handleChange={(id, e) => handleChange(id, e)}
                  type={'password'}
                  labelName={'Confirm Password'}
                  error={error.confirmPassword}
                />
                <Button level={'primary'} type={'submit'}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default SettingsPage;
