import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import styles from 'css/components/home';

const cx = classNames.bind(styles);

//class Home extends Component {
//
//    constructor(props) {
//        super(props);
//    }
//
//
//    render() {
//        return (
//            <div className={cx('home')}>
//                This is the home of the site {this.props.user.email}
//            </div>
//        );
//    }
//}

const Home = ({user, dispatch}) => {

    return (
        <div className={cx('home')}>
            { user.authenticated ? (

                <div>
                    <span>Hello {user.name}</span>
                    <img src={user.picture}></img>
                </div>
            ) : (
                <span>not auth</span>
            )}
        </div>
    );
};

Home.propTypes = {
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Home);
