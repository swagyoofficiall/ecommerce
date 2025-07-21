import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './viewed.module.css';

import AccountLayout from '../../components/AccountLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Layout from '../../components/Layout/Layout';
import ProductCardGrid from '../../components/ProductCardGrid';

import { isAuth } from '../../helpers/general';
import { supabase } from '../../lib/supabase';

const RecentlyViewedPage = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const user = isAuth();
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('recently_viewed')
          .select('product_id, products(*)')
          .eq('user_email', user.email)
          .order('viewed_at', { ascending: false })
          .limit(6); // You can adjust how many recent items to show

        if (error) throw error;

        // Extract product info from joined result
        const products = data.map(item => item.products);
        setRecentlyViewed(products || []);
      } catch (err) {
        console.error('Error fetching recently viewed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  return (
    <Layout>
      <AccountLayout>
        <Breadcrumbs
          crumbs={[
            { link: '/', label: 'Home' },
            { link: '/account', label: 'Account' },
            { link: '/account/viewed', label: 'Recently Viewed' },
          ]}
        />
        <div className={styles.root}>
          <h1>Recently Viewed</h1>
          {loading ? (
            <p>Loading...</p>
          ) : recentlyViewed.length === 0 ? (
            <p>You haven't viewed any products yet.</p>
          ) : (
            <div className={styles.gridContainer}>
              <ProductCardGrid
                spacing={true}
                height={480}
                columns={3}
                data={recentlyViewed}
              />
            </div>
          )}
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default RecentlyViewedPage;
