import React, { useState, useEffect } from 'react';
import * as styles from './shopV2.module.css';

import Accordion from '../components/Accordion';
import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import Button from '../components/Button';

import Config from '../config.json';
import { supabase } from '../lib/supabase';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filterState, setFilterState] = useState(Config.filters);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const filterTick = (e, categoryIndex, labelIndex) => {
    const copy = [...filterState];
    copy[categoryIndex].items[labelIndex].value = !copy[categoryIndex].items[labelIndex].value;
    setFilterState(copy);
  };

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs crumbs={[{ link: '/', label: 'Home' }, { label: 'Shop' }]} />
        </Container>
        <Banner
          maxWidth={'650px'}
          name={`Swagyo Store`}
          subtitle={`Browse our exclusive premium collection.`}
        />
        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            <div className={styles.filterContainer}>
              {filterState.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <Accordion customStyle={styles} title={category.category}>
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={styles.filters}>
                        <Checkbox
                          size={'sm'}
                          action={(e) => filterTick(e, categoryIndex, itemIndex)}
                          label={item.name}
                          value={item.value}
                          id={item.name}
                          name={item.name}
                        />
                      </div>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
            <div>
              <div className={styles.metaContainer}>
                <span className={`standardSpan`}>{products.length} items</span>
              </div>
              {products.length === 0 ? (
                <p style={{ padding: '2rem', textAlign: 'center' }}>No products found.</p>
              ) : (
                <ProductCardGrid height={'440px'} data={products} currencySymbol="₹" />
              )}
            </div>
          </div>
          <div className={styles.loadMoreContainer}>
            <span>{products.length} of {products.length}</span>
            <Button fullWidth level={'secondary'}>LOAD MORE</Button>
          </div>
        </Container>
      </div>
      <LayoutOption />
    </Layout>
  );
};

export default ShopPage;
