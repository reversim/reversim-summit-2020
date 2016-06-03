import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import classNames from 'classnames/bind';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

import styles from 'css/main';

const cx = classNames.bind(styles);

const BaseLayout = ({name, currentPath, children}) => {
  return (
    <StickyContainer>
      <div className={cx(name)}>
          <Sticky style={{zIndex: 5}}>
              <Navigation currentPath={currentPath} />
          </Sticky>

          {children}

          <Footer />
      </div>
    </StickyContainer>
  );
};

export default BaseLayout;
