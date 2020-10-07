import React from 'react';
import styled from 'styled-components';

import { SponsorMiniPremium } from './SponserGeneralComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

const Contianer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  ${mediaQueryMin.l`
  justify-content: space-around;
  `}
`;

const HomePremiumSponsors = ({ sponsors }) =>{
  return (
    <Contianer>
      {sponsors.map((sponsor, i) => {
        return (
          <div key={i}>
            <SponsorMiniPremium key={sponsor._id} isOnWhite={true} {...sponsor} />
          </div>
        );
      })}
    </Contianer>
  );
};

export default HomePremiumSponsors;
