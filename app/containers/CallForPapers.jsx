import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import styles from 'css/components/home';

const cx = classNames.bind(styles);

class CallForPapers extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={cx('home')}>
                This is the call for papers
            </div>
        );
    }
}

CallForPapers.propTypes = {
};

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(CallForPapers);
