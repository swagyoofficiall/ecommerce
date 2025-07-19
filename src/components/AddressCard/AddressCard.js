import React, { useEffect, useState } from 'react';
import * as styles from './AddressCard.module.css';
import { supabase } from '../../lib/supabase'; // ✅ Use your Supabase client

const AddressCard = (props) => {
  const {
    name,
    address,
    state,
    postal,
    country,
    company,
    showForm,
    showDeleteForm,
  } = props;

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Example: assumes `role` is stored in `public_users` table
        const { data, error } = await supabase
          .from('public_users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (data?.role === 'admin') {
          setIsAdmin(true);
        }
      }
    };

    checkAdmin();
  }, []);

  return (
    <div className={`${styles.root}`}>
      <span className={styles.name}>{name}</span>
      <span>{company}</span>
      <span>{address}</span>
      <span>{`${state} ${postal}`}</span>
      <span>{country}</span>

      {isAdmin && (
        <div className={styles.actionContainer}>
          <span role={'presentation'} onClick={showForm}>
            Edit
          </span>
          <span role={'presentation'} onClick={showDeleteForm}>
            Remove
          </span>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
