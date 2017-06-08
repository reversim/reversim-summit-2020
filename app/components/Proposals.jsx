import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Proposal from 'components/Proposal';
import { Link } from 'react-router';
import _ from 'lodash';

const cx = classNames.bind(styles);

const maxProposalsInSection = 4;

function renderProposal(proposal, i, isReversimTeamMember) {
  let email = isReversimTeamMember ? (proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].email : undefined) : '';

  return (
    <Proposal
      key={ i }
      id={ proposal.id }
      name={ proposal.title }
      abstract={ proposal.abstract }
      type={ proposal.type }
      speakerName={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].name : undefined }
      speakerOneLiner={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].oneLiner : undefined }
      speakerEmail={ email }
      speakerPhoto={ proposal.speaker_ids.length > 0 ? proposal.speaker_ids[0].picture : undefined }
      isReversimTeamMember={ isReversimTeamMember }
    />
  );
}

const Proposals = ({proposals, isReversimTeamMember}) => {
  if (!proposals || proposals.length === 0) return null;

  const proposalsBlocks = _.shuffle(proposals)
          .slice(0, Math.min(maxProposalsInSection, proposals.length))
          .map((proposal, i) => renderProposal(proposal, i, isReversimTeamMember));

  return (
    <section id="proposals" className={cx('section', 'align-center')} style={ {paddingTop: '25px'} }>
      <div className={cx('container')}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-chat-messages-09')}></span>
        <h3>Proposals</h3>
        <br />
        <br />
        { _.chunk(proposalsBlocks, 2).map((block, i) => <div key={i} className={cx("row")}>{block}</div>) }
        <div className={cx("container")}>
          { proposals.length > maxProposalsInSection ? <Link to="proposals" className={cx('btn', 'btn-outlibtn-sm')} style={{ margin: '20px 0 0' }}>More Proposals</Link> : undefined }
        </div>
      </div>
    </section>
  );
};

export default Proposals;
