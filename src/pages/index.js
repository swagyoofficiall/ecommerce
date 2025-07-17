import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import CurrencyFormatter from '../components/CurrencyFormatter';
import CurrencySelector from '../components/CurrencyFormatter/CurrencySelector';
import { CurrencyProvider } from '../components/CurrencyFormatter/CurrencyContext';

const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let { data, error } = await supabase
          .from('products')
          .select('id, name, price, image_url');

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <CurrencyProvider>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>🛍️ Welcome to Swagyo Luxury Shop</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '1rem',
          }}
        >
          <CurrencySelector />
        </div>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                  <CurrencyFormatter amount={product.price} currency="INR" />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </CurrencyProvider>
  );
}
