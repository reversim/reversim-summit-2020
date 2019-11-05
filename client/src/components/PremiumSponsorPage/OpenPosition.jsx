/* eslint-disable prettier/prettier */
/*
* NOTE: OpenPosition is rendered by SponsorPage.
* Each component OpenPosition is responsible for one open position description
* in each of the sponsors pages.
*/

import React from 'react';
import styled from 'styled-components';

import { FlexColumn, Heading4, Paragraph, ButtonStyledLink } from '../GlobalStyledComponents/ReversimStyledComps';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarkerAlt);

// styled-components components

const MainContainer = styled(FlexColumn)`
  ${ ({ theme: { color, font, space } }) => `
    flex: 1;
    margin: ${space.xl} calc( ${space.xl} / 2);
    
    font-family: ${font.main};
    background-color: ${color.background_4};
    border: 4px solid ${color.box_shadow_1};
  `}
`;

const HeaderContainer = styled.div`
  ${ ({ theme: { color, space } }) => `
    min-height: 120px;
    padding: calc(${space.m} * 3);

    background-color: ${color.background_2};
    color: ${color.text_1};
  `}
`;

const JobTitle = styled(Heading4)`
  ${ ({ theme: { font } }) => `
    font-weight: ${font.weight_bold}
  `}
`;

const JobLocation = styled(Heading4)`
  ${ ({ theme: { font } }) => `
    margin: 0;
    font-weight: ${font.weight_medium};
  `}
`;

const DescriptionContainer = styled(FlexColumn)`
  ${ ({ theme: { space } }) =>`
    padding: calc(${space.m} * 3);

    flex-grow: 1;
    justify-content: space-between;
  `}
`;

const JobDescription = styled(Paragraph)`
  ${ ({ theme: {color, font, space } }) => `
    margin-bottom: ${space.xl};

    color: ${color.text_2};
    font-weight: ${font.weight_medium};
  `}
`;

const ApplyButton = styled(ButtonStyledLink)`
  min-width: 90px;
  align-self: flex-end;
  text-align: center;
  margin: 0;

  &:hover{
    color: ${props => props.theme.color.text_1}
  }
`;

// React component
class OpenPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isEditing: false,
      isLoading: false
    };
  }

  render() {
    // const {isEditingiting} = this.state;

    const {
      sponsor,
      canEdit,
      openPosition 
    } = this.props;

    return (
      <MainContainer>
        <HeaderContainer>
            <JobTitle>
              {openPosition.title}
            </JobTitle>
            <JobLocation>{openPosition.city}</JobLocation>
        </HeaderContainer>
        <DescriptionContainer>
          <JobDescription>
            {openPosition.description}
          </JobDescription>
          <ApplyButton href={openPosition.link}>APPLY</ApplyButton>
        </DescriptionContainer>
      </MainContainer>
    );
  }
}
  
export default OpenPosition;
