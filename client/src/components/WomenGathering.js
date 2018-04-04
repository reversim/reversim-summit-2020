import React from 'react';
import Page from "./Page";
import ReactMarkdown from 'react-markdown';
import {Container} from "reactstrap";
import heroImg from '../images/Women-Gathering-bg.png';

const text = "We invite all of the women who register for the summit to join us for a networking gathering for women on the first day of the summit. We will introduce ourselves and share our stories. \n\n If you want to register for the summit but have no one to come with, or have any other concerns, we invite you to join our [facebook group](https://www.facebook.com/groups/1762800823976512/). You can talk to women who participated in the past events. You can also connect with other women before the event and arrange to meet.";

const WomenGathering = (props) => (
  <Page title="Women gathering" {...props}>
		<div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`, height: 600, backgroundPosition: 'center', backgroundSize: 'cover' }}/>
		<Container className="mb-5">
			<h1 className="text-center my-5">Women Gathering</h1>
			<div className="font-size-lg">
				<ReactMarkdown source={text} />
			</div>
		</Container>
	</Page>
);

export default WomenGathering;