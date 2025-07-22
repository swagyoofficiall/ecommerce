import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import BlogPreviewGrid from '../../components/BlogPreviewGrid';
import Container from '../../components/Container';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout/Layout';
import ThemeLink from '../../components/ThemeLink';

import { toOptimizedImage } from '../../helpers/general';
import { supabase } from '../../lib/supabase'; // ✅ your real Supabase client
import * as styles from './index.module.css';

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs') // 🔁 your table name
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
      } else {
        setBlogData(data || []);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Hero
          maxWidth="400px"
          image={toOptimizedImage('/blogCover.png')}
          title="The new standard of Closing"
          ctaLink="read story"
          ctaTo="/blog/sample"
          header="design"
        />

        <div className={styles.navContainer}>
          <ThemeLink to="/blog/sample">All Posts</ThemeLink>
          <ThemeLink to="/blog/sample">Design</ThemeLink>
          <ThemeLink to="/blog/sample">Collaboration</ThemeLink>
          <ThemeLink to="/blog/sample">Interview</ThemeLink>
          <ThemeLink to="/blog/sample">News</ThemeLink>
        </div>

        {/* Blog Grid */}
        <div className={styles.blogsContainer}>
          <Container size="large">
            <BlogPreviewGrid data={blogData} hideReadMoreOnWeb showExcerpt />
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
