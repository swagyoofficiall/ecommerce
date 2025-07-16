import React, { useState, useEffect } from 'react';
import * as styles from './shop.module.css';

import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import CardController from '../components/CardController';
import Container from '../components/Container';
import Chip from '../components/Chip';
import Icon from '../components/Icons/Icon';
import Layout from '../components/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import Button from '../components/Button';
import Config from '../config.json';

import { supabase } from '../lib/supabase'; // ✅ Ensure you have supabase.js client setup

const ShopPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);

  // ✅ Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data);
      }
    };
    fetchProducts();

    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  }, []);

  const escapeHandler = (e) => {
    if (e?.keyCode === 27) setShowFilter(false);
  };

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={[
                { link: '/', label: 'Home' },
                { label: 'Shop' },
              ]}
            />
          </div>
        </Container>

        <Banner
          maxWidth={'650px'}
          name={`All Products`}
          subtitle={`Shop the latest collection available in-store.`}
        />

        <Container size={'large'} spacing={'min'}>
          <div className={styles.metaContainer}>
            <span className={styles.itemCount}>{products.length} items</span>
            <div className={styles.controllerContainer}>
              <div
                className={styles.iconContainer}
                role={'presentation'}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Icon symbol={'filter'} />
                <span>Filters</span>
              </div>
              <div className={`${styles.iconContainer} ${styles.sortContainer}`}>
                <span>Sort by</span>
                <Icon symbol={'caret'} />
              </div>
            </div>
          </div>

          <CardController
            closeFilter={() => setShowFilter(false)}
            visible={showFilter}
            filters={Config.filters}
          />

          <div className={styles.chipsContainer}>
            <Chip name={'XS'} />
            <Chip name={'S'} />
          </div>

          {/* ✅ Render products from Supabase */}
          <div className={styles.productContainer}>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gap: '2rem',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                }}
              >
                {products.map((product) => (
                  <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '10px', background: '#fff' }}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.loadMoreContainer}>
            <span>{products.length} of {products.length}</span>
            <Button fullWidth level={'secondary'} disabled>
              LOAD MORE
            </Button>
          </div>
        </Container>
      </div>
      <LayoutOption />
    </Layout>
  );
};

export default ShopPage;
