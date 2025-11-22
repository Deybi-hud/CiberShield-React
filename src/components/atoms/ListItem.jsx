import React from 'react';
const ListItem = ({ children, className = '', ...props }) => {
  return (
    <li className={`atom-list-item ${className}`} {...props}>
      {children}
    </li>
  );
};

export default ListItem;