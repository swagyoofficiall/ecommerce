import { Link } from 'gatsby';
import React, { useState } from 'react';

import Accordion from '../Accordion';
import Container from '../Container';
import Dropdown from '../Dropdown/Dropdown';
import FormInputField from '../FormInputField/FormInputField';
import Icon from '../Icons/Icon';
import Button from '../Button';
import Config from '../../config.json';
import * as styles from './Footer.module.css';

// Fallbacks to prevent SSR crash
const safeFooterLinks = Config.footerLinks || [];
const safeCurrencyList = Config.currencyList || [];
const safeLanguageList = Config.languageList || [];
const safePaymentOptions = Config.paymentOptions || {};
const safeSocial = Config.social || {};

const Footer = () => {
  const [email, setEmail] = useState('');

  const subscribeHandler = (e) => {
    e.preventDefault();
    setEmail('');
    console.log('Subscribe this email: ', email);
  };

  const handleSocialClick = (platform) => {
    window.open(safeSocial[platform]);
  };

  const renderLinks = (linkCollection) => {
    return (
      <ul className={styles.linkList}>
        {linkCollection.links.map((link, index) => (
          <li key={index}>
            <Link className={`${styles.link} fancy`} to={link.link}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.root}>
      <Container size={'large'} spacing={'min'}>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            {safeFooterLinks.map((linkCollection, indexLink) => (
              <div className={styles.footerLinkContainer} key={indexLink}>
                <div className={styles.footerLinks}>
                  <span className={styles.linkTitle}>
                    {linkCollection.subTitle}
                  </span>
                  {renderLinks(linkCollection)}
                </div>
                <div className={styles.mobileFooterLinks}>
                  <Accordion
                    customStyle={styles}
                    type={'add'}
                    title={linkCollection.subTitle}
                  >
                    {renderLinks(linkCollection)}
                  </Accordion>
                </div>
              </div>
            ))}
            <div className={styles.newsLetter}>
              <div className={styles.newsLetterContent}>
                <span className={styles.linkTitle}>Newsletter</span>
                <p className={styles.promoMessage}>
                  Get 15% off your first purchase! Plus, be the first to know
                  about sales, new product launches and exclusive offers!
                </p>
                <form
                  className={styles.newsLetterForm}
                  onSubmit={subscribeHandler}
                >
                  <FormInputField
                    icon={'arrow'}
                    id={'newsLetterInput'}
                    value={email}
                    placeholder={'Email'}
                    handleChange={(_, e) => setEmail(e)}
                  />
                </form>
                <div className={styles.socialContainer}>
                  {safeSocial.youtube && (
                    <div
                      onClick={() => handleSocialClick('youtube')}
                      role="presentation"
                      className={styles.socialIconContainer}
                    >
                      <Icon symbol={'youtube'} />
                    </div>
                  )}
                  {safeSocial.instagram && (
                    <div
                      onClick={() => handleSocialClick('instagram')}
                      role="presentation"
                      className={styles.socialIconContainer}
                    >
                      <Icon symbol={'instagram'} />
                    </div>
                  )}
                  {safeSocial.facebook && (
                    <div
                      onClick={() => handleSocialClick('facebook')}
                      role="presentation"
                      className={styles.socialIconContainer}
                    >
                      <Icon symbol={'facebook'} />
                    </div>
                  )}
                  {safeSocial.twitter && (
                    <div
                      onClick={() => handleSocialClick('twitter')}
                      role="presentation"
                      className={styles.socialIconContainer}
                    >
                      <Icon symbol={'twitter'} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.contentBottomContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.contentBottom}>
            <div className={styles.settings}>
              <Dropdown label="Country/Region" optionList={safeCurrencyList} />
              <Dropdown label="Language" optionList={safeLanguageList} />
            </div>
            <div className={styles.copyrightContainer}>
              <div className={styles.creditCardContainer}>
                {safePaymentOptions.amex && (
                  <img
                    className={styles.amexSize}
                    src="/amex.png"
                    alt="amex"
                  />
                )}
                {safePaymentOptions.mastercard && (
                  <img
                    className={styles.masterSize}
                    src="/master.png"
                    alt="mastercard"
                  />
                )}
                {safePaymentOptions.visa && (
                  <img
                    className={styles.visaSize}
                    src="/visa.png"
                    alt="visa"
                  />
                )}
              </div>
              <span>
                {new Date().getFullYear()} (c) . Built by{' '}
                <Button target href="https://www.swagyo.com/">
                  KING.
                </Button>{' '}
                Powered by{' '}
                <Button target href="https://www.swagyo.com/">
                  SWAGYO.™
                </Button>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
