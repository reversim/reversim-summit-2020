import React, { Component } from 'react';
import cn from 'classnames';
import s from './Header.css';

class Header extends Component {

    render() {
        const { title } = this.props;
        console.log('title', title);
        return (
            <h3 className={cn(s.sectionHeader, "mb-4")} data-text={title}>{title}</h3>
        );
    }

}

export default Header;