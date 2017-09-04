import React from 'react';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

import { cx } from 'css/styles';

const BaseLayout = ({name, currentPath, background, topBg, children}) => {
  return (
      <div className={cx(name, 'base-layout')} style={{background}}>
        <Navigation isHome={currentPath === '/'} />
        { topBg ? <div className={cx('base-layout-bg-top')} style={{background: topBg}}/> : undefined }
        {children}
        <Footer />
      </div>
  );
};

export default BaseLayout;
