import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Proposal from 'components/Proposal';

import photo from 'images/speakers/speaker.jpg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Proposals = ({data}) => {
  const proposalsBlocks = data.map(proposal => {
    return (
      <Proposal
      key={ proposal.id }
      id={ proposal.id }
      name={ proposal.title }
      description={ proposal.abstract }
      type={ proposal.type }
      speakerName={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].profile.name : undefined }
      speakerOneLiner={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].profile.oneLiner : undefined }
      speakerPhoto={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].profile.picture : undefined }
      />
    );
  })

  return (
    <section id="proposals" className={cx('section', 'align-center')} style={ {paddingTop: '25px'} }>
      <div className={cx('container')}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-badges-votes-08')}></span>
        <h3>Proposals</h3>
        <p className={cx("text-alt")} style={ {marginBottom: '80px'} }>featured <span className={cx("highlight")}>proposals</span></p>

      { proposalsBlocks }

      </div>
    </section>
  );
};

export default Proposals;
