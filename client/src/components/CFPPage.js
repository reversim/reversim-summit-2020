import React from 'react';
import { Button, Col, Container, Input, Modal, Row } from 'reactstrap';
import cn from 'classnames';
import { getRemainingCFPDays, navigateTo, REVERSIM_SUMMIT } from '../utils';
import Page from './Page';
import { findBestMatch } from 'string-similarity';
import {
  ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR, PREDEFINED_TAGS,
  PROPOSAL_TYPES_ARR,
} from '../data/proposals';
import ga from 'react-ga';
import { daysRemaining } from './CFPPage.css';
import { Link } from 'react-router-dom';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import FormField from './FormField';
import Tags from './Tags';



const Title = () => {
  const remainingDays = getRemainingCFPDays();
  const isToday = remainingDays <= 0;
  return <div className="text-center">
    <h1 className="my-5 text-blue">{REVERSIM_SUMMIT} - Submission</h1>
    <h5 className="mb-5 text-gray-600">Read carefully before submission!</h5>
    <h5 className="text-red">
      Deadline: {isToday ? 'Today!' : 'July 20'}
    </h5>
    {!isToday &&
    <h6 className="text-gray-600"><span className={daysRemaining}>{remainingDays}</span> days
      remaining</h6>}
  </div>
};

const Intro = () => (
  <div>Intro</div>
);

const Faq = () => (
  <div>Faq</div>
);

const NonAuthenticated = () => (
  <div className="text-center">
    <hr/>
    <h6>Login with Google is required in order to submit a proposal</h6>
    <Button outline color="gray-dark">
      <a href="/auth/google">Login</a>
    </Button>
  </div>
);

const SubmissionClosed = () => (
  <h6>Call for papers is closed for submission. You can view the submitted proposals <Link to="proposals">here</Link>.</h6>
);

class SubmissionForm extends React.Component {

