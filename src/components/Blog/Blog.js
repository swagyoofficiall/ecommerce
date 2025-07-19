import React from 'react';
import { navigate } from 'gatsby';

import Button from '../Button';
import Icon from '../Icons/Icon';
import * as styles from './Blog.module.css';
import { toOptimizedImage } from '../../helpers/general';

const Blog = ({ title, category, image, alt, children }) => {
  return (
    <div className={styles.root}>
      <span className={styles.category}>{category}</span>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.imageContainer}>
        <img src={toOptimizedImage(image)} alt={alt} />
      </div>
      <div>{children}</div>
      <div className={styles.footerContainer}>
        <span>Share with:</span>
        <div className={styles.socialMediaListContainer}>
          {['twitterinverse', 'facebookinverse', 'pinterestinverse'].map((icon) => (
            <div key={icon} className={styles.socialMediaIconContainer}>
              <Icon symbol={icon} />
            </div>
          ))}
        </div>
        <Button onClick={() => navigate('/blog')} level="secondary">
          back to blog
        </Button>
      </div>
    </div>
  );
};

export default Blog;
