import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRecommendationsFor } from 'actions/proposals';
import _ from 'lodash';

const cx = classNames.bind(styles);

const totalRecommendations = 3;

class Recommender extends Component {
  constructor(props) {
    super(props);
  }

  loadRecommendations(id) {
    const { dispatch } = this.props;

    dispatch(fetchRecommendationsFor(id))
  }

  componentWillReceiveProps(newProps) {
    if (newProps.id !== undefined && newProps.id !== this.props.id) {
      this.loadRecommendations(newProps.id);
    }
  }

  componentWillMount() {
    this.loadRecommendations(this.props.id);
  }

  renderSingleRecommendation(proposal, index) {
    return (
      <div className={cx("row")} key={index} style={{marginBottom: 20}}>
        <div className={cx("col-xs-2", "photo-wrapper")}>
          <Link to={`/session/${proposal.id}`}>
            <img src={proposal.speaker_ids && proposal.speaker_ids[0].picture} alt={proposal.title} className={cx("img-responsive")} style={{borderRadius: 10}} />
          </Link>
        </div>
        <div className={cx("col-xs-10")}>
          <Link to={`/session/${proposal.id}`}>
            <p style={{color: '#000', fontSize: '110%'}}>{proposal.title}</p>
          </Link>
        </div>
      </div>
    )
  }

  render() {
    const { currentProposal: { recommendations } } = this.props;

    if (recommendations && recommendations.length > 0) {
      return (
        <div className={cx("row")}>
          <div className={cx("col-xs-12")}>
            <p className={cx('h7')} style={{marginBottom: 20}}>You might also be interested in</p>
            { _.shuffle(recommendations).map((r, i) => this.renderSingleRecommendation(r, i)) }
          </div>
        </div>
      );
    }

    return <span></span>;
  }
}

Recommender.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentProposal: PropTypes.object,
  id: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        currentProposal: state.proposal.currentProposal
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Recommender);
