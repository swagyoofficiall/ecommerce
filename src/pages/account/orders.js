import React, { useEffect, useState } from 'react';
import * as styles from './orders.module.css';

import AccountLayout from '../../components/AccountLayout/AccountLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Layout from '../../components/Layout/Layout';
import OrderItem from '../../components/OrderItem/OrderItem';

import { isAuth } from '../../helpers/general';
import { navigate } from 'gatsby';
import { supabase } from '../../helpers/supabaseClient';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = isAuth();
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_email', user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <AccountLayout>
        <Breadcrumbs
          crumbs={[
            { link: '/', label: 'Home' },
            { link: '/account', label: 'Account' },
            { link: '/account/orders/', label: 'Orders' },
          ]}
        />
        <h1>Orders</h1>

        <div className={`${styles.tableHeaderContainer} ${styles.gridStyle}`}>
          <span className={styles.tableHeader}>Order #</span>
          <span className={styles.tableHeader}>Order Placed</span>
          <span className={styles.tableHeader}>Last Update</span>
          <span className={styles.tableHeader}>Status</span>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              headerStyling={styles.gridStyle}
            />
          ))
        )}
      </AccountLayout>
    </Layout>
  );
};

export default OrderPage;
