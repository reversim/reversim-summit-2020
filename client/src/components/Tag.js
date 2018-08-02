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

const Tag = name =>
  name.toLowerCase() in colors ? (
    <div key={name} className={`font-size-sm mr-3 text-${colors[name.toLowerCase()]}`}>
      [{name}]
    </div>
  ) : (
    undefined
  );

export default Tag;
