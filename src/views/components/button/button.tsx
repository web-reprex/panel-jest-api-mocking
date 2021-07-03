import React from 'react';
import './button.css';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const defaultClass = primary ? 'cmpButtonPrimary' : 'cmpButtonSecondary';
  const classNames = ['cmpButton', defaultClass, `cmpButton-${size}`].join(' ');
  const styles = { backgroundColor };

  return (
    <button type="button" className={classNames} style={styles} {...props}>
      {label ?? props.children}
    </button>
  );
};
