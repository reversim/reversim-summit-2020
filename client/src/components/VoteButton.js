import React from 'react';
import {Button} from 'reactstrap';
import cn from 'classnames';
import s from './SpeakerPage.css';

export default ({user, attended, proposalId, attendProposal}) => {
  if (!user) {
    return <span className="text-danger">Login to vote!</span>;
  }
  if (attended) {
    return (
      <Button
        className={cn('btn-success', s.changeAnimation)}
        onClick={() => attendProposal(proposalId, !attended)}>
        Interested!
      </Button>
    );
  } else {
    return (
      <Button
        className={cn('btn-default', s.changeAnimation)}
        onClick={() => attendProposal(proposalId, !attended)}>
        Interested?
      </Button>
    );
  }
};
