import React from 'react';
import {Button} from 'reactstrap';
import cn from 'classnames';
import s from './SpeakerPage.css';

export default ({user, attended, proposalId, attendProposal}) => {
  if (!user) {
    return <span className="text-danger">Login to vote!</span>;
  }

  return (
    <React.Fragment>
      <Button
        className={cn('styled-button mr-4', s.changeAnimation)}
        onClick={() => attended !== false && attendProposal(proposalId, false)}>
        Not relevant to me {attended === false && '(v)'}
      </Button>
      <Button
        className={cn('styled-button', s.changeAnimation)}
        onClick={() => attended !== true && attendProposal(proposalId, true)}>
        Interested {attended && '(v)'}
      </Button>
    </React.Fragment>
  );
};
