import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import Config from '../../config.json';
import Icon from '../Icons/Icon';
import * as styles from './MobileNavigation.module.css';

import { supabase } from '../../lib/supabase';

const MobileNavigation = (props) => {
  const { close } = props;

  const [subMenu, setSubMenu] = useState();
  const [category, setCategory] = useState();
  const [depth, setDepth] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    close();
  };

  const isLoggedIn = !!user;

  return (
    <div className={styles.root}>
      <nav>
        <div className={styles.headerAuth}>
          {depth === 0 && !isLoggedIn && (
            <div className={styles.authLinkContainer}>
              <Link to={'/signup'}>Sign Up</Link>
              <Link to={'/login'}>Login</Link>
            </div>
          )}

          {depth === 0 && isLoggedIn && (
            <div
              className={styles.welcomeContainer}
              role={'presentation'}
              onClick={() => setDepth(-1)}
            >
              <span className={styles.welcomeMessage}>
                Welcome, {user.email}
              </span>
              <Icon symbol={'caret'}></Icon>
            </div>
          )}

          {depth === -1 && isLoggedIn && (
            <div
              className={styles.previousLinkContainer}
              onClick={() => setDepth(0)}
              role={'presentation'}
            >
              <div className={styles.previousIcon}>
                <Icon symbol={'caret'}></Icon>
              </div>
              <span>my account</span>
            </div>
          )}

          {depth === 1 && (
            <div
              className={styles.previousLinkContainer}
              onClick={() => setDepth(0)}
              role={'presentation'}
            >
              <div className={styles.previousIcon}>
                <Icon symbol={'caret'}></Icon>
              </div>
              <span>{category.menuLabel}</span>
            </div>
          )}

          {depth === 2 && (
            <div
              className={styles.previousLinkContainer}
              onClick={() => setDepth(1)}
              role={'presentation'}
            >
              <div className={styles.previousIcon}>
                <Icon symbol={'caret'}></Icon>
              </div>
              <span>{subMenu.categoryLabel}</span>
            </div>
          )}
        </div>

        <div className={styles.mobileNavContainer}>
          {depth === 0 && (
            <div>
              {Config.headerLinks.map((navObject) => {
                const hasSubmenu =
                  navObject.category?.length !== undefined ? true : false;
                return (
                  <Link
                    key={navObject.menuLink}
                    className={styles.mobileLink}
                    to={hasSubmenu ? '' : navObject.menuLink}
                    onClick={() => {
                      if (hasSubmenu) {
                        setDepth(1);
                        setCategory(navObject);
                      }
                    }}
                  >
                    {navObject.menuLabel}
                    {hasSubmenu && <Icon symbol={'caret'} />}
                  </Link>
                );
              })}
              <div className={styles.navFooter}>
                <Link to={'/favorites'}>
                  <Icon symbol={'heart'} />
                  Favorites (0)
                </Link>
              </div>
            </div>
          )}

          {depth === 1 &&
            category.category.map((menuItem) => (
              <Link
                key={menuItem.categoryLabel}
                to={''}
                onClick={() => {
                  setDepth(2);
                  setSubMenu(menuItem);
                }}
                className={styles.mobileLink}
              >
                {menuItem.categoryLabel}
                <Icon symbol={'caret'} />
              </Link>
            ))}

          {depth === 2 &&
            subMenu.submenu.map((menuItem) => (
              <Link
                key={menuItem.menuLabel}
                to={menuItem.menuLink}
                className={styles.edgeLink}
              >
                {menuItem.menuLabel}
              </Link>
            ))}

          {depth === -1 && (
            <>
              <div>
                <Link to={'/account/orders/'} className={styles.mobileLink}>
                  Orders
                </Link>
                <Link to={'/account/address/'} className={styles.mobileLink}>
                  Addresses
                </Link>
                <Link to={'/account/settings/'} className={styles.mobileLink}>
                  Settings
                </Link>
                <Link to={'/account/viewed/'} className={styles.mobileLink}>
                  Recently Viewed
                </Link>
              </div>
              <div className={styles.navFooter}>
                <div
                  className={styles.logoutContainer}
                  role={'presentation'}
                  onClick={handleLogout}
                >
                  <Icon symbol={'logout'} />
                  <span>Sign out</span>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
