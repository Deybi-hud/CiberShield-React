import React from 'react';

const List = ({ children, as = 'ul', className = '', ...props }) => {
  const Tag = as;
  return (
    <Tag className={`atom-list ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default List;