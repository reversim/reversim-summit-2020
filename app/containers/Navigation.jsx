import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({user, dispatch}) => {
    const logout = () => dispatch(logOut());

    return (
        <nav className={cx('navigation')} role="navigation">
            <Link to="/" className={cx('item')} activeClassName={cx('active')}>Home</Link>
            <Link to="/timeline" className={cx('item')} activeClassName={cx('active')}>Timeline</Link>
            <Link to="/submit" className={cx('item')} activeClassName={cx('active')}>Submit</Link>
            <Link to="/sessions" className={cx('item')} activeClassName={cx('active')}>Sessions</Link>
            { user.authenticated ? (
                <Link onClick={logout}
                      className={cx('item')} activeClassName={cx('active')} to="/">Logout</Link>
            ) : (
                <Link className={cx('item')} activeClassName={cx('active')} to="/login">Log in</Link>
            )}
        </nav>
    );
};

Navigation.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Navigation);
