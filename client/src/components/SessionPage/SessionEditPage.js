import React, {Component} from 'react';
import ga from 'react-ga';

import { getHref } from '../../utils';
import { ABSTRACT_MAX, ABSTRACT_MIN } from '../../data/proposals';
import Redirect from '../Redirect';
import SessionPageRoute from '../SessionPageRoute';

import Page from '../Page';

import ProposalForm from '../CFP/OldProposalForm';
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
      categories: props.session.categories || [], // NOTE: session's categories or empty Array
      tags: props.session.tags, // NOTE: session's tags
      proposalType: props.session.type, // NOTE: session's type
      users: props.users, //NOTE: All the website's users
      coSpeaker: props.session.speaker_ids[1] ? props.users[props.session.speaker_ids[1]].name : null,
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const { updateProposal, session } = this.props;

    const abstract = formElements.abstract.value;
    if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
      const y =
        formElements.abstract.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        150;
      window.scrollTo(0, y);
      formElements.abstract.focus();
      return;
    }

    const categories = this.state.categories;
    if (!categories.length) {
      const y =
        formElements.categories_hidden.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        750;
      window.scrollTo(0, y);
      return;
    }

    try {
      await updateProposal(session._id, this.getProposalData(formElements));
      this.props.history.push(`/session/${getHref(session)}`);
    } catch (ex) {
      ga.exception({
        description: `Error on submit: ${ex}`,
        fatal: true
      });
    }
  };

  getProposalData = formElements => {
    const title = formElements.title.value;
    const type = this.state.proposalType;
    const outline = formElements.outline.value;
    const abstract = formElements.abstract.value;
    const legal = formElements.legal.checked;
    const tags = this.state.tags;
    const categories = this.state.categories;
    const coSpeaker = this.state.coSpeaker;

    return {
      title,
      type,
      abstract,
      outline,
      tags,
      categories,
      legal,
      coSpeaker
    };
  };

  updateState = state => this.setState(state);

  render() {
    const {session, allTags, eventConfig, user} = this.props;
    const {proposalType, categories, tags} = this.state;
    const {title, outline, abstract, legal} = session;
    const coSpeaker = this.state.coSpeaker
    const {cfp} = eventConfig;
    const isAuthor = user && session.speaker_ids.includes(user._id);
    const isTeamMember = user && user.isReversimTeamMember;
    // TODO neta: fix the editing period
    const canEdit = isAuthor || isTeamMember;

    if (!canEdit) return <EditNotAllowed {...this.props} />;
    return (
      <Page title={`Edit ${session.title}`} {...this.props}>
        <div className="navbar-margin">
          <Container className="my-8">
            <Row>
              <Col sm={{ size: 8, offset: 2 }}>
                <form onSubmit={this.handleSubmit}>
                  <ProposalForm
                    update={this.updateState}
                    tags={tags}
                    proposalType={proposalType}
                    categories={categories}
                    allTags={allTags}
                    title={title}
                    outline={outline}
                    abstract={abstract}
                    legal={legal}
                    coSpeaker={coSpeaker}
                  />
                  <div className="text-center">
                    <Input type="submit" className="d-none" />
                    <Button
                      className="mr-4 styled-button btn btn-secondary"
                      // style={{ width: 120 }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </Page>
    );
  }
}

export default Redirect(SessionPageRoute(SessionEditPage));
