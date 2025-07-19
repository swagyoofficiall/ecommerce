import React from 'react';
import { Link, navigate } from 'gatsby';
import * as styles from './BlogPreview.module.css';
import { toOptimizedImage } from '../../helpers/general';

const BlogPreview = (props) => {
  const {
    image,
    altImage,
    title,
    link,
    category,
    showExcerpt,
    excerpt,
  } = props;

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      className={styles.root}
      onClick={handleClick}
      role="presentation"
    >
      <img
        className={styles.blogPreviewImage}
        src={toOptimizedImage(image)}
        alt={altImage}
      />
      <span className={styles.category}>{category}</span>
      <h4 className={styles.title}>
        <Link to={link}>{title}</Link>
      </h4>
      {showExcerpt && <p className={styles.excerpt}>{excerpt}</p>}
    </div>
  );
};

export default BlogPreview;
