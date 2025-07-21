import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import * as styles from './sample.module.css';

import Blog from '../../components/Blog';
import Container from '../../components/Container';
import Layout from '../../components/Layout/Layout';
import { toOptimizedImage } from '../../helpers/general';
import supabase from '../../lib/supabase';

const SamplePage = () => {
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const slug = location.pathname.split('/blog/')[1];

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        navigate('/blog'); // Redirect if not found
        return;
      }

      setBlog(data);
      setLoading(false);
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (loading || !blog) return null;

  return (
    <Layout>
      <div className={styles.root}>
        <Container>
          <div className={styles.blogContainer}>
            <Blog
              category={blog.category}
              title={blog.title}
              image={blog.image_url}
              alt={blog.image_alt || ''}
            >
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {blog.images && (
                <div className={styles.imagesContainer}>
                  {blog.images.map((img, i) => (
                    <div key={i} className={styles.imageContainer}>
                      <img src={toOptimizedImage(img)} alt={`blog-${i}`} />
                    </div>
                  ))}
                </div>
              )}
            </Blog>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default SamplePage;
