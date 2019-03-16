import React from "react";
import { Button } from "reactstrap";
import Page from "./Page";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Container } from "reactstrap";

const state = observable({
  votes: null
});

class AdminVotesDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {},
      votes: props.votes || null,
      ...state
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      user: (nextProps.user || {}),
      votes: nextProps.votes,
    })
  }

  componentDidMount() {
    if (!this.state.votes) {
      this.props.loadVotes();
    }
  }
  render() {
    let user = this.state.user
    let aggs = {};
    let proposals = [];
    if (this.state.votes) {
      aggs = this.state.votes.aggs;
      proposals = this.state.votes.proposals;
    }

    if (!this.state.user || !this.state.user.isReversimTeamMember) {
      return (
        <Page title="Admin" {...this.props}>
          <div className='navbar-margin'>need to be authenticated as a team member</div>
        </Page>
      );
    }

    return (
      <Page title="Admin" {...this.props}>
        <Container className='navbar-margin'>
          <h2>Votes status</h2>
          <h3>Total unique voters: {aggs.uniqueVoters}</h3>
          <h3>Total votes: {aggs.totalVotes}</h3>
          <h4>Average per voter: {aggs.averagePerVoter}</h4>
          <table>
            <tbody>
            {proposals && proposals.map(proposal => (
              <tr key={proposal._id}>
                <td>
                  <a href={`/session/${proposal._id}`}>
                    {proposal.title}
                  </a>
                </td>
                <td>{proposal.votes}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </Container>
      </Page>
    );
  }
}

export default AdminVotesDashboard;
