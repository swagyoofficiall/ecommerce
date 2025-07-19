import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // ✅ your Supabase client
import * as styles from './AccountNav.module.css';

const AccountNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <div className={styles.webRoot}>
        <Link
          activeClassName={styles.activeLink}
          to="/account/orders/"
          className={styles.webLink}
        >
          Orders
        </Link>
        <Link
          activeClassName={styles.activeLink}
          to="/account/address/"
          className={styles.webLink}
        >
          Addresses
        </Link>
        <Link
          activeClassName={styles.activeLink}
          to="/account/settings/"
          className={styles.webLink}
        >
          Settings
        </Link>
        <Link
          activeClassName={styles.activeLink}
          to="/account/viewed/"
          className={styles.webLink}
        >
          Recently Viewed
        </Link>

        {user && (
          <span
            role="presentation"
            onClick={handleLogout}
            className={styles.webLink}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default AccountNav;
