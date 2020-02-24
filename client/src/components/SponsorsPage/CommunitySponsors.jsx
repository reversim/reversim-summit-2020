/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

import CommunitySponsor from '../CommunitySponsor';
import SponsorForm from './SponsorForm';

import {
  HeadingAligner,
  HeadingCircle,
  Heading2,
  BreakLineMain
} from '../GlobalStyledComponents/ReversimStyledComps';

//styled-components components

const ColumnContainer = styled.div`
${({theme: { color } }) => `
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  background-color: ${color.background_4};
  `}
`;

const CommunityHeadingAligner = styled(HeadingAligner)`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.xxl};
  `}
`;

const CommunityHeading = styled(Heading2)`
  max-width: min-content;
`;

const SponsorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

//React components

class SponsorWithEdit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isEditing: false,
        isLoading: false
      };
    }
  
    onEdit = () => {
      this.setState({ isEditing: true });
    };
  
    onDelete = async () => {
      await this.props.deleteSponsor(this.props.sponsor._id);
    };
  
    onSubmit = async sponsor => {
      this.setState({ isLoading: true });
      await this.props.updateSponsor(this.props.sponsor._id, {
        ...this.props.sponsor,
        ...sponsor
      });
      this.setState({ isEditing: false, isLoading: false });
    };
  
    onCancel = () => {
      this.setState({ isEditing: false });
    };
  
    render() {
      const { isEditing } = this.state;
      const { sponsor, canEdit } = this.props;
      return isEditing ? (
        <SponsorForm
          sponsor={sponsor}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          isLoading={this.state.isLoading}
        />
      ) : (
        <CommunitySponsor
          canEdit={this.props.canEdit}
          onEdit={canEdit && this.onEdit}
          onDelete={canEdit && this.onDelete}
          sponsor={sponsor}
        />
      );
    }
  }  

const CommunitySponsors = ({
    sponsors,
    user,
    updateSponsor,
    deleteSponsor
  }) => {
    return (
      <ColumnContainer>
        <CommunityHeadingAligner>
          <HeadingCircle />
          <CommunityHeading>
            Community Sponsors
          </CommunityHeading>
          <BreakLineMain />
        </CommunityHeadingAligner>
        <SponsorsContainer>
          {sponsors.map(sponsor => (
            <SponsorWithEdit
              key={sponsor._id}
              sponsor={sponsor}
              canEdit={user && user.isReversimTeamMember}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          ))}
        </SponsorsContainer>
      </ColumnContainer>
    );
  };

export default CommunitySponsors