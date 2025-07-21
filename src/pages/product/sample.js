import React, { useState, useEffect, useContext } from 'react';
import { useParams } from '@reach/router';
import * as styles from './sample.module.css';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import Split from '../../components/Split';
import SwatchList from '../../components/SwatchList';
import Layout from '../../components/Layout/Layout';

import Icon from '../../components/Icons/Icon';
import ProductCardGrid from '../../components/ProductCardGrid';
import { navigate } from 'gatsby';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import { supabase } from '../../lib/supabase';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const ctxAddItemNotification = useContext(AddItemNotificationContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      setProduct(data);
      setActiveSwatch(data.colorOptions?.[0]);
      setActiveSize(data.sizeOptions?.[0]);
    };

    fetchProduct();
  }, [slug]);

  if (!product) return <p>Loading product...</p>;

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: product.category || 'Shop', link: '/shop' },
              { label: product.name }
            ]}
          />
          <div className={styles.content}>
            <div className={styles.gallery}>
              <Gallery images={product.images || []} />
            </div>
            <div className={styles.details}>
              <h1>{product.name}</h1>
              <span className={styles.vendor}>by {product.vendor}</span>

              <div className={styles.priceContainer}>
                <CurrencyFormatter appendZero amount={product.price} />
              </div>

              <SwatchList
                swatchList={product.colorOptions || []}
                activeSwatch={activeSwatch}
                setActiveSwatch={setActiveSwatch}
              />

              <div className={styles.sizeContainer}>
                <SizeList
                  sizeList={product.sizeOptions || []}
                  activeSize={activeSize}
                  setActiveSize={setActiveSize}
                />
              </div>

              <div className={styles.quantityContainer}>
                <span>Quantity</span>
                <AdjustItem qty={qty} setQty={setQty} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button onClick={() => ctxAddItemNotification.showNotification()} fullWidth level="primary">
                    Add to Bag
                  </Button>
                </div>
                <div
                  className={styles.wishlistActionContainer}
                  role="presentation"
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <Icon symbol="heart" />
                  <div className={`${styles.heartFillContainer} ${isWishlist ? styles.show : styles.hide}`}>
                    <Icon symbol="heartFill" />
                  </div>
                </div>
              </div>

              <div className={styles.description}>
                <p>{product.description}</p>
                <span>Product code: {product.productCode}</span>
              </div>

              <div className={styles.informationContainer}>
                <Accordion type="plus" customStyle={styles} title="composition & care">
                  <p className={styles.information}>{product.description}</p>
                </Accordion>
                <Accordion type="plus" customStyle={styles} title="delivery & returns">
                  <p className={styles.information}>{product.description}</p>
                </Accordion>
                <Accordion type="plus" customStyle={styles} title="help">
                  <p className={styles.information}>{product.description}</p>
                </Accordion>
              </div>
            </div>
          </div>

          <div className={styles.suggestionContainer}>
            <h2>You may also like</h2>
            <ProductCardGrid
              spacing
              showSlider
              height={400}
              columns={4}
              data={[]} // ✅ Replace with related Supabase products later if needed
            />
          </div>
        </Container>

        <div className={styles.attributeContainer}>
          <Split
            image={'/cloth.png'}
            alt={'attribute description'}
            title={'Sustainability'}
            description={
              'We design our products to look good and to be used on a daily basis...'
            }
            ctaText={'learn more'}
            cta={() => navigate('/blog')}
            bgColor={'var(--standard-light-grey)'}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
