import React from 'react';
import s from './Avatar.css';
import {Link} from 'react-router-dom';

const Avatar = ({picture, onLogout}) => (
  <div className={s.avatarImg} style={{backgroundImage: `url('${picture}')`}}>
    <ul className={s.menu}>
      <div className={s.menuInner}>
        <div className={s.menuItem}>
          <Link to="/profile">My Profile</Link>
        </div>
        <div className={s.menuItem}>
          <Link to="/my-votes">My Votes</Link>
        </div>
        <div className={s.menuItem} onClick={onLogout}>
          <a href="#">Logout</a>
        </div>
      </div>
    </ul>
  </div>
);

export default Avatar;
