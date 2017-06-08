import React from 'react';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

import { cx } from 'css/styles';

const BaseLayout = ({name, currentPath, children}) => {
  return (
      <div className={cx(name, 'base-layout')}>
        <Navigation isHome={currentPath === '/'} />
        {children}
        <Footer />
      </div>
  );
};

export default BaseLayout;
