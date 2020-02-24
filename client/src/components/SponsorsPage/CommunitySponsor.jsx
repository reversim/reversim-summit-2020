import React from 'react';
import ReadMore from '../ReadMore';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import { hyperlink } from '../../utils';

import { image } from '../../images';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faPencilAlt, faTrash);
import {Heading5} from '../GlobalStyledComponents/ReversimStyledComps';

import { Button } from "reactstrap";
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

// React components

const CommunitySponsor = ({ canEdit, onEdit, onDelete, sponsor }) => (
  <SponsorContainer>
    <LogoContainer>
      <SponsorLogo href={hyperlink(sponsor.url)} target="_blank" sponsor={sponsor} />
      <NameAndJobsContainer>
        <SponsorName>{sponsor.name}</SponsorName>
        {sponsor.jobUrl && <JobOps href={sponsor.jobUrl} target="_blank"> JOB OPPORTUNITIES>></JobOps>}
      </NameAndJobsContainer>
    </LogoContainer>

    <SponsorContentContainer>
      <div className="content">
        <ReadMore
          lines={10}
          truncateText="…"
          more="Read more"
          less="Show less"
          children={sponsor.about}
          onToggle={() => {}}
        />
        {/*<ReactMarkdown*/}
        {/*  className="mb-4 session__abstract"*/}
        {/*  source={sponsor.about}*/}
        {/*/>*/}
      </div>
      {canEdit && <div>
        <Button
          size="sm"
          className="ml-2 styled-button btn btn-secondary"
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
        <Button
          size="sm"
          className="ml-2 styled-button btn btn-secondary"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>}
    </SponsorContentContainer>
  </SponsorContainer>
);


export default CommunitySponsor;
