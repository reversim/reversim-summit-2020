import React from 'react';
import Page from './Page';
import {Container} from 'reactstrap';
// import gettingThere from '../images/getting-there.png';
import Map from './Map';
import {REVERSIM_SUMMIT} from '../utils';

// const Section = ({ title, children }) => (
// 	<p className="font-size-lg">
// 		<b className="text-underline">{title}</b><br/>{children}
// 	</p>
// );

const LocationPage = props => (
  <Page title="Getting there" {...props}>
    <Container>
      <h2 className="mb-4 text-center">Getting to <br/>{REVERSIM_SUMMIT}</h2>
      <h2 className="mb-5 line-height-17 text-center bg-faded p-4" style={{fontWeight: 600}}>
        The conference will be held at:<br />
        <a
          className="unstyled-link"
          href="https://goo.gl/maps/jCGk8t7fPPE2"
          target="_blank"
          rel="noopener noreferrer">
          <b>
            Ganei HaTaarucha
            <i className="ml-3 fa fa-external-link" style={{verticalAlign: 'middle'}} />
          </b>
        </a>
      </h2>
      {/*<Section title="Parking">
				<div style={{textDecoration:'line-through'}}>
					There is a large parking lot just outside the college to the service of our guests. A daily voucher costs 10ILS for the day and can be purchased onsite.
				</div>
			</Section>
			<Section title="Train + Shuttle">
				<div style={{textDecoration:'line-through'}}>
					You may use the train and get off at Moshe Dayan station, where our shuttle will take you to the college. The shuttle will run 8am-10am and then again 6pm-7:30pm.
				</div>
			</Section>
			<Section title="Bus">
				TBD
			</Section>*/}
      {/*<h4>*/}
        {/*<a href="http://smolarz.tau.org.il/access.html" target="_blank" rel="noopener noreferrer">*/}
          {/*More info from Tel Aviv University*/}
        {/*</a>*/}
      {/*</h4>*/}
      {/*<img*/}
        {/*className="img-fluid"*/}
        {/*src="http://smolarz.tau.org.il/images/access.gif"*/}
        {/*alt={`Getting to ${REVERSIM_SUMMIT}`}*/}
      {/*/>*/}
      <div className="my-5">
        <Map />
      </div>
    </Container>
  </Page>
);

export default LocationPage;
