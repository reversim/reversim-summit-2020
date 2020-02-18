import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  StyledButton
} from './GlobalStyledComponents/ReversimStyledComps';

//styled-components components

const VoteYesButton = styled(StyledButton)`
  ${({ theme: { color }, attended }) => `
    background: ${attended ? color.button_bkgr_3 : color.button_bkgr_1};
  `}
`;

const VoteNoButton = styled(StyledButton)`
  ${({ theme: { color }, attended }) => `
    background: ${attended ? color.button_bkgr_1 : color.button_bkgr_4};
  `}
`;

// React components
export default ({
  attended,
  proposalId,
  attendProposal,
}) => (
  <Fragment>
    <VoteNoButton
      attended={attended}
      onClick={() => attendProposal(proposalId, false)}
    >
      Not relevant to me
    </VoteNoButton>

    <VoteYesButton
      attended={attended}
      onClick={() => attendProposal(proposalId, true)}
    >
      Interested
    </VoteYesButton>
  </Fragment>
);
