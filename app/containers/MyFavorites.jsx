import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import { fetchProposals } from 'actions/proposals';
import features from 'features';
import ProposalPreview from 'components/ProposalPreview';
import styles from 'css/main';
import _ from 'lodash';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const cx = classNames.bind(styles);

class MyFavorites extends Component {

    static need = [  // eslint-disable-line
        fetchProposals
    ];

    constructor(props) {
        super(props);
    }

    MyFavorites() {
      const { proposals } = this.props;

      return proposals.filter(p => p.attended === true)
    }

    render() {
      const { user, location: { pathname } } = this.props;
      const favorites = this.MyFavorites();

      const renderedFavorites = favorites && favorites.map((proposal, i) => {
        return (
            <ProposalPreview  proposal={proposal}
                              user={user}
                              key={i}
                              location={pathname} />
        );
      })

      const emptyState =
        <div className={'text-center'} style={{textAlign: 'center'}}>
          <span className={cx('fa', features('voting', false) ? 'fa-user-plus' : 'fa-user-times')} style={{marginBottom: 30, fontSize: 72}}></span>
        <h4 style={{margin: '30px 0 50px 0'}}>{ features('voting', false) ? 'You haven\'t marked your favorite sessions yet' : 'You cannot update your favorites now. stay tuned!' }</h4>
        { features('voting', false) ? <Link to='/proposals' className={cx('btn', 'btn-lg')}>Start Reviewing!</Link> : undefined }
        </div>

      return (
          <BaseLayout currentPath={pathname} name="all-proposals">

            <section className={cx('section', 'overlay', 'header-bg', 'bg-my-proposals', 'light-text', 'align-center')}>
              <div className={cx("container")}>
                <h1>My Favorite Sessions</h1>
              </div>
            </section>

            <section id="my-favorites" className={cx('section', 'container')}>
              { favorites && favorites.length > 0 ? (
                <div className={cx("col-md-11", "col-md-offset-1")}>
                  { renderedFavorites }
                </div>
              ) : emptyState }
            </section>
        </BaseLayout>
      );
  }
}

MyFavorites.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  proposals: PropTypes.any
};

MyFavorites.defaultProps = { };

function mapStateToProps(state) {
    return {
        user: state.user,
        proposals: state.proposal.proposals
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(MyFavorites);
