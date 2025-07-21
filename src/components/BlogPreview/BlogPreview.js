import React from 'react';
import { Link } from 'gatsby';
import * as styles from './BlogPreview.module.css';
import { toOptimizedImage } from '../../helpers/general';

const BlogPreview = ({
  image,
  title,
  slug,
  category,
  showExcerpt,
  excerpt,
}) => {
  return (
    <div className={styles.root} role="presentation">
      {image && (
        <img
          className={styles.blogPreviewImage}
          src={toOptimizedImage(image)}
          alt={title}
        />
      )}

      {category && <span className={styles.category}>{category}</span>}

      <h4 className={styles.title}>
        <Link to={`/blog/${slug}`}>{title}</Link>
      </h4>

      {showExcerpt && excerpt && (
        <p className={styles.excerpt}>{excerpt}</p>
      )}
    </div>
  );
};

export default BlogPreview;
