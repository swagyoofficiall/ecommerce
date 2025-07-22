import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import * as styles from './address.module.css';

import AccountLayout from '../../components/AccountLayout';
import AddressCard from '../../components/AddressCard';
import AddressForm from '../../components/AddressForm';
import Breadcrumbs from '../../components/Breadcrumbs';
import Icon from '../../components/Icons/Icon';
import Layout from '../../components/Layout/Layout';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

import { isAuth } from '../../helpers/general';
import { supabase } from '../../lib/supabase';

const AddressPage = () => {
  const [addressList, setAddressList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Redirect if not authenticated
  if (isAuth() === false) {
    navigate('/login');
  }

  // Fetch addresses from Supabase
  useEffect(() => {
    const fetchAddresses = async () => {
      const userId = localStorage.getItem('user_id');
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId);

      if (!error) setAddressList(data || []);
    };

    fetchAddresses();
  }, [showForm]);

  // Delete address from Supabase
  const handleDelete = async () => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', deleteId);

    if (!error) {
      setAddressList(addressList.filter((addr) => addr.id !== deleteId));
      setShowDelete(false);
      setDeleteId(null);
    }
  };

  return (
    <Layout>
      <AccountLayout>
        <Breadcrumbs
          crumbs={[
            { link: '/', label: 'Home' },
            { link: '/account', label: 'Account' },
            { link: '/account/address', label: 'Addresses' },
          ]}
        />

        <h1>Addresses</h1>

        {!showForm && (
          <div className={styles.addressListContainer}>
            {addressList.map((address) => (
              <AddressCard
                key={address.id}
                {...address}
                showForm={() => setShowForm(true)}
                showDeleteForm={() => {
                  setShowDelete(true);
                  setDeleteId(address.id);
                }}
              />
            ))}

            <div
              className={styles.addCard}
              role={'presentation'}
              onClick={() => setShowForm(true)}
            >
              <Icon symbol="plus" />
              <span>new address</span>
            </div>
          </div>
        )}

        {showForm && (
          <AddressForm
            closeForm={() => setShowForm(false)}
            onSaved={() => setShowForm(false)} // Optional callback for refetch
          />
        )}
      </AccountLayout>

      <Modal visible={showDelete} close={() => setShowDelete(false)}>
        <div className={styles.confirmDeleteContainer}>
          <h4>Delete Address?</h4>
          <p>
            Are you sure you want to delete this address? You cannot undo this
            action once you press <strong>'Delete'</strong>
          </p>
          <div className={styles.actionContainer}>
            <Button onClick={handleDelete} level="primary">
              Delete
            </Button>
            <Button onClick={() => setShowDelete(false)} level="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddressPage;
