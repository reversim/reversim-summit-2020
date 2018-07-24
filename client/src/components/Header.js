import React from 'react';
import cn from 'classnames';
import s from './Header.css';

const Header = ({title}) => (
  <h3 className={cn(s.sectionHeader, 'mb-10 text-center font-weight-bold')} data-text={title}>
    {title}
  </h3>
);

export default Header;
