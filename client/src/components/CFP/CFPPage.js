import React, {Fragment} from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import cn from 'classnames';
import Page from '../Page';
import {Link} from 'react-router-dom';
import CFPTitle from './CFPTitle';
import CFPIntro from './CFPIntro';
import CFPForm from './CFPForm';
import {cfpCol} from './CFPPage.css';
import {getLoginUrl} from '../Redirect';
import {getRemainingCFPDays as _x, REVERSIM_SUMMIT} from '../../utils';

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

const CFPPage = props => {
  const {eventConfig} = props;

  return (
  <Page title="Call for papers" {...props}>
    <Fragment>
      <CFPTitle eventConfig={eventConfig}/>
      <div className="container">
        <CFPIntro />
        <BottomContent {...props} />
      </div>
    </Fragment>
  </Page>
  );
};

export default CFPPage;

//Scrape Yard:

{/**NOTE: this col wrapped the body of cfp. 
 <Col lg={{size: 10, offset: 1}} className={cn(cfpCol)}> </Col>
* style: position: relative;
* @media (min 992)
* flex: 0 0 83.33333%;
  max-width: 83.33333%; 
  margin-left: 8.33333%;
lg={{size: 10, offset: 1}}  */}