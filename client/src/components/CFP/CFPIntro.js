import React from 'react';
import styled from 'styled-components';

import {
  faChevronCircleRight,
  faCompass,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import {
  AlignCenterColumn,
  LongTextContainer,
  HeadingAligner,
  Heading3,
  Heading4,
  Heading5,
  BreakLineMain,
  Paragraph2,
  InvertedColorLink,
  Italic,
  ListItem,
  ListBolt,
  Bold,
  InvertedButtonStyledLink,
} from '../GlobalStyledComponents/ReversimStyledComps';

//styled-components section
const MainContainer = styled(AlignCenterColumn)`
  ${({ theme: { space } }) => `
    margin: ${space.xxl} auto;
    align-items: center;
  `}
`;

const SegmentContainer = styled(LongTextContainer)`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.xxl};
  `}
`;

const SegmentHeading = styled(Heading3)`
  ${({ theme: { space, color, font } }) => `
    color: ${color.text_3};
    font-size: calc(0.85 * ${font.size_h3});
    margin-bottom: ${space.m};
  `}
`;

const IntroBreakLine = styled(BreakLineMain)`
  border-width: 1px;
`;

const SubHeading = styled(Heading4)`
  ${({ theme: { color } }) => `
    color: ${color.text_3};
  `}
`;

const GeneralPagragraph = styled(Paragraph2)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
    margin-right: ${font.size_md};
  `}
`;

const IntroPagragraph = styled(GeneralPagragraph)`
  ${({ theme: { font } }) => `
    display: inline;
  `}
`;

const ListHeading = styled(Heading5)`
  ${({ theme: { color, space, font } }) => `
    margin: ${space.xl} 0 ${space.s} 0;
    font-size: calc(1.11 * ${font.size_md}); //Brings it close to 20px
    color: ${color.text_3};
  `}
`;

const TopicsList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.xl} 0 ${space.xl} ${space.l};
  `}
`;

const GuidelinesList = styled.ul`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.m};
  `}
`;

const SubList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.l} 0 ${space.m} ${space.xl};
  `}
`;

const PostmortemsHeading = styled(ListHeading)`
  ${({ theme: { space } }) => `
    margin-top: calc(-13 * ${space.m});
    padding-top: calc(15.5 * ${space.m});
  `}
`;

const IntroListItem = styled(ListItem)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_md};
  `}
`;

const SubmitButton = styled(InvertedButtonStyledLink)`
  ${({ theme: { space, font } }) => `
  width: initial;
  margin: 0 ${space.m};
  padding: ${space.l};
  height: initial;
  font-size: ${font.size_bg};
  align-self: center;
  `};
`;

//React component section

