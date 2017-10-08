import React from 'react';

const Tag = (name) => (
  <div key={name} className="mr-3">#{name}</div>
);

export default Tag;