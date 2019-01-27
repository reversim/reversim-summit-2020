import React from 'react';
import {REVERSIM_MAIL} from '../utils';
import {Col, Row} from 'reactstrap';

const CFPIntro = () => (
  <div className="pb-6 mb-8 border-bottom">

    <h2 className="mb-4">About</h2>
    <p>
      Reversim Summit is a community conference, for developers, of developers, by developers.
      We aim to present excellent, useful & inspiring content to developers and development related roles
      such as product management, development managers.
    </p>
    <p>
      Our goal is to streamline the submission and review process, while maintaining superb quality;
      if you have any feedback or questions, please email us at <a href="mailto:rs19team@googlegroups.com">rs19team@googlegroups.com</a>.
    </p>

    <h2 className="mb-4">Suggested topics</h2>
    <p>
      Reversim Summit is looking for submissions on all things software development.
      We encourage and welcome deep technical submissions, as well as sessions on the
      surroundings of software development such as product management, culture and business.
      We prefer sessions that can appeal to our diverse audience.
      We prefer sessions based on personal experience and learnings.
      We encourage innovative and unique topics.
    </p>
    <p>
      General HOWTOs and 101s are discouraged. Marketing and sales pitches are unwanted, as are self promotion sessions in disguise.
    </p>
    <p>
      Ideas for topics include, but not limited to:
    </p>
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
    <p>
      Can’t find what you were looking for? Please propose a topic which software developers will find to be of interest.
    </p>

    <h2 className="mb-4">Proposals</h2>
    <p>
      We are looking for proposals in these formats:
    </p>
    <ul>
      <li>
        <strong>Full Featured sessions (30 minutes)</strong>
        <br/>Full feature are frontal presentations of roughly 30 minutes.
      </li>
      <li>
        <strong>Lightning Sessions (5 minutes)</strong>
        <br/>Lightning sessions are speedy 5 min sessions.
        They are presented in a series in which each presenter has exactly 20 slides, 15 sec per slide,
        slides are auto advanced. There are no breaks between lightning sessions.
        It's fun, it's speedy, it's concise and it's breathtaking :-)
      </li>
      <li>
        <strong>Open Source in Israel (10 minutes)</strong>
        <br/>We are especially interested in open source projects made in Israel or created by Israelis.
        We seek first hand developer’s experience.
      </li>
    </ul>
    <h5>First time submitting? No problem.</h5>
    <p>
      We encourage anyone and everyone to consider submitting a session. You should be able to speak in
      front of a large audience and you should have an interesting story to tell, based on your professional experience.

      The moderators team will be happy to assist new speakers in turning an idea into submission,
      and to pair, followup and mentor once a proposal is accepted.
    </p>

    <h2 className="mb-4">Submission guidelines</h2>
    <ul>
      <li>
        Write a clear and concise proposal. The audience should know what to expect when they step into your session.
      </li>
      <li>
        Please consider some past years suggestions on what we consider to be good content/proposals:
        <ul>
          <li><a href="https://www.youtube.com/watch?v=Da-JcEYBjuo">https://www.youtube.com/watch?v=Da-JcEYBjuo</a></li>
          <li><a href="https://www.youtube.com/watch?v=F09My4646hI">https://www.youtube.com/watch?v=F09My4646hI</a></li>
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

    <p>
      To get a sense of successful submissions, please consider our previous conferences content:
    </p>
    <ul>
      <li>
        <a href="https://summit2018.reversim.com">Reversim Summit 2018</a>
      </li>
      <li>
        <a href="https://summit2017.reversim.com">Reversim Summit 2017</a>
      </li>
      <li>
        <a href="https://summit2016.reversim.com">Reversim Summit 2016</a>
      </li>
      <li>
        <a href="https://summit2015.reversim.com">Reversim Summit 2015</a>
      </li>
      <li>
        <a href="https://summit2014.reversim.com">Reversim Summit 2014</a>
      </li>
      <li>
        <a href="https://summit2013.reversim.com">Reversim Summit 2013</a>
      </li>
    </ul>

    <h2 className="mb-4">Review process</h2>
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

    <h2 className="mb-4">Code of Conduct</h2>
    <p>
      Proposals, presentations and attendance are subject to the <a href="http://confcodeofconduct.com/">Code of Conduct</a>.
    </p>
  </div>
);

export default CFPIntro;
