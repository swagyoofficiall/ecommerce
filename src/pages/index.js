import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import * as styles from './index.module.css';
import { toOptimizedImage } from '../helpers/general';
import { supabase } from '../lib/supabase';

const IndexPage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToShop = () => {
    navigate('/shop');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Supabase fetch error:', error);
      } else {
        const formatted = data.map((item) => ({
          image: item.image_url,
          name: item.title,
          price: item.price,
          originalPrice: item.original_price || null,
          meta: item.category || '',
          alt: item.title,
          link: `/product/${item.slug || item.id}`,
        }));

        setNewArrivals(formatted);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <Layout disablePaddingBottom>
      {/* Hero */}
      <Hero
        maxWidth={'500px'}
        image={'/banner1.png'}
        title={'Essentials for a cold winter'}
        subtitle={'Discover Autumn Winter 2021'}
        ctaText={'shop now'}
        ctaAction={goToShop}
      />

      {/* Message */}
      <div className={styles.messageContainer}>
        <p>
          This is a demonstration of the Sydney theme for verse by{' '}
          <span className={styles.gold}>matter design.</span>
        </p>
        <p>
          wear by <span className={styles.gold}>sunspel</span> and{' '}
          <span className={styles.gold}>scotch&soda</span>
        </p>
      </div>

      {/* Collection */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'New Collection'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'New Arrivals'} link={'/shop'} textLink={'view all'} />
          {!loading && (
            <ProductCardGrid
              spacing={true}
              showSlider
              height={480}
              columns={3}
              data={newArrivals}
            />
          )}
        </Container>
      </div>

      {/* Highlight */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={'/highlight.png'}
            altImage={'highlight image'}
            miniImage={'/highlightmin.png'}
            miniImageAlt={'mini highlight image'}
            title={'Luxury Knitwear'}
            description={`This soft lambswool jumper is knitted in Scotland, using yarn from one of the world's oldest spinners based in Fife`}
            textLink={'shop now'}
            link={'/shop'}
          />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero image={toOptimizedImage('/banner2.png')} title={`-50% off \n All Essentials`} />
        <div className={styles.linkContainers}>
          <Link to={'/shop'}>WOMAN</Link>
          <Link to={'/shop'}>MAN</Link>
        </div>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'about Sydney'}
        quote={
          '“We believe in two things: the pursuit of quality in everything we do, and looking after one another. Everything else should take care of itself.”'
        }
      />

      {/* Blog Section (you can replace with Supabase blogs later) */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Journal'} subtitle={'Notes on life and style'} />
          <BlogPreviewGrid data={[]} />
        </Container>
      </div>

      {/* Sustainability Promo */}
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

      {/* Social Grid */}
      <div className={styles.socialContainer}>
        <Title
          name={'Styled by You'}
          subtitle={'Tag @sydney to be featured.'}
        />
        <div className={styles.socialContentGrid}>
          <img src={toOptimizedImage(`/social/socialMedia1.png`)} alt={'social media 1'} />
          <img src={toOptimizedImage(`/social/socialMedia2.png`)} alt={'social media 2'} />
          <img src={toOptimizedImage(`/social/socialMedia3.png`)} alt={'social media 3'} />
          <img src={toOptimizedImage(`/social/socialMedia4.png`)} alt={'social media 4'} />
        </div>
      </div>

      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;
