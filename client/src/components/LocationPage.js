import React from 'react';
import Page from "./Page";
import {Container} from "reactstrap";
import gettingThere from '../images/getting-there.png';
import Map from "./Map";

const Section = ({ title, children }) => (
	<p className="font-size-lg">
		<b className="text-underline">{title}</b><br/>{children}
	</p>
);

const LocationPage = (props) => (
	<Page title="Getting there · Reversim Summit 2017" {...props}>
		<Container>
			<h1 className="mb-5">Getting to Reversim Summit 2017</h1>
			<h2 className="mb-5 line-height-17 text-center bg-faded p-4">
				The conference will be held at:<br/>
				<a className="unstyled-link" href="https://www.google.co.il/maps/dir//31.9706184,34.7716762/@31.9703272,34.7713409,18z?hl=iw" target="_blank" rel="noopener noreferrer">
					<b>College of Management, 2 Elie Wiesel st., Rishon LeTsiyon <i className="ml-3 fa fa-external-link" style={{verticalAlign: 'middle'}}/></b>
				</a>
			</h2>
			<Section title="Parking">
				There is a large parking lot just outside the college to the service of our guests. A daily voucher costs 10ILS for the day and can be purchased onsite.
			</Section>
			<Section title="Train + Shuttle">
				You may use the train and get off at Moshe Dayan station, where our shuttle will take you to the college. The shuttle will run 8am-10am and then again 6pm-7:30pm.
			</Section>
			<Section title="Bus">
				<a href="https://www.colman.ac.il/node/6712" target="_blank">More info from the College of Management</a>
			</Section>
			<img className="img-fluid" src={gettingThere} alt="Getting to Reversim Summit 2017"/>
			<div className="my-5">
				<Map/>
			</div>
		</Container>
	</Page>
);

export default LocationPage;