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
        className={cn(
          'styled-button-white v2 mr-10',
          {purple: attended === false},
          s.changeAnimation,
        )}
        onClick={() => attended !== false && attendProposal(proposalId, false)}>
        Not relevant to me
      </Button>
      <Button
        className={cn('styled-button-white', {orange: attended}, s.changeAnimation)}
        onClick={() => attended !== true && attendProposal(proposalId, true)}>
        Interested
      </Button>
    </React.Fragment>
  );
};
