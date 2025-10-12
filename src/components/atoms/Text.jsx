import React from 'react';

const Text = ({ children, variant = 'p', className = '', ...props }) => {
  const Tag = variant;
  return <Tag className={className} href={props.href} {...props}>{children}</Tag>;
};

export default Text;
