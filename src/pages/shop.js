import * as React from 'react';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout/Layout';
import Container from '../components/Container';
import Title from '../components/Title';

import { supabase } from '../lib/supabase';
import * as styles from './shop.module.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <Layout>
      <Container size="large">
        <Title name="Shop All Products" />
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  padding: '1rem',
                  background: '#fff',
                  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                }}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <h3 style={{ marginTop: '1rem' }}>{product.name}</h3>
                <p style={{ color: '#333', fontWeight: 'bold' }}>
                  ₹{product.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default ShopPage;
