import React from 'react';
import styled from 'styled-components';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

import {
  AlignCenterColumn,
  HeadingAligner,
  Heading2,
  Heading4,
  BreakLineMain,
  Paragraph2,
  InvertedColorLink,
  Italic,
  ListItem,
  ListBolt,
  Bold,
} from '../GlobalStyledComponents/ReversimStyledComps';
import {
  faChevronCircleRight,
  faCompass,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

//styled-components section
const MainContainer = styled(AlignCenterColumn)`
  ${({ theme: { space } }) => `
    margin: ${space.xxl} auto;
    align-items: flex-start;
  `}
`;

const SegmentContainer = styled.div`
  ${({ theme: { space } }) => `
    width: 100%;
    margin-bottom: ${space.xxl};
  `}
`;

const SubHeading = styled(Heading4)`
  ${({ theme: { color } }) => `
    color: ${color.text_3};
  `}
`;

const ListHeading = styled(Heading4)`
  ${({ theme: { color, space, font } }) => `
    margin: ${space.xl} 0 ${space.s} 0;
    font-size: ${font.size_md};
    color: ${color.text_3};
  `}
`;

const TopicsList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0 ${space.m} ${space.m};
  `}
`;

const GuidelinesList = styled.ul`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.m};
  `}
`;

const SubList = styled.ul`
  ${({ theme: { space } }) => `
    margin-left: ${space.xl};
  `}
`;

const BottomLine = styled(BreakLineMain)`
  ${({ theme: { space } }) => `
    width: 100%;
    margin: ${space.xxl} 0;
    `}
      ${mediaQueryMin.s`
        margin-left: 0;
      `}
