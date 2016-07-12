import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

const Speaker = ({name, email, imageUrl, oneLiner, bio, linkedin, twitter, stackOverflow, isReversimTeamMember}) => {
  const twitterButton = twitter ? <li><a href={'https://twitter.com/' + twitter}><span className={cx('fa', 'fa-twitter')}></span></a></li> : undefined;
  const linkedInButton = linkedin ? <li><a href={linkedin}><span className={cx('fa', 'fa-linkedin')}></span></a></li> : undefined;
  const stackOverflowButton = stackOverflow ? <li><a href={stackOverflow}><span className={cx('fa', 'fa-stack-overflow')}></span></a></li> : undefined;
  const bioParagaphs = bio ? bio.split('\n').map((paragraph, i) => <p className={cx("bio")} key={i}>{paragraph}</p>) : undefined;

  let emailVisibility = isReversimTeamMember ? 'shown' : 'hidden';

  return (
    <div>
      <div className={cx("speaker")}>
        <div className={cx('photo-wrapper', 'rounded')} style={{width: '40%'}}>
          <img src={imageUrl.replace("upload/v", "upload/w_250/v")} alt={name} className={cx("img-responsive")} />
        </div>
        <h3 className={cx("name")}>{name}</h3>
        <span className={cx('text-alt', emailVisibility)}>{email}</span>
        {oneLiner ? <p className={cx("text-alt")}><small>{oneLiner}</small></p> : undefined }
        {bioParagaphs}
        <ul className={cx("speaker-socials")}>
          {twitterButton}
          {linkedInButton}
          {stackOverflowButton}
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
  twitter: PropTypes.string,
  stackOverflow: PropTypes.string
};

export default Speaker;
