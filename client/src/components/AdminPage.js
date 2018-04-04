import React from 'react';
import {Button} from "reactstrap";
import Page from "./Page";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import { Container } from 'reactstrap';


const state = observable({
	value: ""
});

const AdminPage = observer(({ messages, onRemoveMessage, onAddMessage, ...props}) => {
	if (!props.user.authenticated || !props.user.isReversimTeamMember) {
		return <Page title="Admin" {...props}>
			<div>need to be authenticated as a team member</div>
		</Page>
	}

	return (
		<Page title="Admin" {...props}>
			<Container>
				<h1>Admin console</h1>
				<h2>Messages</h2>
				<div>
					<form onSubmit={(e) => {
						e.preventDefault();
						onAddMessage(state.value);
						state.value = "";
					}}>
						<input className="form-control" value={state.value} onChange={e => state.value = e.target.value}/>
						<Button>Add message</Button>
					</form>
				</div>
				<ul>
					{messages.map(msg => (
						<li key={msg._id} className="d-flex justify-content-between">
							<span>{msg.text}</span>
							<Button onClick={()=> onRemoveMessage(msg._id)}><i className="fa fa-times" /></Button>
						</li>
					))}
				</ul>
			</Container>
		</Page>
	);
});

export default AdminPage;