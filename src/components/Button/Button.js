import React from 'react';
import { Link } from 'gatsby';

import * as styles from './Button.module.css';

const Button = ({
  children,
  href,
  target,
  level,
  type = 'button',
  size,
  disabled,
  onClick,
  className,
  flat,
  link,
  fullWidth,
  theme,
}) => {
  const classes = [styles.button];

  if (level && styles[level]) classes.push(styles[level]);
  if (size && styles[size]) classes.push(styles[size]);
  if (theme && styles[theme]) classes.push(styles[theme]);
  if (disabled) classes.push(styles.disabled);
  if (flat) classes.push(styles.flat);
  if (link) classes.push(styles.link);
  if (fullWidth) classes.push(styles.fullWidth);
  if (className) classes.push(className);

  const classOutput = classes.join(' ');

  if (href) {
    return target ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classOutput}
        onClick={onClick}
      >
        {children}
      </a>
    ) : (
      <Link to={href} className={classOutput} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classOutput}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
