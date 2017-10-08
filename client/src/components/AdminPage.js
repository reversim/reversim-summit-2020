import React from 'react';

const AdminPage = (props) => {
	if (props.user.authenticated && props.user.isReversimTeamMember) {
		return <div>good</div>
	} else {
		return <div>need to be authenticated as a team member</div>
	}
};

export default AdminPage;