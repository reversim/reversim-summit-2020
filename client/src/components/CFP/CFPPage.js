import React, {Fragment} from 'react';
import Page from '../Page';
import CFPTitle from './CFPTitle';
import CFPIntro from './CFPIntro';

const CFPPage = props => {
  const {eventConfig} = props;

  return (
    <Page title="Call for papers" {...props}>
      <Fragment>
        <CFPTitle eventConfig={eventConfig} />
        <div className="container">
          <CFPIntro />
        </div>
      </Fragment>
    </Page>
  );
};

export default CFPPage;
