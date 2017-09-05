import React, {Component} from 'react';
import cn from 'classnames';
import s from './Hero.css';
import heroImg from '../images/hero-min.png';


class Hero extends Component {

  render() {
    const {} = this.props;
    return (
      <div className="hero">
        <img className={s.heroImg} src={heroImg} alt="Reversim Summit 2017"/>
      </div>
    );
  }

}

export default Hero;