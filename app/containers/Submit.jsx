import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import styles from 'css/components/home';

const cx = classNames.bind(styles);

const Submit = ({user, dispatch}) => {

    return (
        <div className={cx('home')}>
            Submit
        </div>
    );
};

Submit.propTypes = {
};

function mapStateToProps(state) {
    return {
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Submit);
