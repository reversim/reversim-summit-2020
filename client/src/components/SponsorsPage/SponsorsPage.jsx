import React from "react";
import styled from 'styled-components';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import Page from "../Page";
import SponsorForm from './SponsorForm';
import PremiumSponsors from './PremiumSponsors';
import CommunitySponsors from './CommunitySponsors';

import { AlignCenter, AlignCenterColumn, Heading3, Paragraph, SimpleLink } from '../GlobalStyledComponents/ReversimStyledComps';

library.add(faPencilAlt, faTrash);

// Styled-components Section

  //WantToBe components
const WantToBeContainer = styled.div`
  ${({ theme: { color, space, font } }) =>`
    margin: ${space.xl} 0px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;
    line-height: 1.7;
    font-family: ${font.main};

    color: ${color.text_1};
  `}
`;

const WantToBePara = styled(Paragraph)`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_normal};
    font-size: ${font.size_bg};
  `}
`;

const WantToBelink = styled(SimpleLink)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_bg};
  `}
`;

  //SponsorsPage Components

const PremiumSectionContainer = styled.div`
  ${({ theme: { color } }) => `
    background-color: ${color.background_2};
    display: flex;
    justify-content: center;
  `}
`;

const PremiumSectionAligner = styled.section`
  ${({ theme: { color, space } }) => `
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-size: contain;
    padding: ${space.xl} 0 ${space.xxl} 0;

    border-top: 100px solid ${color.box_shadow_1};
  `}
`;

const AddSoponsorContainer = styled.div`
  ${({ theme: { space, color} }) =>`
    width: inherit;
    padding: ${space.l};
    margin-bottom: ${space.xxl};
    border: 2px solid ${color.box_shadow_3};
    color: ${color.text_1};
  `}
`;

const CommunityContainer = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
`;

const CommunityAligner = styled(AlignCenter)`
 ${({ theme: { space } }) => `
    width: 80%;
    margin-top: ${space.xl};
    justify-content: center;
 `}
`;

const InviterContainer = styled.div`
  ${({ theme: { space, color } }) => `
    box-shadow: inset 0px 0px 10px 2px ${color.font_awsome_box_shadow_3};
    background: ${color.background_linear_gradient_1};
    padding: ${space.xl};
    margin-bottom: ${space.xl};
  `}
`;

const InviterHeading = styled(Heading3)`
  ${({ theme: { color } }) => `
    color: ${color.heading_2};
    text-align: center;
  `}
`;

const InviterHeadingBold = styled(InviterHeading)`
  ${({ theme: { font }}) => `
    font-weight: ${font.weight_bold};
  `}
`;

// React components section

const WantToBe = () => (
  <WantToBeContainer>
    <Heading3>Want to be a sponsor?</Heading3>
    <WantToBePara>
      {"Contact our amazing Gilli at "}
      <WantToBelink href="mailto:gilli@reversim.com">
        gilli@reversim.com
      </WantToBelink>
      {" and let's have fun together!"}
    </WantToBePara>
  </WantToBeContainer>
);

class SponsorsPage extends React.Component {
  render() {
    const {
      createSponsor,
      updateSponsor,
      deleteSponsor,
      user,
      sponsors
    } = this.props;

    return (
      <Page title="Sponsors" {...this.props}>
        <PremiumSectionContainer>
          <PremiumSectionAligner>
            <AlignCenterColumn>
            {
              user && user.isReversimTeamMember && (
                <AddSoponsorContainer>
                  <Heading3>Add sponsor</Heading3>
                  <SponsorForm onSubmit={createSponsor} />
                </AddSoponsorContainer>
              )
            }
              <WantToBe />
              {/* <PremiumSponsors
                sponsors={sponsors.filter(sponsor => sponsor.isPremium)}
                user={user}
                updateSponsor={updateSponsor}
                deleteSponsor={deleteSponsor}
              /> */}
            </AlignCenterColumn>
          </PremiumSectionAligner>
        </PremiumSectionContainer>
        <CommunityContainer>
          <CommunityAligner>
            <CommunitySponsors
              sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}
              user={user}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
            {/* <InviterContainer>
              <InviterHeading>The annual Reversim conference is here</InviterHeading>
              <InviterHeadingBold>and we can't do it without you!</InviterHeadingBold>
            </InviterContainer> */}
          </CommunityAligner>
        </CommunityContainer>
      </Page>
    );
  }
}

export default SponsorsPage;
