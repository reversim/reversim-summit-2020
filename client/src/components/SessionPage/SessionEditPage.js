import React, {Component} from 'react';
import ga from 'react-ga';

import { getHref } from '../../utils';
import { ABSTRACT_MAX, ABSTRACT_MIN } from '../../data/proposals';
import Redirect from '../Redirect';
import SessionPageRoute from '../SessionPageRoute';

import Page from '../Page';

import EditProposalForm from './EditProposalForm';
import { Container, Row, Col, Input, Button } from 'reactstrap';


// React Components
const EditNotAllowed = props => (
    <Page title={`Edit ${props.session.title}`} {...props}>
      <div className='navbar-margin'>
      <Container>
        <Row>
          <Col>
            <h2 className="text-center my-12">Editing is over</h2>
            <h3 className="text-center my-12">If you really have to, contact us at <a href="mailto:rs20team@googlegroups.com">rs20team@googlegroups.com</a></h3>
          </Col>
        </Row>
      </Container>
    </div>
    </Page>
);

class SessionEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.session.categories || [],
      tags: props.session.tags,
      proposalType: props.session.type,
      users: props.users,
      speaker: props.user,
      coSpeaker: props.session.speaker_ids[1] ? props.users[props.session.speaker_ids[1]] : null,
      ossilProject: props.session.ossilProject,
    };
  }

  render() {
    const {session, allTags, user, updateProposal} = this.props;
    const {proposalType, categories, tags} = this.state;
    const {title, outline, abstract, legal} = session;
    const coSpeaker = this.state.coSpeaker;
    const isAuthor = user && session.speaker_ids.includes(user._id);
    const isTeamMember = user && user.isReversimTeamMember;
    const canEdit = isAuthor || isTeamMember;

    if (!canEdit) return <EditNotAllowed {...this.props} />;
    return (
      <Page title={`Edit ${session.title}`} {...this.props}>
        <div className="navbar-margin">
          <Container className="my-8">
            <Row>
              <Col sm={{ size: 8, offset: 2 }}>
                <EditProposalForm
                  session={session}
                  tags={tags}
                  proposalType={proposalType}
                  categories={categories}
                  allTags={allTags}
                  title={title}
                  outline={outline}
                  abstract={abstract}
                  speaker={this.state.speaker}
                  coSpeaker={coSpeaker}
                  updateProposal={updateProposal}
                  history={this.props.history}
                  />
              </Col>
            </Row>
          </Container>
        </div>
      </Page>
    );
  }
}

export default Redirect(SessionPageRoute(SessionEditPage));
