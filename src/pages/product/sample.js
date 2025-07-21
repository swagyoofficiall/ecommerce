import React, { useEffect, useState, useContext } from 'react';
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

const ProductPage = ({ location }) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState('');
  const [activeSize, setActiveSize] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const productId = new URLSearchParams(location.search).get('id'); // e.g. ?id=123

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (!error && data) {
        setProduct(data);
        setActiveSwatch(data.color_options?.[0] || '');
        setActiveSize(data.size_options?.[0] || '');
      }
    };

    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4);

      if (!error) {
        setSuggestions(data);
      }
    };

    if (productId) {
      fetchProduct();
      fetchSuggestions();
    }
  }, [productId]);

  if (!product) return <Layout><Container><p>Loading product...</p></Container></Layout>;

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: product.category || 'Shop', link: '/shop' },
              { label: product.name },
            ]}
          />

          <div className={styles.content}>
            <div className={styles.gallery}>
              <Gallery images={product.gallery || []} />
            </div>
            <div className={styles.details}>
              <h1>{product.name}</h1>
              <span className={styles.vendor}>by {product.vendor}</span>

              <div className={styles.priceContainer}>
                <CurrencyFormatter appendZero amount={product.price} />
              </div>

              {product.color_options?.length > 0 && (
                <SwatchList
                  swatchList={product.color_options}
                  activeSwatch={activeSwatch}
                  setActiveSwatch={setActiveSwatch}
                />
              )}

              {product.size_options?.length > 0 && (
                <div className={styles.sizeContainer}>
                  <SizeList
                    sizeList={product.size_options}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                  />
                </div>
              )}

              <div className={styles.quantityContainer}>
                <span>Quantity</span>
                <AdjustItem quantity={qty} onItemUpdate={(newQty) => setQty(newQty)} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button onClick={() => showNotification()} fullWidth level={'primary'}>
                    Add to Bag
                  </Button>
                </div>
                <div
                  className={styles.wishlistActionContainer}
                  role={'presentation'}
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <Icon symbol={'heart'} />
                  <div className={`${styles.heartFillContainer} ${isWishlist ? styles.show : styles.hide}`}>
                    <Icon symbol={'heartFill'} />
                  </div>
                </div>
              </div>

              <div className={styles.description}>
                <p>{product.description}</p>
                <span>Product code: {product.product_code}</span>
              </div>

              <div className={styles.informationContainer}>
                <Accordion type="plus" customStyle={styles} title="composition & care">
                  <p className={styles.information}>{product.description}</p>
                </Accordion>
                <Accordion type="plus" customStyle={styles} title="delivery & returns">
                  <p className={styles.information}>Free delivery and easy returns within 7 days.</p>
                </Accordion>
                <Accordion type="plus" customStyle={styles} title="help">
                  <p className={styles.information}>Need help? Contact us via support@swagyo.in</p>
                </Accordion>
              </div>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className={styles.suggestionContainer}>
              <h2>You may also like</h2>
              <ProductCardGrid spacing showSlider height={400} columns={4} data={suggestions} />
            </div>
          )}
        </Container>

        <div className={styles.attributeContainer}>
          <Split
            image="/cloth.png"
            alt="attribute description"
            title="Sustainability"
            description="We design our products to look good and to be used on a daily basis. Our aim is to inspire people to live with few timeless objects made to last."
            ctaText="learn more"
            cta={() => navigate('/blog')}
            bgColor="var(--standard-light-grey)"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
