import React from 'react';
import {Link} from 'react-router-dom';

const LinkDuo = (props) => props.external
  ? <a href={props.to} {...props}>{props.children}</a>
  : <Link {...props}>{props.children}</Link>

export default LinkDuo
