import React from 'react';
import Page from "./Page";
import {Container} from "reactstrap";
import gettingThere from '../images/getting-there.png';
import Map from "./Map";

const LocationPage = (props) => (
	<Page title="Getting there · Reversim Summit 2017" {...props}>
		<Container>
			<h1 className="mb-5">Getting to Reversim Summit 2017</h1>
			<h2 className="mb-5 line-height-17 text-center bg-faded p-4">
				The conference will be held at:<br/>
				<a className="unstyled-link" href="https://www.google.co.il/maps/dir//31.9706184,34.7716762/@31.9703272,34.7713409,18z?hl=iw" target="_blank">
					<b>College of Management, 2 Elie Wiesel st., Rishon LeTsiyon <i className="ml-3 fa fa-external-link" style={{verticalAlign: 'middle'}}/></b>
				</a>
			</h2>
			<p className="font-size-lg">
				<b className="text-underline">Parking</b><br/>There is a large parking lot just outside the college to the service of our guests. A daily voucher costs 10ILS for the day and can be purchased onsite.
			</p>
			<p className="font-size-lg">
				<b className="text-underline">Public transportation</b><br/>You may use the train and get off at Moshe Dayan station, where our shuttle will take you to the college. The shuttle will run 8am-10am and then again at the end of the event.
			</p>
			<img className="img-fluid" src={gettingThere} />
			<div className="my-5">
				<Map/>
			</div>
		</Container>
	</Page>
);

export default LocationPage;