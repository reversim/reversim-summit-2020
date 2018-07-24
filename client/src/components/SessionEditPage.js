import React from 'react';
import Page from './Page';
import ga from 'react-ga';
import {Container, Row, Col, Input, Button} from 'reactstrap';
import SessionPageRoute from './SessionPageRoute';
import Redirect from './Redirect';
import ProposalForm from './ProposalForm';
import {ABSTRACT_MAX, ABSTRACT_MIN} from '../data/proposals';
import {getHref} from '../utils';

class SessionEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.session.categories || [],
      tags: props.session.tags,
      proposalType: props.session.type,
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const {updateProposal, session} = this.props;

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
        fatal: true,
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

    return {
      title,
      type,
      abstract,
      outline,
      tags,
      categories,
      legal,
    };
  };

  updateState = state => this.setState(state);

  render() {
    const {session, allTags} = this.props;
    const {proposalType, categories, tags} = this.state;
    const {title, outline, abstract, legal} = session;

    return (
      <Page title={`Edit ${session.title}`} {...this.props}>
        <Container className="my-8">
          <Row>
            <Col sm={{size: 8, offset: 2}}>
              <h1 className="my-4">
                Edit <b>{session.title}</b>
              </h1>
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
                />
                <div className="text-center">
                  <Input type="submit" className="d-none" />
                  <Button color="primary" className="mr-4" style={{width: 120}}>
                    Submit
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

export default Redirect(SessionPageRoute(SessionEditPage));
