import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

const Speaker = ({name, imageUrl, oneLiner, bio, linkedin, twitter}) => {
  const twitterButton = twitter ? <li><a href={'https://twitter.com/' + twitter}><span className={cx('fa', 'fa-twitter')}></span></a></li> : undefined;
  const linkedInButton = linkedin ? <li><a href={linkedin}><span className={cx('fa', 'fa-linkedin')}></span></a></li> : undefined;
  const bioParagaphs = bio.split('\n').map(paragraph => <p className={cx("bio")}>{paragraph}</p>);

  return (
    <div>
      <div className={cx("speaker")}>
        <div className={cx('photo-wrapper', 'rounded')} style={{width: '40%'}}><img src={imageUrl} alt={name} className={cx("img-responsive")} /></div>
        <h3 className={cx("name")}>{name}</h3>
        {oneLiner ? <p className={cx("text-alt")}><small>{oneLiner}</small></p> : undefined }
        {bioParagaphs}
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
  imageUrl: PropTypes.string,
  oneLiner: PropTypes.string,
  bio: PropTypes.string,
  linkedin: PropTypes.string,
  twitter: PropTypes.string
};

export default Speaker;
