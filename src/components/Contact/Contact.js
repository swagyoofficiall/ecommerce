import React, { useState } from 'react';
import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import * as styles from './Contact.module.css';

const Contact = () => {
  const initialState = {
    name: '',
    phone: '',
    email: '',
    comment: '',
  };

  const [contactForm, setContactForm] = useState(initialState);

  const handleChange = (id, e) => {
    const tempForm = { ...contactForm, [id]: e };
    setContactForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactForm(initialState);
  };

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>Send Us A Message</h4>
        <p>
          Our Customer Service team are here for all enquiries Monday to Friday,
          10am - 5pm AEDT (india inr Time).
        </p>
        <p>We look forward to hearing from you.</p>
      </div>

      <div className={styles.section}>
        <h4>Phone</h4>
        <p>+1 3156235096</p>
        <p>Monday to Friday - 10am - 5pm AEDT</p>
      </div>

      <div className={styles.section}>
        <h4>Email</h4>
        <p>
          You can email our Customer Service team at shopsupport@swagyo.com
          or via the contact form below:
        </p>
      </div>

      <div className={styles.contactContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.contactForm}>
            <FormInputField
              id="name"
              value={contactForm.name}
              handleChange={handleChange}
              type="text"
              labelName="Full Name"
              required
            />
            <FormInputField
              id="phone"
              value={contactForm.phone}
              handleChange={handleChange}
              type="number"
              labelName="Phone Number"
              required
            />
            <FormInputField
              id="email"
              value={contactForm.email}
              handleChange={handleChange}
              type="email"
              labelName="Email"
              required
            />
            <div className={styles.commentInput}>
              <FormInputField
                id="comment"
                value={contactForm.comment}
                handleChange={handleChange}
                type="textarea"
                labelName="Comments / Questions"
                required
              />
            </div>
          </div>
          <Button
            className={styles.customButton}
            level="primary"
            type="submit"
          >
            submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
