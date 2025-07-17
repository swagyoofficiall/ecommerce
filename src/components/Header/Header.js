import React, { useState, useEffect, createRef } from 'react';
import { Link, navigate } from 'gatsby';

import { isAuth } from '../../helpers/general';

import AddNotification from '../AddNotification';
import Brand from '../Brand';
import Container from '../Container';
import Config from '../../config.json';
import Drawer from '../Drawer';
import ExpandedMenu from '../ExpandedMenu';
import FormInputField from '../FormInputField/FormInputField';
import Icon from '../Icons/Icon';
import MiniCart from '../MiniCart';
import MobileNavigation from '../MobileNavigation';
import * as styles from './Header.module.css';
import CurrencySelector from '../CurrencyFormatter/CurrencySelector'; // ✅ Added CurrencySelector import

const Header = (prop) => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const [menu, setMenu] = useState();
  const [activeMenu, setActiveMenu] = useState();

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const searchRef = createRef();
  const bannerMessage = 'Free shipping worldwide';
  const searchSuggestions = [
    'Oversize sweaters',
    'Lama Pajamas',
    'Candles Cinnamon',
  ];

  const handleHover = (navObject) => {
    if (navObject.category) {
      setShowMenu(true);
      setMenu(navObject.category);
      setShowSearch(false);
    } else {
      setMenu(undefined);
    }
    setActiveMenu(navObject.menuLabel);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setShowSearch(false);
  };

  useEffect(() => {
    if (showMenu === false) setActiveMenu(false);
  }, [showMenu]);

  useEffect(() => {
    const onScroll = () => {
      setShowMenu(false);
      setShowSearch(false);
      setActiveMenu(undefined);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (showSearch === true) {
      setTimeout(() => {
        searchRef.current.focus();
      }, 250);
    }
  }, [showSearch]);

  return (
    <div className={styles.root}>
      <div className={styles.headerMessageContainer}>
        <span>{bannerMessage}</span>
      </div>
      <Container size={'large'} spacing={'min'}>
        <div className={styles.header}>
          <div className={styles.linkContainer}>
            <nav
              role={'presentation'}
              onMouseLeave={() => {
                setShowMenu(false);
              }}
            >
              {Config.headerLinks.map((navObject) => (
                <Link
                  key={navObject.menuLink}
                  onMouseEnter={() => handleHover(navObject)}
                  className={`${styles.navLink} ${
                    activeMenu === navObject.menuLabel ? styles.activeLink : ''
                  }`}
                  to={navObject.menuLink}
                >
                  {navObject.menuLabel}
                </Link>
              ))}
            </nav>
          </div>
          <div
            role={'presentation'}
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
            className={styles.burgerIcon}
          >
            <Icon symbol={`${mobileMenu === true ? 'cross' : 'burger'}`}></Icon>
          </div>
          <Brand />

          {/* ✅ Currency Selector */}
          <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
            <CurrencySelector />
          </div>

          <div className={styles.actionContainers}>
            <button
              aria-label="Search"
              className={`${styles.iconButton} ${styles.iconContainer}`}
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <Icon symbol={'search'}></Icon>
            </button>
            <Link
              aria-label="Favorites"
              href="/account/favorites"
              className={`${styles.iconContainer} ${styles.hideOnMobile}`}
            >
              <Icon symbol={'heart'}></Icon>
            </Link>
            <Link
              aria-label="Orders"
              href={isAuth() ? '/login' : '/account/orders/'}
              className={`${styles.iconContainer} ${styles.hideOnMobile}`}
            >
              <Icon symbol={'user'}></Icon>
            </Link>
            <button
              aria-label="Cart"
              className={`${styles.iconButton} ${styles.iconContainer} ${styles.bagIconContainer}`}
              onClick={() => {
                setShowMiniCart(true);
                setMobileMenu(false);
              }}
            >
              <Icon symbol={'bag'}></Icon>
              <div className={styles.bagNotification}>
                <span>1</span>
              </div>
            </button>
            <div className={styles.notificationContainer}>
              <AddNotification openCart={() => setShowMiniCart(true)} />
            </div>
          </div>
        </div>

        <div
          className={`${styles.searchContainer} ${
            showSearch === true ? styles.show : styles.hide
          }`}
        >
          <h4>What are you looking for?</h4>
          <form className={styles.searchForm} onSubmit={(e) => handleSearch(e)}>
            <FormInputField
              ref={searchRef}
              icon={'arrow'}
              id={'searchInput'}
              value={search}
              placeholder={''}
              type={'text'}
              handleChange={(_, e) => setSearch(e)}
            />
          </form>
          <div className={styles.suggestionContianer}>
            {searchSuggestions.map((suggestion, index) => (
              <p
                role={'presentation'}
                onClick={() => {
                  setShowSearch(false);
                  navigate(`/search?q=${suggestion}`);
                }}
                key={index}
                className={styles.suggestion}
              >
                {suggestion}
              </p>
            ))}
          </div>
          <div
            role={'presentation'}
            onClick={(e) => {
              e.stopPropagation();
              setShowSearch(false);
            }}
            className={styles.backdrop}
          ></div>
        </div>
      </Container>

      <div
        role={'presentation'}
        onMouseLeave={() => setShowMenu(false)}
        onMouseEnter={() => setShowMenu(true)}
        className={`${styles.menuContainer} ${
          showMenu === true ? styles.show : ''
        }`}
      >
        <Container size={'large'} spacing={'min'}>
          <ExpandedMenu menu={menu} />
        </Container>
      </div>

      <Drawer visible={showMiniCart} close={() => setShowMiniCart(false)}>
        <MiniCart />
      </Drawer>

      <div className={styles.mobileMenuContainer}>
        <Drawer
          hideCross
          top={'98px'}
          isReverse
          visible={mobileMenu}
          close={() => setMobileMenu(false)}
        >
          <MobileNavigation close={() => setMobileMenu(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
