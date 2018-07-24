import React from 'react';
import cn from 'classnames';
import {timelineLine} from './Timeline.css';
import timeline from '../data/timeline';

const TimelineItem = ({time, text, description, hasMargin}) => (
  <div className={cn({'mb-10': hasMargin})}>
    <div className="d-flex align-items-center" style={{marginLeft: -60}}>
      <div className="rounded-circle border bg-white" style={{height: 60, width: 60}} />
      <div className="ml-4">
        <h4 className="line-height-17 text-primary">{time}</h4>
        <h4 className="font-weight-bold">{text}</h4>
      </div>
    </div>
    <div className="ml-4 mt-3 text-gray">{description}</div>
  </div>
);

const Timeline = () => (
  <div className={cn('my-9 ml-6 py-3 pl-6 border-left', timelineLine)}>
    {timeline.map((x, i) => (
      <TimelineItem key={x.time} {...x} hasMargin={i < timeline.length - 1} />
    ))}
  </div>
);

export default Timeline;
