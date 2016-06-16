import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/main';
import removeMd from 'remove-markdown';

const cx = classNames.bind(styles);

class Proposal extends Component {
  constructor(props) {
    super(props);
  }

  jumpToProposalPage() {
    const { dispatch, id } = this.props;

    dispatch(push(`session/${id}`));
  }

  render() {
    const { id, name, abstract, type, speakerName, speakerOneLiner, speakerEmail, speakerPhoto, isReversimTeamMember } = this.props;

    let sessionType;
    if (type === 'ossil') {
      sessionType = "Open Source in Israel";
    } else if (type === 'lightning') {
      sessionType = "Lightning";
    } else {
      sessionType = "Full Featured";
    }

    let abstractText = removeMd(abstract);

    let emailVisibility = isReversimTeamMember ? 'shown' : 'hidden';

    return (
      <div className={cx("col-sm-6")}>
        <div className={cx("proposal")}>
          <h6>{name}</h6>
          <article className={cx("text-box")}>
            <div className={cx("session-info-link")} onClick={this.jumpToProposalPage.bind(this)}>
              { abstractText.length > 200 ? abstractText.substr(0, 200) + '...' : abstractText }
            </div>
            <div className={cx("session-type")}><small className={cx("text-alt")}><span className={cx("highlight")}>{sessionType}</span></small></div>
          </article>
          <div className={cx("author-block")}>
            <div className={cx("photo-container")} style={ {backgroundImage: `url(${speakerPhoto})` } }></div>
          <strong className={cx("name")}>{speakerName}</strong>
          <small className={cx('text-alt', 'company')}>{speakerOneLiner}</small>
          <small className={cx('text-alt', 'email', emailVisibility)}>{speakerEmail}</small>
          </div>
        </div>
      </div>
    );
  }
}

Proposal.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  speakerName: PropTypes.string.isRequired,
  speakerOneLiner: PropTypes.string.isRequired,
  speakerPhoto: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(Proposal);
