import React from "react";
import s from "../Sponsors.css";
import { Container } from "reactstrap";
import HomeCommunitySponsors from "../HomeCommunitySponsors";
import cn from "classnames";
import { SponsorMiniPremium } from '../Sponsors';


const SponsorsSection = ({ sponsors }) => {
return (
    <section className="mb-20">
        <Container>
          <div className="d-flex mt-16 mb-12">
            <div
              style={{ position: "relative", zIndex: 1 }}
              className="text-purple2 font-size-xxl text-align-center"
            >
                Meet Our Sponsors
            </div>
            <div className="hl bg-purple2" />
          </div>
          <div className="">
            <div className="home-sponsors d-flex flex-wrap">
              {sponsors
                .filter(sponsor => sponsor.isPremium)
                .map((sponsor, i) => {
                  return (
                    <div key={i}>
                        <SponsorMiniPremium key={sponsor._id} isOnWhite={true} {...sponsor} />
                    </div>
                  );
                })}
            </div>
            <div className="hl mt-6 mb-12 bg-purple2" />
              <div className={cn("d-flex flex-wrap mt-6", s.communitySponsorsHome)}> {/* NOTE: This is not shown when screen width is under 992px */}
                {/* {sponsors
                .filter(sponsor => !sponsor.isPremium)
                .map((sponsor, i) => {
                    return (
                    <div key={i}>
                        <SponsorMini key={sponsor._id} {...sponsor} /> /* NOTE: SponsorMini is not defined. check if It could and should be imported from anywhere.
                    </div>
                    );
                })} */}
                <HomeCommunitySponsors sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}/>
              </div>
              {/* <WantToBe /> */} {/* NOTE: DO NOT DELETE but consider changing color since it's white on white */}
            </div>
        </Container>
    </section>
);
};

export default SponsorsSection;