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
      <div
        className="not-relevant-cb cursor-pointer font-weight-bold d-flex align-items-center"
        onClick={() => attended !== false && attendProposal(proposalId, false)}>
        <div
            className={cn('mr-2 b-regular', {'selected': attended === false})}
            style={{width: 24, height: 24}}>
          <div/>
        </div>
        <span> Not relevant to me</span>
      </div>

      <Button
        className={cn('interested-btn', {selected: attended}, s.changeAnimation)}
        onClick={() => attended !== true && attendProposal(proposalId, true)}>
        Interested
      </Button>
    </React.Fragment>
  );
};
