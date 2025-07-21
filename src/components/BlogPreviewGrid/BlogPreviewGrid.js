import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import BlogPreviewGrid from '../../components/BlogPreviewGrid';
import Container from '../../components/Container';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout/Layout';
import ThemeLink from '../../components/ThemeLink';

import * as styles from './index.module.css';
import { toOptimizedImage } from '../../helpers/general';
import { supabase } from '../../lib/supabase'; // ✅ Your Supabase client

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching blogs:', error);
      else setBlogs(data);

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Hero
          maxWidth={'400px'}
          image={toOptimizedImage('/blogCover.png')}
          title={`The new standard of Closing`}
          ctaLink={'read story'}
          ctaTo={'/blog/sample'}
          header={'design'}
        />

        <div className={styles.navContainer}>
          {['All Posts', 'Design', 'Collaboration', 'Interview', 'News'].map((item) => (
            <ThemeLink
              key={item}
              onClick={() => navigate('/blog/sample')}
              to={'/blog/sample'}
            >
              {item}
            </ThemeLink>
          ))}
        </div>

        <div className={styles.blogsContainer}>
          <Container size={'large'}>
            {loading ? (
              <p>Loading blogs...</p>
            ) : (
              <BlogPreviewGrid data={blogs} hideReadMoreOnWeb showExcerpt />
            )}
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
