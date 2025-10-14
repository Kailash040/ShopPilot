import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  external = false,
  ...props
}) => {
  const baseClasses = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded';
  
  const variantClasses = {
    primary: 'text-primary-500 hover:text-primary-600',
    secondary: 'text-gray-600 hover:text-gray-800',
    muted: 'text-gray-500 hover:text-gray-700'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // External link
  if (external || href) {
    return (
      <a
        href={href || to}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link
  return (
    <RouterLink
      to={to}
      className={combinedClasses}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