`;

//React component section

const CFPIntro = () => (
  <MainContainer>
    <SegmentContainer>
      <HeadingAligner>
        <Heading2>About</Heading2>
        <BreakLineMain />
      </HeadingAligner>
      <Paragraph2>
        Reversim Summit is a community conference, for developers, of developers, by developers. We
        aim to present excellent, useful & inspiring content to developers and development related
        roles such as product management, development managers.
      </Paragraph2>
      <Paragraph2>
        Our 2018 summit audience consisted predominantly of engineers or engineering management
        people.
      </Paragraph2>
      <Paragraph2>
        Our speaker lineup was composed of <Italic>30% women</Italic> speakers and 70% men speakers.
      </Paragraph2>
      <Paragraph2>
        Our goal is to streamline the submission and review process, while maintaining superb
        quality; if you have any feedback or questions, please email us at
        <InvertedColorLink href="mailto:rs19team@googlegroups.com">
          rs19team@googlegroups.com
        </InvertedColorLink>
        . {/*DO NOT DELETE this dot, it's the ending of the scentance above */}
      </Paragraph2>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <Heading2>Suggested topics</Heading2>
        <BreakLineMain />
      </HeadingAligner>
      <Paragraph2>
        Reversim Summit is looking for submissions on all things software development.We encourage
        and welcome deep technical submissions, as well as sessions on the surroundings of software
        development such as product management, culture and business. We prefer sessions that can
        appeal to our diverse audience. We prefer sessions based on personal experience and
        learnings. We encourage innovative and unique topics.
      </Paragraph2>
      <Paragraph2>
        General HOWTOs and 101s are discouraged. Marketing and sales pitches are unwanted, as are
        self promotion sessions in disguise.
      </Paragraph2>
      <Paragraph2>
        Ideas for topics include, but not limited to:
      </Paragraph2>
      <TopicsList>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Front end / securing websites / mobile development
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Quality / testing / monitoring / alerting / automation
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Artificial intelligence / machine learning / data science
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Data / at rest / in transit/ at scale
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Infrastructure / operations / deployments / internal tools
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Cloud / virtualization / containers / serverless
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Distributed systems / microservices / geo distribution / DR / availability
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Low level / kernel / drivers / file systems / network
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Software design / programming languages / API design / software fundamentals
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Open source projects / technical / maintainership / personal experience / culture
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Customer facing development / UX / design / product / marketing
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Culture / scaling organizations / management / motivation and employee engagement
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Education / teaching / initiatives / government
        </ListItem>
      </TopicsList>
      <Paragraph2>
        Can’t find what you were looking for? Please propose a topic which software developers will
          find to be of interest.
      </Paragraph2>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <Heading2>Proposals</Heading2>
        <BreakLineMain />
      </HeadingAligner>
      <SubHeading>We are looking for proposals in these formats:</SubHeading>
      <ul>
        <ListItem>
          <ListHeading>Full Featured sessions (30 minutes)</ListHeading>
          <Paragraph2>Full feature are frontal presentations of roughly 30 minutes.</Paragraph2>
        </ListItem>
        <ListItem>
          <ListHeading>Lightning Sessions (5 minutes)</ListHeading>
          <Paragraph2>
            Lightning sessions are speedy 5 min sessions. They are presented in a series in which
            each presenter has exactly 20 slides, 15 sec per slide, slides are auto advanced. There
            are no breaks between lightning sessions. It's fun, it's speedy, it's concise and it's
            breathtaking :-)
          </Paragraph2>
        </ListItem>
        <ListItem>
          <ListHeading>Open Source in Israel (10 minutes)</ListHeading>
          <Paragraph2>
            We are especially interested in open source projects made in Israel or created by
            Israelis. We seek first hand developer’s experience.
          </Paragraph2>
        </ListItem>
        <ListItem>
          <ListHeading>Postmortems (15 minutes)</ListHeading>
          <Paragraph2>
            Analysis of an incident or an outage at your company. Consider these questions as you
            outline your session: What happened? How did it affect your systems? How did you react?
            How was the problem mitigated? How did you analyze the incident? What were your
            takeaways? What was the followup process? Please make sure your company agrees to share
            the experience and to dive into details. Make this session professional and avoid
            personal criticism.
          </Paragraph2>
        </ListItem>
      </ul>
      <ListHeading>First time submitting? No problem!</ListHeading>
      <Paragraph2>
        We encourage anyone and everyone to consider submitting a session. You should be able to
        speak in front of a large audience and you should have an interesting story to tell, based
        on your professional experience.
      </Paragraph2>
      <Paragraph2>
        The moderators team will be happy to assist new speakers in turning an idea into submission,
        and to pair, followup and mentor once a proposal is accepted.
      </Paragraph2>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <Heading2>Submission guidelines</Heading2>
        <BreakLineMain />
      </HeadingAligner>
      <GuidelinesList>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Write a clear and concise proposal. The audience should know what to expect when they step
          into your session.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Please consider some past years suggestions on what we consider to be good
          content/proposals:
          <SubList>
            <ListItem>
              <ListBolt icon={faChevronCircleRight} />
              Watch our team explain what makes a
              <InvertedColorLink href="https://www.youtube.com/watch?v=Da-JcEYBjuo">
                good submission
              </InvertedColorLink>
            </ListItem>
            <ListItem>
              <ListBolt icon={faChevronCircleRight} />
              Watch Adam describe
              <InvertedColorLink href="https://www.youtube.com/watch?v=F09My4646hI">
                how to submit a proposal and how we choose them
              </InvertedColorLink>
            </ListItem>
          </SubList>
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Avoid sales, marketing pitches, or self promotion.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          The conference is held in Hebrew, and sessions should be delivered in Hebrew. If a speaker
          does not speak the language, the session will be presented in English.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />A speaker may submit up to three (3) proposals.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />A session may be presented by up to two speakers. All
          speakers <Italic>must</Italic> be indicated on submission.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Assuming your session is accepted, our moderators will be in continuous contact with you,
          and follow up on your progress.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          <Bold>
            Your cooperation is expected and may be required. Not being able to cooperate or respond
            in a timely manner may endanger your participance.
          </Bold>
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          <Bold>
            You will be requested to participate in at least one dry run session. Your presentation
            at the conference may depends on that dry run. In our experience, speakers consider the
            dry run as beneficial to their presentation and personal preparation.
          </Bold>
        </ListItem>
      </GuidelinesList>

      <Paragraph2>
        To get a sense of successful submissions, please consider our previous conferences content:
      </Paragraph2>
      <SubList>
        <ListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2018.reversim.com">Reversim Summit 2018</InvertedColorLink>
        </ListItem>
        <ListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2017.reversim.com">Reversim Summit 2017</InvertedColorLink>
        </ListItem>
        <ListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2016.reversim.com">Reversim Summit 2016</InvertedColorLink>
        </ListItem>
        <ListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2015.reversim.com">Reversim Summit 2015</InvertedColorLink>
        </ListItem>
        <ListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2014.reversim.com">Reversim Summit 2014</InvertedColorLink>
        </ListItem>
        <ListItem>
          <ListBolt icon={faCompass} />
          <InvertedColorLink href="https://summit2013.reversim.com">Reversim Summit 2013</InvertedColorLink>
        </ListItem>
      </SubList>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <Heading2>Review process</Heading2>
        <BreakLineMain />
      </HeadingAligner>
      <ul>
        <ListItem> 
          <ListBolt icon={faChevronRight} />
          Once the Call for Papers closes, our moderation team will begin reviewing proposals.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Reviewing is not anonymous.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          We will also hold a public vote to measure demand and interest. Results of this vote will
          remain confidential.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          Moderators may contact submitters for questions & clarifications.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          At the end of the proposal selection process, and before schedule is published, all
          submitters will be notified on their proposal status.
        </ListItem>
        <ListItem>
          <ListBolt icon={faChevronRight} />
          A few speakers may be contacted to agree to have their session waitlisted, so that they can
          be scheduled in case of another session’s last moment cancellation.
        </ListItem>
      </ul>
    </SegmentContainer>

    <SegmentContainer>
      <HeadingAligner>
        <Heading2>Code of Conduct</Heading2>
        <BreakLineMain />
      </HeadingAligner>
      <Paragraph2>
        Proposals, presentations and attendance are subject to the
        <InvertedColorLink href="http://confcodeofconduct.com/">Code of Conduct</InvertedColorLink>.
      </Paragraph2>
    </SegmentContainer>
    <BottomLine />
  </MainContainer>
);

export default CFPIntro;
