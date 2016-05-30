import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

const Speaker = ({name, imageUrl, position, bio, linkedin, twitter}) => {
  return (
    <div className={cx("col-sm-4")}>
      <div className={cx("speaker")}>
        <div className={cx('photo-wrapper', 'rounded')}><img src={imageUrl} alt={name} className={cx("img-responsive")} /></div>
        <h3 className={cx("name")}>{name}</h3>
        <p className={cx("text-alt")}><small>{position}</small></p>
        <p className={cx("about")}>{bio}</p>
        <ul className={cx("speaker-socials")}>
          <li><a href={twitter || '#'}><span className={cx('fa', 'fa-twitter')}></span></a></li>
          <li><a href={linkedin || '#'}><span className={cx('fa', 'fa-linkedin')}></span></a></li>
        </ul>
    </div>
  </div>
  );
};

Speaker.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  linkedin: PropTypes.string,
  twitter: PropTypes.string
};

export default Speaker;
