import React from 'react';
import styled from 'styled-components';

import mediaQueryMin from '../styles/MediaQueriesMixin';
import aboutImg from '../images/about.png';

import {
  AlignCenterColumn,
  HeadingAligner,
  HeadingHoop,
  Heading4,
  Paragraph2,
  BreakLineMain,
  Heading2,
} from './GlobalStyledComponents/ReversimStyledComps';

//styled-components section
const AboutHeading = styled(HeadingAligner)`
  ${({ theme: { space,  } }) => `
  margin: ${space.xl} !important;
  `}
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueryMin.l`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `}
`;

const SegmentContainer = styled.div`
  ${({ theme: { space } }) => `
  margin-bottom: ${space.xl};
  `}

    ${mediaQueryMin.l`
    margin-bottom: 0;
    flex-basis: 48%;
    `}
  `;

const AboutImage = styled(SegmentContainer)`
  width: 100%;
  height: 20vh;
  background-image: url(${aboutImg.toString()});
  background-size: cover;
  background-position: center;

    ${mediaQueryMin.l`
    height: 45vh;
    `}
    ${mediaQueryMin.xl`
    height: 40vh;
    `}
`
const MainHeading = styled(Heading4)`
  ${({ theme: { color } }) => `
    color: ${color.text_3};
  `}
  `

const SubHeading = styled(MainHeading)`
${({ theme: { space, font } }) => `
    margin-top: ${space.xl};
    font-size: ${font.size_md};
  `}
  `

// React components section
const About = () => (
  <AlignCenterColumn>

    <AboutHeading>
        <HeadingHoop />
        <Heading2>About</Heading2>
        <BreakLineMain />
    </AboutHeading>

    <MainContainer>
      <AboutImage/>
      <SegmentContainer>

        <MainHeading>General Info</MainHeading>
        <SubHeading>About Reversim Summit</SubHeading>
        <Paragraph2>
          Reversim summit is our intention to create a conference for developers by developers. Like
          in the podcast, we bring you the content we are interested in, and we hope you will be
          too.
        </Paragraph2>
        <Paragraph2>
          This is the 8th(!) Reversim Summit. The summits of 2013 and 2014 (TLV Campus), 2015
          (Technion), 2016 (Weizmann Institute of Science), 2017 (College of Management) and 2018 (Tel Aviv University) also
          featured community content. Watch previous years' sessions to get the general feel of the
          Revesim Summit spirit.
        </Paragraph2>
        <SubHeading>About Reversim Podcast</SubHeading>
        <Paragraph2>
          Reversim (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and Ran Tavory which brings
          together software developers and product, with over 300 recorded episodes and a few
          thousands listeners.
        </Paragraph2>
      </SegmentContainer>
    </MainContainer>
  </AlignCenterColumn>
);

export default About;
