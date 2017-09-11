import React from 'react';
import s from './Avatar.css';
import {Link} from "react-router-dom";
import { logout } from '../data-service';

const Avatar = ({ id, name, picture, sessions, onLogout }) => (
  <div className={s.avatarImg} style={{ backgroundImage: `url('${picture}')`}}>
    <ul className={s.menu}>
      <div className={s.menuInner}>
        { sessions.length > 0 && <Link className={s.menuItem} to={`/speaker/${id}`}>My Profile</Link> }
        <div className={s.menuItem} onClick={() => logout().then(onLogout)}>Logout</div>
      </div>
    </ul>
  </div>
);

export default Avatar;