import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

const cx = classNames.bind(styles);

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const SocialShare = ({url, title}) => {
  return (
    <div className={cx('social-buttons')}>
      <FacebookShareButton
        url={url}
        title={title}
        className={cx('share-button', 'pull-left')}>
        <FacebookIcon
          size={32}
          round />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        className={cx('share-button', 'pull-left')}>
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton>

      <GooglePlusShareButton
        url={url}
        className={cx('share-button', 'pull-left')}>
        <GooglePlusIcon
          size={32}
          round />
      </GooglePlusShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        className={cx('share-button', 'pull-left')}>
        <LinkedinIcon
          size={32}
          round />
      </LinkedinShareButton>
    </div>
  );
};

SocialShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SocialShare;
