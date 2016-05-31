import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

const Proposal = ({id, name, description, speakerName, speakerPosition, speakerPhoto}) => {
  return (
    <div className={cx("col-sm-4")}>
      <div className={cx("proposal")}>
        <h6>{name}</h6>
        <article className={cx("text-box")}>
          {description}
        </article>
        <div className={cx("author-block")}>
          <div className={cx("photo-container")} style={ {backgroundImage: `url(${speakerPhoto})` } }></div>

        <strong className={cx("name")}>{speakerName}</strong>
        <small className={cx('text-alt', 'company')}>{speakerPosition}</small>
        </div>
      </div>
    </div>
  );
};

Proposal.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  speakerName: PropTypes.string.isRequired,
  speakerPosition: PropTypes.string.isRequired,
  speakerPhoto: PropTypes.string.isRequired
};

export default Proposal;
