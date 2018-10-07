import React from 'react';
import cn from 'classnames';
import {hero, heroInner, title, subtitle, headphones, left, separator, h2} from './Hero.css';
import {Button} from 'reactstrap';
import {REVERSIM_SUMMIT} from '../utils';
import {Link} from 'react-router-dom';

const Hero = () => (
  <section className={cn(hero, 'd-flex justify-content-center align-items-center')}>
    <div className={cn(heroInner, 'd-flex align-items-center text-center text-md-left')}>
      <div className={cn(left, 'text-white')}>
        <div className="px-2">
          <h1 className={cn('mb-6 text-uppercase line-height-1', title)}>{REVERSIM_SUMMIT}</h1>
          <h2 className={cn(h2, 'mb-6')}>Welcome and have fun today!</h2>
        </div>
        <div className={cn(separator, 'border border-cyan mb-6 mx-auto mx-md-0')} />
        <div className="d-flex justify-content-center justify-content-md-start mb-6">
          {/* <a
            href="https://www.eventbrite.com/e/reversim-summit-2018-tickets-48220530906"
            target="_blank"
            rel="noopener noreferrer">
            <Button className="mr-4">Get tickets</Button>
          </a> */}
          <Link to="/schedule">
            <Button>View Schedule</Button>
          </Link>
        </div>
        <div className={cn(subtitle, 'mb-8')}>8 - 9 October | Tel Aviv University</div>
      </div>
      <div className={headphones} />
    </div>
  </section>
);

export default Hero;
