import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').eq('is_active', true);
      if (error) console.error('Error loading products:', error);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Swagyo Shop</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={p.image_url} alt={p.name} width="100%" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>{p.description}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
