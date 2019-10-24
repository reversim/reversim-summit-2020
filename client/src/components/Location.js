import React from 'react';
import styled from 'styled-components';

import Map from './Map';
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

// import { Button, Container } from "reactstrap";
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
          <SubHeading>TLV Convention center</SubHeading>
        </ColumnAligner>
      </HeadingAligner>

      <div>
        <div>
          <div className="map-wrapper">
            <Map />
          </div>
          <div className="venue-img">
            <img
              src={venuePic}
              alt="venue"
              style={{ width: '100%', marginTop:-300 }}
              className="b-strong border-purple2"
            />
          </div>
        </div>
      </div>
    </AlignCenter>
  </LocationSection>
);

export default Location;
