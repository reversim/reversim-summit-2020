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
${ ({theme: { color } }) => `
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: ${color.background_4};
  `}
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
        <HeadingAligner>
          <HeadingCircle />
          <Heading2>
            Community Sponsors
          </Heading2>
          <BreakLineMain />
        </HeadingAligner>
        <div>
          {sponsors.map(sponsor => (
            <SponsorWithEdit
              key={sponsor._id}
              sponsor={sponsor}
              canEdit={user && user.isReversimTeamMember}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          ))}
        </div>
      </ColumnContainer>
    );
  };

export default CommunitySponsors