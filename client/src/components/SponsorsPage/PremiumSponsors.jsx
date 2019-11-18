/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

import SponsorForm from './SponsorForm';
import { SponsorMiniPremium } from '../SponsorsComps/SponserGeneralComps';
import {
  HeadingAligner,
  HeadingDiamond,
  Heading2,
  BreakLineInverted
} from '../GlobalStyledComponents/ReversimStyledComps';

import mediaQueryMin from '../../styles/MediaQueriesMixin';
import diamond from '../../images/SVG/diamond.svg';

//styled-components components
const HeadingDecoration = styled(HeadingDiamond)`
  ${ ({ theme: { space } }) => `
    margin: 0 -${space.xxl} calc(-3 * ${space.m}) 0;
  `}
  
`;

const Heading = styled( Heading2 )`
  ${({ theme: { color } }) => `
    color: ${color.text_1};
  `}
`;

const SponsorMiniAligner = styled.div`
  ${({ theme: { width } })=> `
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: ${width.main_for_mq_s};
    `}

    ${mediaQueryMin.m`
      ${({ theme: { width } }) =>`
        width: ${width.main_for_mq_m};
        `}`}
    
    ${mediaQueryMin.l`
      ${({ theme: { width } }) => `
       width: ${width.main_for_mq_l};
      `}`}

    ${mediaQueryMin.xl`
      ${({ theme: { width } }) => `
       width: ${width.main_for_mq_xl};
      `}`}
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
          <Heading>
            <HeadingDecoration src={diamond} alt="diamond" />
            Premium Sponsors
          </Heading>
          <BreakLineInverted />
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