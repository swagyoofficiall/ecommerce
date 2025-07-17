import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // ✅ Adjust path if needed

const SupabaseTestPage = () => {
  const [message, setMessage] = useState('Connecting...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try fetching data from a known table like "products"
        const { data, error } = await supabase.from('products').select('*').limit(1);

        if (error) {
          setMessage(`❌ Error: ${error.message}`);
        } else {
          setMessage(`✅ Supabase connected! Sample data: ${JSON.stringify(data)}`);
        }
      } catch (err) {
        setMessage(`❌ Exception: ${err.message}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Supabase Test</h2>
      <p>{message}</p>
    </div>
  );
};

export default SupabaseTestPage;
