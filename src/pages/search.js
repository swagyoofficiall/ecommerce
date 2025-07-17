import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';

import Breadcrumbs from '../components/Breadcrumbs';
import Layout from '../components/Layout/Layout';
import Container from '../components/Container/Container';
import ProductCardGrid from '../components/ProductCardGrid';

import { createClient } from '@supabase/supabase-js';

import * as styles from './search.module.css';

const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY
);

const SearchPage = (props) => {
  const params = parse(props.location.search);
  const searchQuery = params.q ? params.q.trim() : '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);

      // Adjust column names to your Supabase products table schema
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchQuery}%`) // case-insensitive partial match
        .limit(20);

      if (error) {
        console.error('Search error:', error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <Layout>
      <div className={styles.root}>
        <Container size="large" spacing="min">
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: `Search results for '${searchQuery}'` },
            ]}
          />
          <div className={styles.searchLabels}>
            <h4>Search results for '{searchQuery}'</h4>
            <span>{loading ? 'Loading...' : `${products.length} result${products.length !== 1 ? 's' : ''}`}</span>
          </div>
          <ProductCardGrid
            showSlider={false}
            height={580}
            columns={3}
            data={products}
          />
        </Container>
      </div>
    </Layout>
  );
};

export default SearchPage;
