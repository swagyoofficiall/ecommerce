import { Link } from 'gatsby';
import React from 'react';

import * as styles from './ExpandedMenu.module.css';
import { toOptimizedImage } from '../../helpers/general';

const ExpandedMenu = ({ menu }) => {
  if (!Array.isArray(menu) || menu.length === 0) return null;

  return (
    <div className={styles.root}>
      <div className={styles.linkContainers}>
        {menu.map((item, index) => {
          if (!item || !item.submenu) return null;

          return (
            <div key={index} className={styles.categoryContainer}>
              <span className={styles.categoryName}>{item.categoryLabel}</span>
              <ul>
                {item.submenu.map((link, linkIndex) => {
                  return (
                    <li key={linkIndex}>
                      <Link className={styles.menuLink} to={link.menuLink}>
                        {link.menuLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={styles.imageContainer}>
        <img src={toOptimizedImage('/headerPic1.png')} alt="header 1" />
        <img src={toOptimizedImage('/headerPic2.png')} alt="header 2" />
      </div>
    </div>
  );
};

export default ExpandedMenu;
