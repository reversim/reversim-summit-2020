import React from 'react';
import {TAG_COLORS} from '../data/proposals';

const Tag = name =>
  name.toLowerCase() in TAG_COLORS ? (
    <div key={name} className={`font-size-sm mr-3 text-${TAG_COLORS[name.toLowerCase()]}`}>
      [{name}]
    </div>
  ) : (
    undefined
  );

export default Tag;
