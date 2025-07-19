import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';

import AccountNav from '../AccountNav';
import Container from '../Container';

import * as styles from './AccountLayout.module.css';

const ADMIN_EMAIL = 'swagyoofficial@gmail.com';

const AccountLayout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Supabase error:', error.message);
        return;
      }

      if (user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, []);

  return (
    <div className={styles.root}>
      <Container size="large">
        <div className={styles.layout}>
          <AccountNav />
          <div className={styles.childrenContainer}>
            {children}
            {isAdmin && (
              <div style={{ marginTop: '1rem' }}>
                <a href="/admin" className={styles.adminButton}>
                  Admin Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountLayout;
