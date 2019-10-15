/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

import CommunitySponsor from '../CommunitySponsor';
import SponsorForm from './SponsorForm';

import {
  Bkgr4,
  HeadingAligner,
  HeadingCircle,
  Heading2,
  BreakLine
} from '../GlobalStyledComponents/ReversimStyledComps';

//styled-components components

const Container = styled(Bkgr4)`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
      <Container>
        <HeadingAligner>
          <HeadingCircle>
            <path d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z" />
          </HeadingCircle>
          <Heading2>
            Community Sponsors
          </Heading2>
          <BreakLine />
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
      </Container>
    );
  };

export default CommunitySponsors