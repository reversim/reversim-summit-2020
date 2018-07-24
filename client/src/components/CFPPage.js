import React, {Fragment} from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import cn from 'classnames';
import Page from './Page';
import {Link} from 'react-router-dom';
import CFPTitle from './CFPTitle';
import CFPIntro from './CFPIntro';
import CFPFaq from './CFPFaq';
import CFPForm from './CFPForm';
import smolarzImg from '../images/smolarz_hero.png';
import {heroImg, cfpCol} from './CFPPage.css';
import {getLoginUrl} from './Redirect';
import {getRemainingCFPDays as _x, REVERSIM_SUMMIT} from '../utils';

const NonAuthenticated = () => (
  <div className="text-center mb-6">
    <h6>Login with Google is required in order to submit a proposal</h6>
    <a href={getLoginUrl()}>
      <Button outline color="primary">
        Login
      </Button>
    </a>
  </div>
);

const SubmissionClosed = () => (
  <h6>
    Call for papers is closed for submission. You can view the submitted proposals{' '}
    <Link to="proposals">here</Link>.
  </h6>
);

const BottomContent = ({features: {submission}, user, ...props}) => {
  if (!submission) return <SubmissionClosed />;
  else if (!user) return <NonAuthenticated />;
  else return <CFPForm user={user} {...props} />;
};

const CFPBody = props => {
  const {eventConfig} = props;
  if (eventConfig.cfp) {
    return (
      <Fragment>
        <CFPTitle />
        <CFPIntro />
        <CFPFaq />
        <BottomContent {...props} />
      </Fragment>
    );
  } else {
    return <h1 className="my-5 text-primary">{REVERSIM_SUMMIT} - CFP is closed!</h1>;
  }
};

const CFPPage = props => (
  <Page title="Call for papers" {...props}>
    <div className="bg-purple">
      <div className={heroImg} style={{backgroundImage: `url('${smolarzImg}')`}} />
      <Container>
        <Row>
          <Col lg={{size: 10, offset: 1}} className={cn('bg-white', cfpCol)}>
            <CFPBody {...props} />
          </Col>
        </Row>
      </Container>
    </div>
  </Page>
);

export default CFPPage;