const CFPIntro = () => (
  <MainContainer>
    <SegmentContainer>
      <HeadingAligner>
        <SegmentHeading>About</SegmentHeading>
        <IntroBreakLine />
      </HeadingAligner>
      <IntroPagragraph>
        Reversim Summit is a community conference, for developers, of developers, by developers. We
        aim to present excellent, useful & inspiring content to developers and development related
        roles such as product management, development managers.
      </IntroPagragraph>
      <IntroPagragraph>
        Our 2018 summit audience consisted predominantly of engineers or engineering management
        people.
      </IntroPagragraph>
      <IntroPagragraph>
        Our speaker lineup was composed of <Italic>30% women</Italic> speakers and 70% men speakers.
      </IntroPagragraph>
      <IntroPagragraph>
        Our goal is to streamline the submission and review process, while maintaining superb
        quality. 
      </IntroPagragraph>
      <GeneralPagragraph>
        if you have any feedback or questions, please email us at {' '}
        <InvertedColorLink href="mailto:rs19team@googlegroups.com" target="_blank">rs19team@googlegroups.com</InvertedColorLink>.
      </GeneralPagragraph>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <SegmentHeading>Suggested topics</SegmentHeading>
        <IntroBreakLine />
      </HeadingAligner>
      <IntroPagragraph>
        Reversim Summit is looking for submissions on all things software development. We encourage
        and welcome deep technical submissions, as well as sessions on the surroundings of software
        development such as product management, culture and business. We prefer sessions that can
        appeal to our diverse audience. We prefer sessions based on personal experience and
        learnings. We encourage innovative and unique topics.
      </IntroPagragraph>
      <IntroPagragraph>
        General HOWTOs and 101s are discouraged. Marketing and sales pitches are unwanted, as are
        self promotion sessions in disguise.
      </IntroPagragraph>
      <GeneralPagragraph>
        Ideas for topics include, but not limited to:
      </GeneralPagragraph>
      <TopicsList>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Front end / securing websites / mobile development
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Quality / testing / monitoring / alerting / automation
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Artificial intelligence / machine learning / data science
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Data / at rest / in transit/ at scale
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Infrastructure / operations / deployments / internal tools
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Cloud / virtualization / containers / serverless
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Distributed systems / microservices / geo distribution / DR / availability
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Low level / kernel / drivers / file systems / network
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Software design / programming languages / API design / software fundamentals
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Open source projects / technical / maintainership / personal experience / culture
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Customer facing development / UX / design / product / marketing
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Culture / scaling organizations / management / motivation and employee engagement
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Education / teaching / initiatives / government
        </IntroListItem>
      </TopicsList>
      <IntroPagragraph>
        Can’t find what you were looking for? Please propose a topic which software developers will
          find to be of interest.
      </IntroPagragraph>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <SegmentHeading>Proposals</SegmentHeading>
        <IntroBreakLine />
      </HeadingAligner>
      <SubHeading>We are looking for proposals in these formats:</SubHeading>
      <ul>
        <IntroListItem>
          <ListHeading>Full Featured sessions (30 minutes)</ListHeading>
          <IntroPagragraph>Full feature are frontal presentations of roughly 30 minutes.</IntroPagragraph>
        </IntroListItem>
        <IntroListItem>
          <ListHeading>Lightning Sessions (5 minutes)</ListHeading>
          <IntroPagragraph>
            Lightning sessions are speedy 5 min sessions. They are presented in a series in which
            each presenter has exactly 20 slides, 15 sec per slide, slides are auto advanced. There
            are no breaks between lightning sessions. It's fun, it's speedy, it's concise and it's
            breathtaking :-)
          </IntroPagragraph>
        </IntroListItem>
        <IntroListItem>
          <ListHeading>Open Source in Israel (10 minutes)</ListHeading>
          <IntroPagragraph>
            We are especially interested in open source projects made in Israel or created by
            Israelis. We seek first hand developer’s experience.
          </IntroPagragraph>
        </IntroListItem>
        <IntroListItem>
          <PostmortemsHeading id='postmortems'>Postmortems (15 minutes)</PostmortemsHeading>
          <IntroPagragraph>
            Analysis of an incident or an outage at your company. Consider these questions as you
            outline your session: What happened? How did it affect your systems? How did you react?
            How was the problem mitigated? How did you analyze the incident? What were your
            takeaways? What was the followup process? Please make sure your company agrees to share
            the experience and to dive into details. Make this session professional and avoid
            personal criticism.
          </IntroPagragraph>
        </IntroListItem>
      </ul>
      <ListHeading>First time submitting? No problem!</ListHeading>
      <IntroPagragraph>
        We encourage anyone and everyone to consider submitting a session. You should be able to
        speak in front of a large audience and you should have an interesting story to tell, based
        on your professional experience.
      </IntroPagragraph>
      <IntroPagragraph>
        The moderators team will be happy to assist new speakers in turning an idea into submission,
        and to pair, followup and mentor once a proposal is accepted.
      </IntroPagragraph>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <SegmentHeading>Submission guidelines</SegmentHeading>
        <IntroBreakLine />
      </HeadingAligner>
      <GuidelinesList>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Write a clear and concise proposal. The audience should know what to expect when they step
          into your session.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Please consider some past years suggestions on what we consider to be good
          content/proposals:
          <SubList>
            <IntroListItem>
              <ListBolt icon={faChevronCircleRight} />
              Watch our team explain what makes a {' '}
              <InvertedColorLink href="https://www.youtube.com/watch?v=Da-JcEYBjuo">
                good submission
              </InvertedColorLink>
            </IntroListItem>
            <IntroListItem>
              <ListBolt icon={faChevronCircleRight} />
              Watch Adam describe {' '}
              <InvertedColorLink href="https://www.youtube.com/watch?v=F09My4646hI">
                how to submit a proposal and how we choose them
              </InvertedColorLink>
            </IntroListItem>
          </SubList>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Avoid sales, marketing pitches, or self promotion.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          The conference is held in Hebrew, and sessions should be delivered in Hebrew. If a speaker
          does not speak the language, the session will be presented in English.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />A speaker may submit up to three (3) proposals.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />A session may be presented by up to two speakers. All
          speakers <Italic>must</Italic> be indicated on submission.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Assuming your session is accepted, our moderators will be in continuous contact with you,
          and follow up on your progress.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          <Bold>
            Your cooperation is expected and may be required. Not being able to cooperate or respond
            in a timely manner may endanger your participance.
          </Bold>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          <Bold>
            You will be requested to participate in at least one dry run session. Your presentation
            at the conference may depends on that dry run. In our experience, speakers consider the
            dry run as beneficial to their presentation and personal preparation.
          </Bold>
        </IntroListItem>
      </GuidelinesList>

      <IntroPagragraph>
        To get a sense of successful submissions, please consider our previous conferences content:
      </IntroPagragraph>
      <SubList>
        <IntroListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2018.reversim.com">Reversim Summit 2018</InvertedColorLink>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2017.reversim.com">Reversim Summit 2017</InvertedColorLink>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2016.reversim.com">Reversim Summit 2016</InvertedColorLink>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2015.reversim.com">Reversim Summit 2015</InvertedColorLink>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2014.reversim.com">Reversim Summit 2014</InvertedColorLink>
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2013.reversim.com">Reversim Summit 2013</InvertedColorLink>
        </IntroListItem>
      </SubList>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <SegmentHeading>Review process</SegmentHeading>
        <IntroBreakLine />
      </HeadingAligner>
      <ul>
        <IntroListItem> 
          <ListBolt icon={faChevronRight} />
          Once the Call for Papers closes, our moderation team will begin reviewing proposals.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Reviewing is not anonymous.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          We will also hold a public vote to measure demand and interest. Results of this vote will
          remain confidential.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          Moderators may contact submitters for questions & clarifications.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          At the end of the proposal selection process, and before schedule is published, all
          submitters will be notified on their proposal status.
        </IntroListItem>
        <IntroListItem>
          <ListBolt icon={faChevronRight} />
          A few speakers may be contacted to agree to have their session waitlisted, so that they can
          be scheduled in case of another session’s last moment cancellation.
        </IntroListItem>
      </ul>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <SegmentHeading>Code of Conduct</SegmentHeading>
        <IntroBreakLine />
      </HeadingAligner>
      <IntroPagragraph>
        Proposals, presentations and attendance are subject to the {''}
        <InvertedColorLink href="http://confcodeofconduct.com/" target="_blank">Code of Conduct</InvertedColorLink>.
      </IntroPagragraph>
    </SegmentContainer>
    <SubmitButton href="/cfp/submission">Submit a New Proposal</SubmitButton>
  </MainContainer>
);

export default CFPIntro;
