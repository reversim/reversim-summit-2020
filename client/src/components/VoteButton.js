import React from 'react';
import {Button} from 'reactstrap';
import cn from 'classnames';
import { getLoginUrl } from "./Redirect";
import s from './SpeakerPage.css';

export default ({user, attended, proposalId, attendProposal}) => {
  if (!user) {
    return (
        <a href={getLoginUrl()}>Login to vote!</a>
    );
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
