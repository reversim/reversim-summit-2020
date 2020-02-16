import React from 'react';
import styled from 'styled-components';
import {
  StyledButton
} from './GlobalStyledComponents/ReversimStyledComps';

//styled-components components

const ButtonContainer = styled.div`
  ${({ theme: { space } }) => `
    width: 100%;  
    margin-top: ${space.xxl};
    display: flex;
    justify-content: space-around;
  `}
`;

const VoteYesButton = styled(StyledButton)`
  ${({ theme: { color }, attended }) => `
    background: ${attended ? color.button_bkgr_2 : color.button_bkgr_1} !important;
  `}
`;

const VoteNoButton = styled(StyledButton)`
  ${({ theme: { color }, attended }) => `
    background: ${attended ? color.button_bkgr_1 : color.button_bkgr_3} !important;
  `}
`;

// React components
export default ({
  attended,
  proposalId,
  attendProposal,
}) => {
  console.log('attended: ', attended);
    return (
      <ButtonContainer>
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
      </ButtonContainer>
  );
};
