/* eslint-disable prettier/prettier */
import React from "react";
import s from "../Sponsors.css";
import cn from "classnames";
import CommunitySponsor from '../CommunitySponsor';


import SponsorForm from './SponsorForm';

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
      <div className={cn("bg-white")}>
        <div
          className={cn(
            "d-flex justify-content-center text-align-center mb-6",
            s.communitySponsorsTitle
          )}
        >
          <svg className={s.circle}>
            <path d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z" />
          </svg>
          <div className={cn("font-size-xxl text-purple2")}>
            Community Sponsors
          </div>
          <div className={cn("hl bg-purple2", s.mb10)} />
        </div>
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
      </div>
    );
  };

export default CommunitySponsors