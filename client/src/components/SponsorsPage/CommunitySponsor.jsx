import React from 'react';
import ReadMore from '../ReadMore';
import styled from 'styled-components';

import { hyperlink } from '../../utils';

import { image } from '../../images';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faPencilAlt, faTrash);

import {
  Heading5,
  StyledButton,
} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

// Styled components components

const SponsorContainer = styled.div`
  ${({ theme: { space, color } }) => `
    width: min-content;
    margin: 0 ${space.l} calc(6 * ${space.m}) ${space.l};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 4px solid ${color.border_1};
  `}
  ${mediaQueryMin.m`
    width: initial;
    flex-direction: row;
    flex-wrap: nowrap;
  `}
`;


const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 240px;

  ${mediaQueryMin.m`
    ${({ theme: { color } }) => `
      border-right: 4px solid ${color.border_1};
    `}
  `}
`;

const SponsorLogo = styled.a`
  ${({sponsor}) => `
    width: 236px;
    height: 236px;
    background-image: url(${image(sponsor.logo, 236, 236)});
    background-size: cover;
  `}
`;

const NameAndJobsContainer = styled.div`
  ${({ theme: { space, color } }) => `
    width: 100%
    padding: ${space.l};
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    background: ${color.background_2};
    color: ${color.text_1};
  `}
`;

const SponsorName = styled(Heading5)`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_medium};
  `}
`;

const JobOps = styled.a`
  ${({ theme: { font } }) => `
    color: inherit;
    cursor: pointer;
    font-size: ${font.size_h5};
    font-weight: ${font.weight_bold};
    text-decoration: none;
    white-space: nowrap;
  `}
`;

const SponsorContentContainer = styled.div`
  ${({ theme: { space } }) => `
    padding: ${space.l};
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

const ButtonsContainer = styled.div`
  ${({ theme: { space } }) => `
    margin-top: ${space.xl}
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  `}  
`;

const EditButton = styled(StyledButton)`
  min-width: initial;
`;

const TrashButton = styled(StyledButton)`
  ${({ theme: { color } }) => `
    min-width: initial;
    background-image: linear-gradient(to right, ${color.button_bkgr_4} 50%, ${color.button_bkgr_1} 50%);
  `}
`;
// React components

const CommunitySponsor = ({ canEdit, onEdit, onDelete, sponsor }) => (
  <SponsorContainer>
    <LogoContainer>
      <SponsorLogo href={hyperlink(sponsor.url)} target="_blank" sponsor={sponsor} />
      <NameAndJobsContainer>
        <SponsorName>{sponsor.name}</SponsorName>
        {sponsor.jobUrl && <JobOps href={sponsor.jobUrl} target="_blank">JOB OPPORTUNITIES >></JobOps>}
      </NameAndJobsContainer>
    </LogoContainer>

    <SponsorContentContainer>
      <ReadMore
        lines={10}
        truncateText="…"
        more="Read more"
        less="Show less"
        children={sponsor.about}
        onToggle={() => {}}
      />
      {
        canEdit && 
        <ButtonsContainer>
          <EditButton
            onClick={onEdit}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </EditButton>

          <TrashButton
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </TrashButton>
        </ButtonsContainer>
      }
    </SponsorContentContainer>
  </SponsorContainer>
);


export default CommunitySponsor;
