import React, { useEffect, useState } from 'react';
import CurrencyFormatter from '../components/CurrencyFormatter';
import CurrencySelector from '../components/CurrencyFormatter/CurrencySelector';
import { CurrencyProvider } from '../components/CurrencyFormatter/CurrencyContext';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your source (e.g., Supabase or local)
    const fetchProducts = async () => {
      const data = [
        {
          id: 1,
          name: 'Luxury Watch',
          price: 1000,
          image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        },
        {
          id: 2,
          name: 'Premium Shoes',
          price: 2500,
          image_url: 'https://images.unsplash.com/photo-1606811841653-0ef4b3ba4c8c',
        },
        {
          id: 3,
          name: 'Designer Bag',
          price: 8000,
          image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
        },
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <CurrencyProvider>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>🛍️ Welcome to Swagyo Luxury Shop</h1>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <CurrencySelector />
        </div>

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
                <CurrencyFormatter amount={product.price} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </CurrencyProvider>
  );
}
