import React from 'react';
import cn from 'classnames';

const IconLink = ({href, icon, className, isLarge: _isLarge, children}) => (
  <a
    className={cn(className, 'text-purple2')}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
    <i className={`fa fa-${icon}`}>{children}</i>
  </a>
);

export default IconLink;
