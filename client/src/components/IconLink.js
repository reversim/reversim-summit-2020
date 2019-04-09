import React from 'react';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const IconLink = ({href, icon, className, isLarge: _isLarge}) => (
  <a
    className={cn('text-purple2', className)}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
    <FontAwesomeIcon icon={icon} />
  </a>
);

export default IconLink;
