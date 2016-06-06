import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Proposal from 'components/Proposal';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const maxProposalsInSection = 4;

const Proposals = ({data}) => {
  const proposalsBlocks = data && data.slice(0, Math.min(maxProposalsInSection, data.length)).map(proposal => {
    return (
      <Proposal
      key={ proposal.id }
      id={ proposal.id }
      name={ proposal.title }
      description={ proposal.abstract }
      type={ proposal.type }
      speakerName={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].name : undefined }
      speakerOneLiner={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].oneLiner : undefined }
      speakerPhoto={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].picture : undefined }
      />
    );
  })

  return (
    <section id="proposals" className={cx('section', 'align-center')} style={ {paddingTop: '25px'} }>
      <div className={cx('container')}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-badges-votes-08')}></span>
        <h3>Proposals</h3>
      <p className={cx("text-alt")} style={ {marginBottom: '80px'} }>Newest proposals</p>
      { proposalsBlocks }
      { data && data.length > maxProposalsInSection ? <Link to="proposals" className={cx('btn', 'btn-outlibtn-sm')} style={{ margin: '20px 0 0' }}>More Proposals</Link> : undefined }
      </div>
    </section>
  );
};

export default Proposals;
