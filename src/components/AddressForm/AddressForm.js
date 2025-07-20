import React, { useState, useEffect } from 'react';
import * as styles from './AddressForm.module.css';

import Button from '../Button';
import FormInputField from '../FormInputField';
import supabase from '../../lib/supabase'; // ✅ correct import

const AddressForm = ({ closeForm, onSaved }) => {
  const initialState = {
    name: '',
    address: '',
    state: '',
    postal: '',
    country: '',
    company: '',
  };

  const errorState = {
    name: '',
    address: '',
    state: '',
    postal: '',
    country: '',
    company: '',
  };

  const [form, setForm] = useState(initialState);
  const [errorForm, setErrorForm] = useState(errorState);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    getUser();
  }, []);

  const handleChange = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorForm(errorState);

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    const { error } = await supabase.from('addresses').insert([
      {
        user_id: userId,
        name: form.name,
        address: form.address,
        state: form.state,
        postal: form.postal,
        country: form.country,
        company: form.company,
      },
    ]);

    if (error) {
      console.error('Insert error:', error.message);
      alert('Error saving address.');
      return;
    }

    if (typeof onSaved === 'function') {
      onSaved(); // 🔁 tell parent to refresh list
    }

    closeForm(); // ✅ Close the form
  };

  return (
    <div className={styles.root}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <FormInputField
          id="name"
          value={form.name}
          handleChange={handleChange}
          type="input"
          labelName="Name"
          error={errorForm.name}
        />
        <FormInputField
          id="company"
          value={form.company}
          handleChange={handleChange}
          type="input"
          labelName="Company"
          error={errorForm.company}
        />
        <FormInputField
          id="address"
          value={form.address}
          handleChange={handleChange}
          type="input"
          labelName="Street Address"
          error={errorForm.address}
        />
        <FormInputField
          id="country"
          value={form.country}
          handleChange={handleChange}
          type="input"
          labelName="Country"
          error={errorForm.country}
        />
        <FormInputField
          id="state"
          value={form.state}
          handleChange={handleChange}
          type="input"
          labelName="State"
          error={errorForm.state}
        />
        <FormInputField
          id="postal"
          value={form.postal}
          handleChange={handleChange}
          type="number"
          labelName="Postal Code"
          error={errorForm.postal}
        />

        <div className={styles.actionContainers}>
          <Button fullWidth type="submit" level="primary">
            Save
          </Button>
          <Button
            fullWidth
            type="button"
            onClick={closeForm}
            level="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
