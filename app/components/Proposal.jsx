import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/main';

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
    const { id, name, description, type, speakerName, speakerOneLiner, speakerPhoto } = this.props;

    let sessionType;
    if (type === 'ossil') {
      sessionType = "Open Source in Israel";
    } else if (type === 'lightning') {
      sessionType = "Lightning";
    } else {
      sessionType = "Full Featured";
    }

    return (
      <div className={cx("col-sm-6")}>
        <div className={cx("proposal")}>
          <h6>{name}</h6>
          <article className={cx("text-box")}>
            <div className={cx("session-info-link")} onClick={this.jumpToProposalPage.bind(this)}>
              { description.length > 200 ? description.substr(0, 200) + '...' : description }
            </div>
            <div className={cx("session-type")}><small className={cx("text-alt")}><span className={cx("highlight")}>{sessionType}</span></small></div>
          </article>
          <div className={cx("author-block")}>
            <div className={cx("photo-container")} style={ {backgroundImage: `url(${speakerPhoto})` } }></div>
          <strong className={cx("name")}>{speakerName}</strong>
          <small className={cx('text-alt', 'company')}>{speakerOneLiner}</small>
          </div>
        </div>
      </div>
    );
  }
}

Proposal.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
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
