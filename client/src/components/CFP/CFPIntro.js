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
} from '../GlobalStyledComponents/ReversimStyledComps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleRight,
  faCompass,
} from '@fortawesome/free-solid-svg-icons';


//styled-components section
const MainContainer = styled(AlignCenterColumn)`
  ${({ theme: { space } }) => `
    margin: ${space.xxl} auto;
    align-items: flex-start;
  `}
`
const Italic = styled.span`
  font-style: italic;
`; 
/*
The above component (Italic) is needed to override the problematic reset file in:
/home/yariv/Projects/reversim/client/node_modules/styled-reset/lib/index.js

It assigns <em> with "font-style: inherit" which does not let it be 'italic'.
Tried to change it in the file on line 21 (i.e. deleted '.em') but it had no effect on the text.
*/

const SubHeading = styled(Heading4)`
  ${({ theme: { color } }) => `
    color: ${color.text_3};
  `}
`
const ListHeading = styled(Heading4)`
  ${({ theme: { color, space, font } }) => `
    margin: ${space.xl} 0 ${space.s} 0;
    font-size: ${font.size_md};
    color: ${color.text_3};
  `}
`

const DecorationIcon = styled(FontAwesomeIcon)`
 ${({theme: { space, color }}) =>`
  margin-right: ${space.m};
  color: ${color.font_awsome_watch};
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
`
//React component section

const CFPIntro = () => (
  <MainContainer>
    <HeadingAligner>
      <Heading2>About</Heading2>
      <BreakLineMain />
    </HeadingAligner>
    <Paragraph2>
      Reversim Summit is a community conference, for developers, of developers, by developers.
      We aim to present excellent, useful & inspiring content to developers and development related roles
      such as product management, development managers.
    </Paragraph2>
    <Paragraph2>
      Our 2018 summit audience consisted predominantly of engineers or engineering management people.
    </Paragraph2>
    <Paragraph2>
      Our speaker lineup was composed of <Italic>30% women</Italic> speakers and 70% men speakers.
    </Paragraph2>
    <Paragraph2>
      Our goal is to streamline the submission and review process, while maintaining superb quality;
      if you have any feedback or questions, please email us at <InvertedColorLink href="mailto:rs19team@googlegroups.com">rs19team@googlegroups.com</InvertedColorLink>.
    </Paragraph2>

    <HeadingAligner>
      <Heading2>Suggested topics</Heading2>
      <BreakLineMain />
    </HeadingAligner>
    <Paragraph2>
      Reversim Summit is looking for submissions on all things software development.
      We encourage and welcome deep technical submissions, as well as sessions on the
      surroundings of software development such as product management, culture and business.
      We prefer sessions that can appeal to our diverse audience.
      We prefer sessions based on personal experience and learnings.
      We encourage innovative and unique topics.
    </Paragraph2>
    <Paragraph2>
      General HOWTOs and 101s are discouraged. Marketing and sales pitches are unwanted, as are self promotion sessions in disguise.
    </Paragraph2>
    <Paragraph2>
      Ideas for topics include, but not limited to:
    </Paragraph2>
    <ul>
      <li>Front end / securing websites / mobile development</li>
      <li>Quality / testing / monitoring / alerting / automation</li>
      <li>Artificial intelligence / machine learning / data science</li>
      <li>Data / at rest / in transit</li>
      <li>Infrastructure / operations / deployments / internal tools</li>
      <li>Cloud / virtualization / containers / serverless</li>
      <li>Distributed systems / microservices / geo distribution / DR / availability</li>
      <li>Low level / kernel / drivers / file systems / network</li>
      <li>Software design / programming languages / API design / software fundamentals</li>
      <li>Open source projects / technical / maintainership / personal experience / culture</li>
      <li>Customer facing development / UX / design / product / marketing</li>
      <li>Culture / scaling organizations / management / motivation and employee engagement</li>
      <li>Education / teaching / initiatives / government</li>
    </ul>
    <Paragraph2>
      Can’t find what you were looking for? Please propose a topic which software developers will find to be of interest.
    </Paragraph2>

    <HeadingAligner>
      <Heading2>Proposals</Heading2>
      <BreakLineMain />
    </HeadingAligner>
    <SubHeading>
      We are looking for proposals in these formats:
    </SubHeading>
    <ul>
      <li>
        <ListHeading>Full Featured sessions (30 minutes)</ListHeading>
        <Paragraph2>Full feature are frontal presentations of roughly 30 minutes.</Paragraph2>
      </li>
      <li>
        <ListHeading>Postmortems (15 minutes)</ListHeading>
        <Paragraph2>
          Analysis of an incident or an outage at your company.
          Consider these questions as you outline your session: What happened? How did it affect your systems? How did you react?
          How was the problem mitigated? How did you analyze the incident? What were your takeaways? What was the followup process?
          Please make sure your company agrees to share the experience and to dive into details.
          Make this session professional and avoid personal criticism.
        </Paragraph2>
      </li>
      <li>
        <ListHeading>Lightning Sessions (5 minutes)</ListHeading>
        <Paragraph2>
          Lightning sessions are speedy 5 min sessions.
          They are presented in a series in which each presenter has exactly 20 slides, 15 sec per slide,
          slides are auto advanced. There are no breaks between lightning sessions.
          It's fun, it's speedy, it's concise and it's breathtaking :-)
        </Paragraph2>
      </li>
      <li>
        <ListHeading>Open Source in Israel (10 minutes)</ListHeading>
        <Paragraph2>
          We are especially interested in open source projects made in Israel or created by Israelis.
          We seek first hand developer’s experience.
        </Paragraph2>
      </li>
    </ul>
    <ListHeading>First time submitting? No problem.</ListHeading>
    <Paragraph2>
      We encourage anyone and everyone to consider submitting a session. You should be able to speak in
      front of a large audience and you should have an interesting story to tell, based on your professional experience.
    </Paragraph2>
    <Paragraph2>
      The moderators team will be happy to assist new speakers in turning an idea into submission,
      and to pair, followup and mentor once a proposal is accepted.
    </Paragraph2>

    <HeadingAligner>
      <Heading2>Submission guidelines</Heading2>
      <BreakLineMain />
    </HeadingAligner>
    <ul>
      <li>
        Write a clear and concise proposal. The audience should know what to expect when they step into your session.
      </li>
      <li>
        Please consider some past years suggestions on what we consider to be good content/proposals:
        <ul>
          <li>
            <DecorationIcon
              icon={faChevronCircleRight}
            />
              Watch out team explain what makes a <InvertedColorLink href="https://www.youtube.com/watch?v=Da-JcEYBjuo">good submission</InvertedColorLink>
          </li>
          <li>
            <DecorationIcon
              icon={faChevronCircleRight}
            />
            Watch Adam describe <InvertedColorLink href="https://www.youtube.com/watch?v=F09My4646hI">how to submit a proposal and how we choose them</InvertedColorLink>
          </li>
        </ul>
      </li>
      <li>
        Avoid sales, marketing pitches, or self promotion.
      </li>
      <li>
        The conference is held in Hebrew, and sessions should be delivered in Hebrew. If a speaker does not speak the language, the session will be presented in English.
      </li>
      <li>
        A speaker may submit up to three (3) proposals.
      </li>
      <li>
        A session may be presented by up to two speakers. All speakers must be indicated on submission.
      </li>
      <li>
        Assuming your session is accepted, our moderators will be in continuous contact with you, and follow up on your progress. Your cooperation is expected and may be required.
        Not being able to cooperate or respond in a timely manner may endanger your participance.
      </li>
      <li>
        You will be requested to participate in at least one dry run session.
        Your presentation at the conference may depend on that dry run.
        In our experience, speakers consider the dry run as beneficial to their presentation and personal preparation.
      </li>
    </ul>

    <Paragraph2>
      To get a sense of successful submissions, please consider our previous conferences content:
    </Paragraph2>
    <ul>
      <li>
        <DecorationIcon
          icon={faCompass}
        />
        <InvertedColorLink href="https://summit2018.reversim.com">Reversim Summit 2018</InvertedColorLink>
      </li>
      <li>
        <DecorationIcon
          icon={faCompass}
        />
        <InvertedColorLink href="https://summit2017.reversim.com">Reversim Summit 2017</InvertedColorLink>
      </li>
      <li>
        <DecorationIcon
          icon={faCompass}
        />
        <InvertedColorLink href="https://summit2016.reversim.com">Reversim Summit 2016</InvertedColorLink>
      </li>
      <li>
        <DecorationIcon
          icon={faCompass}
        />
        <InvertedColorLink href="https://summit2015.reversim.com">Reversim Summit 2015</InvertedColorLink>
      </li>
      <li>
        <DecorationIcon
          icon={faCompass}
        />
        <InvertedColorLink href="https://summit2014.reversim.com">Reversim Summit 2014</InvertedColorLink>
      </li>
      <li>
        <DecorationIcon
          icon={faCompass}
        />
        <InvertedColorLink href="https://summit2013.reversim.com">Reversim Summit 2013</InvertedColorLink>
      </li>
    </ul>

    <HeadingAligner>
      <Heading2>Review process</Heading2>
      <BreakLineMain />
    </HeadingAligner>
    <ul>
      <li>
        Once the Call for Papers closes, our moderation team will begin reviewing proposals.
      </li>
      <li>
        Reviewing is not anonymous.
      </li>
      <li>
        We will also hold a public vote to measure demand and interest. Results of this vote will remain confidential.
      </li>
      <li>
        Moderators may contact submitters for questions & clarifications.
      </li>
      <li>
        At the end of the proposal selection process, and before schedule is published, all submitters will be notified on their proposal status.
      </li>
      <li>
        A few speakers may be contacted to agree to have their session waitlisted, so that they can be scheduled in case of another session’s last moment cancellation.
      </li>
    </ul>

    <HeadingAligner>
      <Heading2>Code of Conduct</Heading2>
      <BreakLineMain />
    </HeadingAligner>
    <Paragraph2>
      Proposals, presentations and attendance are subject to the <InvertedColorLink href="http://confcodeofconduct.com/">Code of Conduct</InvertedColorLink>.
    </Paragraph2>
    <BottomLine />
  </MainContainer>
);

export default CFPIntro;
