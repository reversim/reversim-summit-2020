import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Proposal from 'components/Proposal';
import { Link } from 'react-router';
import _ from 'lodash';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const maxProposalsInSection = 4;

const Proposals = ({data}) => {
  const proposalsBlocks = data && data.slice(0, Math.min(maxProposalsInSection, data.length)).map((proposal, i) => {
    return (
      <Proposal
      key={ i }
      id={ proposal.id }
      name={ proposal.title }
      abstract={ proposal.abstract }
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
        <span data-icon className={cx('icon', 'section-icon', 'icon-chat-messages-09')}></span>
        <h3>Proposals</h3>
        <br />
        <br />
        { _.chunk(proposalsBlocks, 2).map((block, i) => <div key={i} className={cx("row")}>{block}</div>) }
        <div className={cx("container")}>
          { data && data.length > maxProposalsInSection ? <Link to="proposals" className={cx('btn', 'btn-outlibtn-sm')} style={{ margin: '20px 0 0' }}>More Proposals</Link> : undefined }
        </div>
      </div>
    </section>
  );
};

export default Proposals;
