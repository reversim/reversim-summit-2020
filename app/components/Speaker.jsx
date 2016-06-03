import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

const Speaker = ({name, imageUrl, oneLiner, bio, linkedin, twitter}) => {
  let twitterButton = twitter ? <li><a href={'https://twitter.com/' + twitter}><span className={cx('fa', 'fa-twitter')}></span></a></li> : undefined;
  let linkedInButton = linkedin ? <li><a href={linkedin}><span className={cx('fa', 'fa-linkedin')}></span></a></li> : undefined;

  return (
    <div>
      <div className={cx("speaker")}>
        <div className={cx('photo-wrapper', 'rounded')} style={{width: '40%'}}><img src={imageUrl} alt={name} className={cx("img-responsive")} /></div>
        <h3 className={cx("name")}>{name}</h3>
        {oneLiner ? <p className={cx("text-alt")}><small>{oneLiner}</small></p> : undefined }
        <p className={cx("about")}>{bio}</p>
        <ul className={cx("speaker-socials")}>
          {twitterButton}
          {linkedInButton}
        </ul>
    </div>
  </div>
  );
};

Speaker.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  oneLiner: PropTypes.string.isRequired,
  bio: PropTypes.element.isRequired,
  linkedin: PropTypes.string,
  twitter: PropTypes.string
};

export default Speaker;
