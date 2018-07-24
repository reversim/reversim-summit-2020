import React from 'react';
import {REVERSIM_MAIL} from '../utils';
import {Col, Row} from 'reactstrap';

const CFPIntro = () => (
  <div className="pb-6 mb-8 border-bottom">
    <h2 className="mb-4">Intro</h2>
    <h4>Welcome to Reversim Summit and thank you for submitting your proposal!</h4>
    <p>
      We encourage everyone to submit a proposal to Reversim Summit 2018. If you are{' '}
      <i>considering</i> submitting a proposal, we invite you to do so!
    </p>
    <h5>Please read the following guidelines before submitting.</h5>
    <p>
      We are interested in all things software development, everything including: Software
      development methodologies, Product management for developers, UX, Startups, Mobile, Web,
      Devops, Data processing, Scaling, Software company culture, Tooling, etc...
    </p>
    <p>
      We want deep, technical sessions, yet ones that can be beneficial to a general audience of
      your assigned track. From our experience, the sessions that work best are ones that tell a
      story, preferably yours. We want stories which exemplify outstanding and unique work or
      learning which derive from your personal experience. Any technical improvement you achieved by
      non trivial means, that might help others improve, is worth sharing.
    </p>
    <p>To get a good sense of topics and submissions from previous conferences see:</p>
    <ul>
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
    <p className="mt-8">There are three possible session types you may submit:</p>
    <h5 className="mt-4">Full Featured sessions (30 minutes)</h5>
    <p>
      Full feature are frontal presentations of roughly 30 minutes. They will be held either in the
      large room (500 attendees) or the small room (100-200 attendees) in 3 parallel tracks.
    </p>
    <p>Full featured sessions can fall under one or more of these categories:</p>
    <Row>
      <Col xs="auto">
        <ul>
          <li>Backend, infrastructure, operations, cloud, scale</li>
          <li>Frontend, UI</li>
          <li>Mobile</li>
          <li>Quality, testing, monitoring, automation, dev methodologies, performance</li>
          <li>AI, machine learning, data science</li>
          <li>Programming, programming languages, API design, paradigms</li>
          <li>Culture, scaling organizations, management, employee engagement</li>
          <li>Customer, UX, design, marketing</li>
          <li>etc.</li>
        </ul>
      </Col>
    </Row>
    <p>
      Don't worry if you can't fit your talk with any of the above. We accept all things software.
      You will have the chance to categorize your talk as you see fit.
    </p>
    <h5 className="mt-4">Lightning Sessions (5 minutes)</h5>
    <p>
      Lightning are speedy 5 min sessions. They will be presented in a series in which each
      presenter has exactly 20 slides, 15 sec per slide, slides are auto advanced and in total 5
      min. No break b/w the sessions. It's fun, it's speedy, it's concise and it's breathtaking :-)
    </p>
    <h5 className="mt-4">Open Source in Israel (10 minutes)</h5>
    <p>
      We are especially interested in open source projects made in israel or created by Israelis.
    </p>
    <div className="mt-8 mb-4 p-3 bg-gray-200 line-height-17">
      <h5>We'd like to hear from you!</h5>
      <p>
        Our goal is to streamline the submission and review process, while maintaining superb
        quality; if you have any feedback or questions, please email us at{' '}
        <a href={`mailto:${REVERSIM_MAIL}`}>{REVERSIM_MAIL}</a>.
      </p>
    </div>
  </div>
);

export default CFPIntro;
