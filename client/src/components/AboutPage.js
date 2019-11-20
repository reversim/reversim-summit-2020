import React from 'react';
import styled from 'styled-components';

import Page from './Page';
import ReadMore from './ReadMore';

import x from '../images/SVG/x.svg';
import { img } from './Speaker2.css';
import { image } from '../images';

import mediaQueryMin from '../styles/MediaQueriesMixin';
import {
  AlignCenterColumn,
  HeadingAligner,
  HeadingHoop,
  PageHeading,
  BreakLineInverted,
  Heading4,
  Paragraph,
  SimpleLink,
  Heading2,
  BreakLineMain,

} from './GlobalStyledComponents/ReversimStyledComps';

// styled-componets components

const IntroContainer = styled.div`
  ${ ({ theme: { color, font, space, mq } }) => `
    padding: calc(2 * ${space.xxl}) 0 calc(3 * ${space.xl}) 0;

    background-color: ${color.background_2};
    background-image: url(${x});
    background-repeat: no-repeat;
    background-size: 600px;
    background-position: 50% 120%;

    color:  ${color.text_1};
    font-size: ${font.size_md};
  `}
`;

const IntroInnerContainer = styled(AlignCenterColumn)`
  display: block;
`;

const MainContainer = styled(AlignCenterColumn)`
  ${({ theme: { color } }) => `
    background-color: ${color.background_4};
    display: block;
    `}
`;

const IntroHeadingContainer = styled(HeadingAligner)`
  ${({ theme: { space } }) => `
    padding-top: calc(3 * ${space.xl});
    `}
`;

const IntroTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueryMin.l`
    flex-direction: row;
  `}
`;

const IntroParagraphContainer = styled.div`
  ${({ theme: { space } }) => `
    flex: 1;
    margin-right: calc(3 * ${space.l});
    padding-top: ${space.xxl};
  `}
`

const IntroSubHeading = styled(Heading4)`
  ${({ theme: { font,  } }) => `
    font-weight: ${font.weight_medium};
    `}
`

const IntroParagraph = styled(Paragraph)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
    `}
`

const IntroLink = styled(SimpleLink)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
    `}
`;

const MainHeadingContainer = styled(HeadingAligner)`
  ${({ theme: { space } }) => `
    padding: calc(8 * ${space.m}) 0 calc(6 * ${space.m}) 0;
    `}
`;

const AboutTeam = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// React Components

class TeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggle = () => {
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
  };

  render() {
    const {
      picture,
      name,
      oneLiner,
      bio
    } = this.props;

    const { isExpanded } = this.state;

    let textStyle = isExpanded
        ? { zIndex: 1, height: "auto", minHeight: 240 }
        : { height: 240 };

    // textStyle = { zIndex: 10, height: "auto", minHeight: 240 }

    return (
      <div className="about__team-member mb-12 d-flex">
        <div
          style={{ backgroundImage: `url('${image(picture, 240, 240)}')` }}
          alt={name}
          className={img}
        /> 
        {/* NOTE: the picture right border dissapears at 768px and returns in 992px */}
        <div className="flex-grow-1 line-height-12">
          <div
            className={`p-4 bg-white b-strong p-relative`}
            // onClick={this.toggle}
            style={textStyle}
          >
            <div ref={this.ref}>
              <h4 className="line-height-1 mb-1">{name}</h4>
              <p className="font-weight-regular line-height-12 font-size-md">
                {oneLiner}
              </p>
              <div className="line-height-15 mb-0">
                <ReadMore
                  lines={4}
                  truncateText="…"
                  more="Read more"
                  less="Show less"
                  children={bio}
                  onToggle={this.toggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const AboutPage = props => {
  return (
    <Page title="About" {...props}>
      <IntroContainer>
        <IntroInnerContainer>
          <IntroHeadingContainer>
            <HeadingHoop />
            <PageHeading>About</PageHeading>
            <BreakLineInverted />
          </IntroHeadingContainer>
          <IntroTextContainer>
            <IntroParagraphContainer>
              <IntroSubHeading>Reversim Summit</IntroSubHeading>
              <IntroParagraph>
                <IntroLink href="https://twitter.com/reversim/">#reversim</IntroLink> (רברס עם פלטפורמה) 
                summit is our intention to create a conference for
                developers by developers. Like in the podcast, we bring you the
                content we are interested in, and we hope you will be too.
              </IntroParagraph>
              <IntroParagraph>
                This is the 7th(!) Reversim Summit. The summits of 2013 and 2014
                (TLV Campus), 2015 (Technion), 2016 (Weizmann Institute of
                Science), 2017 (College of Management) and 2018 (Tel Aviv
                University) also featured community content. Watch previous
                years' sessions to get the general feel of the Revesim Summit
                spirit.
              </IntroParagraph>
            </IntroParagraphContainer>
            <IntroParagraphContainer>
              <IntroSubHeading>Reversim podcast</IntroSubHeading>
              <IntroParagraph>
                <IntroLink href="https://twitter.com/reversim/">#reversim</IntroLink> (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and
                Ran Tavory which brings together software developers and
                product, with over 300 recorded episodes and a few thousands
                listeners.
              </IntroParagraph>
            </IntroParagraphContainer>
        </IntroTextContainer>
            
        </IntroInnerContainer>
      </IntroContainer>
      <MainContainer>
          <MainHeadingContainer>
            <Heading2>Meet the team</Heading2>
            <BreakLineMain />
          </MainHeadingContainer>
          <AboutTeam>
            {props.team.map(id => <TeamMember key={id} {...props.users[id]} />)}
          </AboutTeam>
      </MainContainer>
    </Page>
  );
};

export default AboutPage;

/**
 * style={{background: `url('${x}') no-repeat`, backgroundSize: 'cover'}}
 **/
