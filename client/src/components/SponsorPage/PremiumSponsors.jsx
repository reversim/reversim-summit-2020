/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

import SponsorForm from './SponsorForm';
import { SponsorMiniPremium } from '../SponsorsComps/SponserGeneralComps';
import {
  HeadingAligner,
  HeadingImg,
  Heading2,
  BreakLine
} from '../GlobalStyledComponents/ReversimStyledComps';

import diamond from '../../images/SVG/diamond.svg';

//styled-components components

const Heading = styled( Heading2 )`
  ${ ({ theme: { color } }) => `
    color: ${color.text_1};
  `}
`;

const BLine = styled( BreakLine )`
  ${ ({ theme: { color } }) => `
    border-top: 1.5px solid ${color.box_shadow_2};
  `}
`;

const SponsorMiniAligner = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

// React components

class SponsorMiniPremiumWithEdit extends React.Component {
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
        <SponsorMiniPremium
          onEdit={canEdit && this.onEdit}
          onDelete={canEdit && this.onDelete}
          sponsor={sponsor}
          {...sponsor}
          isOnWhite={false}
        />
      );
    }
  }
  

const PremiumSponsors = ({ sponsors, user, updateSponsor, deleteSponsor }) => {
    return (
      <div>
        <HeadingAligner>
          <HeadingImg src={diamond} alt="diamond" />
          <Heading>
            Premium Sponsors
          </Heading>
          <BLine />
        </HeadingAligner>
        <SponsorMiniAligner>
          {sponsors.map(sponsor => (
            <SponsorMiniPremiumWithEdit
              key={sponsor._id}
              {...sponsor}
              sponsor={sponsor}
              canEdit={user && user.isReversimTeamMember}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          ))}
        </SponsorMiniAligner>
      </div>
    );
  };

export default PremiumSponsors;