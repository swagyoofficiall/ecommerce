import * as React from 'react';
import { useEffect, useState } from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import { generateMockBlogData } from '../helpers/mock';
import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';
import { toOptimizedImage } from '../helpers/general';

import { supabase } from '../lib/supabase';
import CurrencyFormatter from '../components/CurrencyFormatter'; // ✅
import CurrencySelector from '../components/CurrencyFormatter/CurrencySelector'; // ✅
import { CurrencyProvider } from '../components/CurrencyFormatter/CurrencyContext'; // ✅

const IndexPage = () => {
  const blogData = generateMockBlogData(3);
  const [products, setProducts] = useState([]);

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

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <CurrencyProvider> {/* ✅ Wrap whole page with Currency context */}
      <Layout disablePaddingBottom>
        {/* Hero Section */}
        <Hero
          maxWidth={'500px'}
          image={'/banner1.png'}
          title={'Essentials for a cold winter'}
          subtitle={'Discover Autumn Winter 2021'}
          ctaText={'shop now'}
          ctaAction={goToShop}
        />

        {/* Welcome Message + Currency Selector */}
        <div className={styles.messageContainer}>
          <p>
            Welcome to <span className={styles.gold}>Swagyo</span> — your luxury
            fashion destination.
          </p>
          <p>
            Powered by <span className={styles.gold}>Supabase</span> &{' '}
            <span className={styles.gold}>Netlify</span>
          </p>
          <CurrencySelector /> {/* ✅ currency dropdown */}
        </div>

        {/* Product Collection */}
        <div className={styles.collectionContainer}>
          <Container size={'large'}>
            <Title name={'New Collection'} />
            <ProductCollectionGrid />
          </Container>
        </div>

        {/* New Arrivals from Supabase */}
        <div className={styles.newArrivalsContainer}>
          <Container>
            <Title name={'New Arrivals'} link={'/shop'} textLink={'view all'} />
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
                    <CurrencyFormatter amount={product.price} /> {/* ✅ formatted price */}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Highlight Section */}
        <div className={styles.highlightContainer}>
          <Container size={'large'} fullMobile>
            <Highlight
              image={'/highlight.png'}
              altImage={'highlight image'}
              miniImage={'/highlightmin.png'}
              miniImageAlt={'mini highlight image'}
              title={'Luxury Knitwear'}
              description={`This soft lambswool jumper is knitted in Scotland, using yarn from one of the world's oldest spinners based in Fife.`}
              textLink={'shop now'}
              link={'/shop'}
            />
          </Container>
        </div>

        {/* Promotion */}
        <div className={styles.promotionContainer}>
          <Hero
            image={toOptimizedImage('/banner2.png')}
            title={`-50% off \n All Essentials`}
          />
          <div className={styles.linkContainers}>
            <Link to={'/shop'}>WOMAN</Link>
            <Link to={'/shop'}>MAN</Link>
          </div>
        </div>

        {/* Quote Section */}
        <Quote
          bgColor={'var(--standard-light-grey)'}
          title={'Our Belief'}
          quote={
            '“We believe in two things: the pursuit of quality in everything we do, and looking after one another.”'
          }
        />

        {/* Blogs */}
        <div className={styles.blogsContainer}>
          <Container size={'large'}>
            <Title name={'Journal'} subtitle={'Notes on life and style'} />
            <BlogPreviewGrid data={blogData} />
          </Container>
        </div>

        {/* Sustainability Banner */}
        <div className={styles.sustainableContainer}>
          <Hero
            image={toOptimizedImage('/banner3.png')}
            title={'We are Sustainable'}
            subtitle={
              'From caring for our land to supporting our people, discover the steps we’re taking to do more for the world around us.'
            }
            ctaText={'read more'}
            maxWidth={'660px'}
            ctaStyle={styles.ctaCustomButton}
          />
        </div>

        {/* Social Feed */}
        <div className={styles.socialContainer}>
          <Title
            name={'Styled by You'}
            subtitle={'Tag @swagyo to be featured.'}
          />
          <div className={styles.socialContentGrid}>
            <img src={toOptimizedImage(`/social/socialMedia1.png`)} alt={'social media 1'} />
            <img src={toOptimizedImage(`/social/socialMedia2.png`)} alt={'social media 2'} />
            <img src={toOptimizedImage(`/social/socialMedia3.png`)} alt={'social media 3'} />
            <img src={toOptimizedImage(`/social/socialMedia4.png`)} alt={'social media 4'} />
          </div>
        </div>

        {/* Footer */}
        <AttributeGrid />
      </Layout>
    </CurrencyProvider>
  );
};

export default IndexPage;
