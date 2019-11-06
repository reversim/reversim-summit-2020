import React from 'react';
import styled from 'styled-components';

import {
  AlignCenter,
  HeadingAligner,
  HeadingSquares,
  FlexColumn,
  FlexRow,
  Heading2,
  BreakLine,
  Paragraph,
} from './GlobalStyledComponents/ReversimStyledComps';
import Map from './Map';

import squares from "../images/SVG/squares.svg";
import venuePic from "../images/bitan10.jpeg";

// styled-components components
const LocationSection = styled.section`
  ${ ({ theme: { space } }) => `
    margin: calc(8 * ${space.m}) auto calc(10 * ${space.m}) auto;
  `}
`;
const ColumnAligner = styled(FlexColumn)`
  ${ ({ theme: { space } }) => `
    margin-left: ${space.m};
    width: 100%;
  `}
`;

const SubHeading = styled(Paragraph)`
  ${ ({ theme: { color, space, font } }) => `
    margin-top: ${space.m};
    color: ${color.text_2};
    font-size: ${font.size_bg};
    font-weight: ${font.weight_bold};
  `}
`;
const MapWrapper = styled.div`
  float: right;
  position: relative;
`;

const VenueImg = styled.img`
  ${ ({ theme: { color, space } }) => `
    width: 100%;
    margin-top: calc(-30 * ${space.m});
    border: 4px solid ${color.box_shadow_1};
  `}
`;

// React component
const Location = () => (
  <LocationSection>
    <AlignCenter>
      <HeadingAligner>
        <HeadingSquares src={squares} alt="location icon" />
        <ColumnAligner>
          <FlexRow>
            <Heading2>Venue</Heading2>
            <BreakLine />
          </FlexRow>
          <SubHeading>TLV Convention Center</SubHeading>
        </ColumnAligner>
      </HeadingAligner>

      <div>
        <MapWrapper>
          <Map />
        </MapWrapper>
        <VenueImg
          src={venuePic}
          alt="TLV Convention Center picture"
        />
      </div>
    </AlignCenter>
  </LocationSection>
);

export default Location;
