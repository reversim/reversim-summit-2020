import React from 'react';

const colors = {
  craft: 'purple',
  frontend: 'teal',
  'ai/ml': 'indigo',
  product: 'red',
  culture: 'orange',
  security: 'yellow',
  infrastructure: 'green',
  quality: 'lightgreen',
  programming: 'blue',
  'open source': 'pink',
};

const Tag = name => (
  <div
    key={name}
    className={`font-weight-heavy font-size-sm mr-3 text-${colors[name.toLowerCase()]}`}>
    [{name}]
  </div>
);

export default Tag;
