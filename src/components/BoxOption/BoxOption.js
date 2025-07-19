import React from 'react';
import * as styles from './BoxOption.module.css';

const BoxOption = ({ data, setActive, isActive }) => {
  return (
    <div
      className={`${styles.root} ${isActive ? styles.isActive : ''}`}
      onClick={() => setActive(data)}
      role="presentation"
    >
      <span className={styles.option}>{data}</span>
    </div>
  );
};

export default BoxOption;
