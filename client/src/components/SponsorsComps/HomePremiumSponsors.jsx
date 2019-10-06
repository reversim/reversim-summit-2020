import React from 'react';
import { SponsorMiniPremium } from './SponserGeneralComps';

const HmPremiumSponsors = ( {sponsors} ) =>{
  return (
    sponsors
    .filter(sponsor => sponsor.isPremium)
    .map((sponsor, i) => {
      return (
        <div key={i}>
          <SponsorMiniPremium key={sponsor._id} isOnWhite={true} {...sponsor} />
        </div>
      );
    })
  );
};

export default HmPremiumSponsors;