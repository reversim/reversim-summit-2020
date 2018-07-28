import React from 'react';
import cn from 'classnames';

const IconLink = ({href, icon, className, isLarge}) => (
  <a
    className={cn(className, 'text-cyan', {'font-size-lg': isLarge})}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
    <i className={`fa fa-${icon}`} />
  </a>
);

export default IconLink;