  state = {
    proposalType: 'full',
    abstractLen: 0,
    abstractErr: true,
    tags: [],
    newTagPending: null,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    const {
      user,
      updateUserData,
      createProposal,
    } = this.props;

    if (user) {
      const fullname = formElements.fullname.value;
      const oneLiner = formElements.oneLiner.value;
      const bio = formElements.bio.value;
      const trackRecord = formElements.trackRecord.value;
      const linkedin = formElements.linkedin.value;
      const twitter = formElements.twitter.value;
      const github = formElements.github.value;
      const phone = formElements.phone.value;

      const title = formElements.title.value;
      const proposalType = this.state.proposalType;
      const abstract = formElements.abstract.value;
      const outline = formElements.outline.value;
      const video_url = formElements.video_url.value;
      const tags = this.state.tags.map(tag => tag.text);

      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y = formElements.abstract.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      }

      try {
        await updateUserData(user._id, {
          'profile.name': fullname,
          'profile.bio': bio,
          'profile.trackRecord': trackRecord,
          'profile.linkedin': linkedin,
          'profile.twitter': twitter,
          'profile.github': github,
          'profile.oneLiner': oneLiner,
          'profile.phone': phone
        });
        const result = await createProposal(title, abstract, proposalType, [user._id], tags, outline, video_url);
        navigateTo(`/session/${result.id}`);
      } catch(ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true
        });
      }
    }
  };

  handleProposalTypeChange = (e) => {
    this.setState({ proposalType: e.target.value });
  };

  onChangeAbstract = (e) => {
    const val = e.target.value;
    const abstractLen = val.length;
    const abstractErr = val.length < ABSTRACT_MIN ? 'low' : val.length > ABSTRACT_MAX ? 'high' : null;
    this.setState({
      abstractLen,
      abstractErr
    });
  };

  onAddTag = (tag) => {
    const { tagSuggestions } = this.props;
    console.log('onaddTag', tag, tagSuggestions, PREDEFINED_TAGS);
    if (this.state.tags.map(t => t.text).indexOf(tag) > -1) {
      return;
    } else if ((tagSuggestions && tagSuggestions.indexOf(tag) === -1) && PREDEFINED_TAGS.indexOf(tag) === -1) {
      this.setState({ newTagPending: tag });
    } else {
      this.addTag(tag);
    }
  };

  addTag = (tag) => {
    let tags = this.state.tags;
    tags.push({
      id: tag,
      text: tag
    });
    this.setState({tags: tags});
  };

  onDeleteTag = (i) => {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  };


  render() {
    const { user } = this.props;
    let { tagSuggestions } = this.props;
    const { tags, proposalType, abstractErr, abstractLen, newTagPending } = this.state;
    let bestMatch, predefinedTags, tagStrs = this.state.tags.map(t => t.text);

    tagSuggestions = tagSuggestions || [];
    tagSuggestions = uniq(without(PREDEFINED_TAGS.concat(tagSuggestions), ...tagStrs));
    predefinedTags = without(PREDEFINED_TAGS, ...tagStrs);

    if (newTagPending) {
      bestMatch = findBestMatch(newTagPending, tagSuggestions).bestMatch.target;
    }

    return (
      <div>
        <h4>Submission</h4>
        <p>You may submit up to 3 proposals.</p>
        <p>Call for paper ends: <strong>{CFP_ENDS_STR}</strong>. No kidding.</p>
        <form onSubmit={this.handleSubmit} >
          <h5>About you</h5>
          <small>Tell us about yourself</small>

          <h6>Public information</h6>
          <small>The following information will be presented in the website</small>
          <FormField id="fullname" label="Full name" required={true} placeholder="Your name" value={user.name} />
          <FormField id="oneLiner" label="One Liner" value={user.oneLiner} maxLength={100} subtitle={<span>Maximum 100 characters<br/><b>Example</b>: COBOL developer at Acme Corp</span>}/>
          <FormField id="linkedin" label="Linkedin Profile" value={user.linkedin} inputType="url"/>
          <FormField id="github" label="GitHub username" value={user.github} placeholder="mrdoob"/>
          <FormField id="twitter" label="Twitter @name" value={user.twitter} placeholder="@Reversim"/>
          <FormField id="bio" label="Short Bio" value={user.bio} placeholder="" required={true} multiline={true} fullRow={true} subtitle={<span>Tell everybody a little bit about yourself. Useful sentences can be:<br/><br/>
              “A front-end developer for the last X years”<br/>
              “I work remotely, and interested in building remote teams and effective internal communication”<br/>
              “I enjoy developing and using open source code”<br/>
              “I participate in the Meetup X”<br/>
              “I have been influenced by the book ‘The Pragmatic Programmer’”<br/>
              “I have been playing with Deep Learning recently, took some online courses and eager to learn more!”<br/>
              “I am an avid wikipedia contributor”</span>}/>
          <h6>Private information</h6>
          <small>The following information will be available <b>only to the organizing committee</b></small>
          <FormField id="email" label="Email" text={user.email} required={true}/>
          <FormField id="phone" label="Phone number" required={true} placeholder="05x-xxxxxxx" value={user.phone}/>
          <FormField id="trackRecord" label="Track record as speaker" value={user.trackRecord} placeholder="" required={true} multiline={true} fullRow={true} subtitle={<span>Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)<br/><br/><b>Example:</b>
              <ul><li>&bull; ExampleCon 2017, Sweden (Keynote speaker): “Modern Fortran development with ActiveX” (45 minutes). Video: , <a target="_blank" href="https://www.youtube.com/watch?v=Nf_Y4MbUCLY" rel="noopener noreferrer">https://www.youtube.com/watch?v=Nf_Y4MbUCLY</a> slides: http://example.com/slide1</li>
                <li>&bull; EsoteriCon 2016, Tel Aviv: “How I sold my Piet program to MOMA for $20M” (20 minutes), Video: <a target="_blank" href="https://youtu.be/DGXx56WqqJw" rel="noopener noreferrer">https://youtu.be/DGXx56WqqJw</a>, slides: http://example.com/slide2</li>
                <li>&bull; Israeli LOLCODE meetup (February 2015), Tel Aviv, “Is LOLCODE Turing complete?” (5 minutes),  Video: <a target="_blank" href="https://www.youtube.com/watch?v=Wpx6XnankZ8" rel="noopener noreferrer">https://www.youtube.com/watch?v=Wpx6XnankZ8</a>, slides: http://example.com/slide3</li></ul></span>}/>
          <h5>Session proposal</h5>
          <small style={{marginBottom:24}}>Tell us about your talk</small>

          <h6>Public information</h6>
          <small>The following information will be presented in the website</small>
          <FormField id="title" label="Title" required={true} placeholder="Title of your talk" maxLength="100" subtitle={<span>Make it descriptive, concise, and appealing. You are welcome to review <a href="http://summit2016.reversim.com/#schedule" target="_blank" rel="noopener noreferrer">last year’s agenda</a>, or use the following examples:<br/><br/>
            <ul><li><i>“How we optimized micro-service utilization using machine learning”</i></li>
<li><i>“Writing on sand? Embracing CI-CD techniques in the HR team”</i></li>
<li><i>“Effective Hackathon: How to re-write a project in 24 hours and save your startup”</i></li>
              <li><i>“Cost of choosing the wrong development stack: A learn-build-measure story from the trenches”</i></li></ul>
Reversim Summit is about deep-tech, and we will reject trivial introductory talks in software-related sessions (introduction to other topics is OK).
            </span>}/>
          <FormField id="proposalType" inputType="radio" required={true} onChange={this.handleProposalTypeChange} values={PROPOSAL_TYPES_ARR} value={proposalType}/>
          <FormField id="abstract" label="Abstract" required={true} multiline={true} placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`} subtitle={<span>Markdown syntax is supported. You can edit your proposal at any given time during the CFP period.<br/><br/><b>Example:</b><br/>Building an effective micro-service architecture is a non-trivial task. At example.com, we have accumulated more than 500 different micro-services over the years, ended up with a micro-service spaghetti, long latency, and inevitably -  a broken CI/CD pipeline.
Then, we decided to remove human factor out of the equation.
In this session I will present our open-sourced package that analyzed our microservice architecture as a graph, measured the load on each server, improved server utilization by 73% and brought our CI-CD pipeline back from the dead.<br/><br/><span className={cn({'text-red': abstractErr})}>{abstractLen}/{ABSTRACT_MAX}</span></span>} fullRow={true} caption={null} onChange={this.onChangeAbstract}/>
          <Tags
            tags={tags}
            predefinedSuggestions={predefinedTags}
            suggestions={tagSuggestions}
            handleAddition={this.onAddTag}
            handleDelete={this.onDeleteTag}
            readOnly={this.state.tags.length===2} />

          <Modal isOpen={!!newTagPending} toggle={() => { this.setState({ newTagPending: null })}}>
            <div className="text-center">
              <h6>'{newTagPending}' doesn't exist</h6>
              <p>Before adding a new tag, please check if there's already an existing tag like this one.</p>
              { bestMatch ? <p>Did you mean <b>{bestMatch}</b>?</p> : undefined }
              <div>
                { bestMatch && <Button size="sm" onClick={(e) => { e.preventDefault(); this.addTag(bestMatch); this.setState({ newTagPending:null }); }}>Add <b>{bestMatch}</b></Button> }
                <Button outline size="sm" onClick={(e) => { e.preventDefault(); this.addTag(newTagPending); this.setState({ newTagPending:null }); }}>Add <b>{newTagPending}</b></Button>
              </div>
            </div>
          </Modal>

          <h6>Private information</h6>
          <small>The following information will be available <b>only to the organizing committee</b></small>
          <FormField id="video_url" label="Link to video" required={true} placeholder="e.g. http://youtu.be/xxxx" subtitle={<span><b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.<br/><b>New speakers</b>: A short video introducing you and the planned session outline. Example can be found <a href="https://www.youtube.com/watch?v=2A6cLeXLLII" target="_blank" rel="noopener noreferrer">in this video</a>.</span>} caption={null}/>
          <FormField id="outline" label="Outline" required={true} multiline={true} placeholder="" subtitle={<span>The outline should include the main subjects you intend to cover with a timing estimation and total timing. A general overview is fine, we don’t expect a per-slide description for now. <br/><br/><b>For example:</b><br/>
            &bull; 2m Introduction: Who am I and my professional background<br/>
            &bull; 5m Architectural overview: how we built 500 different micro-services over 5 years, and why we ended up supporting 15 different programming languages.<br/>
            &bull; 5m The latency math behind a micro-service call-chain, and why we had to over-provision containers to avoid a 1s response time because accumulated latency is not a normal distribution<br/>
            &bull; 15m Our solution: Measuring everything and using a managed machine-learning platform to optimize our response time and server utilization<br/>
            &bull; 5m: The open source power! How can you use our code to optimize your production system<br/>
            &bull; 5m Q&A<br/>
Total time: 37m</span>} fullRow={true} caption={null}/>

          <div className="text-center">
            <Input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }
}

const BottomContent = ({
  features: { submission },
  user,
  ...props,
}) => {
  if (!submission) return <SubmissionClosed />;
  else if (!user) return <NonAuthenticated />;
  else return <SubmissionForm user={user} {...props}/>
};

const CFPPage = (props) => (
  <Page title="Call for papers" {...props}>
    <Container>
      <Row>
        <Col>
          <Title />
          <Intro />
          <Faq />
          <BottomContent {...props} />
        </Col>
      </Row>
    </Container>
  </Page>
);

export default CFPPage;