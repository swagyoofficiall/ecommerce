import React from 'react';
import { Link } from 'gatsby';

import * as styles from './BreadCrumbs.module.css';
import Icon from '../Icons/Icon';

const Breadcrumbs = ({ crumbs }) => {
  let crumbsOutput = crumbs;

  if (crumbsOutput && typeof crumbsOutput !== 'object') {
    if (crumbsOutput.indexOf('>') > -1) {
      crumbsOutput = crumbsOutput.split('>');
    } else {
      crumbsOutput = [crumbsOutput];
    }
  }

  return (
    <div data-breadcrumbs className={styles.breadcrumbs}>
      {crumbsOutput &&
        crumbsOutput.map((crumb, crumbIndex) => (
          <span key={crumbIndex}>
            {crumbIndex > 0 && (
              <span className={styles.spacer}>
                <Icon symbol={'caret'} />
              </span>
            )}
            {typeof crumb === 'object' && 'link' in crumb ? (
              <Link className={styles.crumb} to={crumb.link}>
                {crumb.label.trim()}
              </Link>
            ) : typeof crumb === 'object' ? (
              <span className={styles.crumb}>{crumb.label.trim()}</span>
            ) : (
              <span className={styles.crumb}>{crumb.trim()}</span>
            )}
          </span>
        ))}
    </div>
  );
};

export default Breadcrumbs;
