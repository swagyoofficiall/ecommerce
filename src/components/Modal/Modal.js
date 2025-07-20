import React, { useEffect, useCallback } from 'react';
import * as styles from './Modal.module.css';

const Modal = ({ children, visible, close }) => {
  // 🛠️ Fix: useCallback for stable event listener
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className={`${styles.root} ${
        visible ? styles.show : styles.hide
      }`}
    >
      <div className={styles.contentContainer}>{children}</div>
      <div
        role="presentation"
        onClick={close}
        className={styles.backdrop}
      />
    </div>
  );
};

export default Modal;
