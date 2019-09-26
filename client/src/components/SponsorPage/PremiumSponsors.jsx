/* eslint-disable prettier/prettier */
import React from "react";
import s from "../Sponsors.css";
import cn from "classnames";
import diamond from "../../images/SVG/diamond.svg";
import { SponsorMiniPremium } from '../SponsorsComps/SponserGeneralComps';

import SponsorForm from './SponsorForm';

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
        <div className="d-flex justify-content-center mb-6">
          <img src={diamond} className={s.diamond} alt="diamond" />
          <div className={cn("font-size-xxl text-white")}>
            Premium Sponsors
          </div>
          <div className="bg-white hl" />
        </div>
        <div className={cn("d-flex flex-wrap", s.premiumSponsorsWrap)}>
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
        </div>
      </div>
    );
  };

export default PremiumSponsors;