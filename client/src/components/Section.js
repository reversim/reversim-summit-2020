import React, { Component } from 'react';

const Section = ({title, isFullWidth, children}) => {
  const containerClass = isFullWidth ? 'container-fluid' : 'container';
  return (
    <section>
      <div>{title}</div>
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
};

export default Section;