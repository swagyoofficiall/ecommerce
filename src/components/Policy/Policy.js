import React from 'react';
import * as styles from './Policy.module.css';

const Policy = () => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h3>1. Privacy Policy</h3>
        <p>
          Swagyo ("we", "our", or "us") values your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.
        </p>
        <p>
          We collect information you voluntarily provide during account creation, checkout, or while contacting us. This includes your name, email address, shipping details, and purchase history.
        </p>
        <p>
          By using our site, you agree to the practices outlined in this Privacy Policy and our Terms of Service.
        </p>
      </div>

      <div className={styles.section}>
        <h3>2. Children’s Privacy</h3>
        <p>
          Our services are not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that we have inadvertently gathered such data, we will take steps to delete it.
        </p>
        <p>
          If you are under 18, you may only use Swagyo under the supervision of a parent or guardian. By using our services, you confirm that you are at least 18 years old or have parental permission.
        </p>
      </div>

      <div className={styles.section}>
        <h3>3. Acceptable Use</h3>
        <p>
          You agree to use Swagyo responsibly and lawfully. You must not:
        </p>
        <p>(a) Disrupt or interfere with the security of the site or services.</p>
        <p>(b) Use the site for fraudulent, illegal, or harmful purposes.</p>
        <p>(c) Impersonate any individual or entity, or misrepresent your identity.</p>
        <p>(d) Infringe upon intellectual property rights or confidential information.</p>
        <p>(e) Copy, reproduce, or reuse site content without permission.</p>
        <p>(f) Send unauthorized promotions, spam, or unsolicited messages.</p>
        <p>(g) Attempt to bypass any website security features or protections.</p>
      </div>
    </div>
  );
};

export default Policy;
