import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BaseLayout from 'containers/BaseLayout';
import {createProposal, fetchTags} from 'actions/proposals';
import { push } from 'react-router-redux';
import { findBestMatch } from 'string-similarity';
import {updateUser} from 'actions/users';
import ga from 'react-ga';
import features from 'features';
import FormField from 'components/FormField';
import Tags from 'components/Tags';
import Rodal from 'components/Rodal';
import _ from 'lodash';


import { cx } from 'css/styles';

const PREDEFINED_TAGS = [
  'Frontend',
  'Backend',
  'Mobile',
  'Infrastructure',
  'Product',
  'Culture'
];

const ABSTRACT_MAX=700;
const ABSTRACT_MIN=280;

const Title = (props) => {
  return (
    <div className={cx('align-center')}>
      <span data-icon className={cx('icon', 'section-icon', 'icon-multimedia-12')}></span>
      <h3>Reversim Summit 2016 - Submission</h3>
      <p className={cx("text-alt")} style={{ margin: 20}}>{ features('submission', false) ? 'Read carefully before submission!' : 'Call for papers is now closed' }</p>
    </div>
  )
};

const Topics = (props) => {
  return (
    <div>
      <h4>Topics</h4>
      <div className={cx("row")} style={{marginBottom:20}}>
        <div className={cx("col-md-6")}>
          <p>We've made a video for you to understand better what we're after. At the end of the video there's also an <b>example submission</b>.</p>
        </div>
        <div className={cx("col-md-5")}>
          <div className={cx('video-wrapper')}>
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/2A6cLeXLLII" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </div>
      <p>You may also get a good sense of the topics we're interested in by looking into previous events:</p>
      <ul>
        <li><a href="http://summit2013.reversim.com">Reversim Summit 2013</a></li>
        <li><a href="http://summit2014.reversim.com">Reversim Summit 2014</a></li>
        <li><a href="http://summit2015.reversim.com">Reversim Summit 2015</a></li>
        <li><a href="http://summit2016.reversim.com">Reversim Summit 2016</a></li>
      </ul>
      <p>Apart from that, here's a good grocery list of topics just to give you ideas. We are interested in everything including:</p>
      <div className={cx('container')}>
        <ul className={cx('with-bullets', 'col-md-4')}>
          <li>Software development</li>
          <li>Product management</li>
          <li>UX</li>
          <li>Startups</li>
          <li>Mobile</li>
          <li>Web</li>
        </ul>
        <ul className={cx('with-bullets', 'col-md-4')}>
          <li>Devops</li>
          <li>Data processing</li>
          <li>Scaling</li>
          <li>Software company culture</li>
          <li>Tooling</li>
        </ul>
      </div>

      <p>There is no predefined list of topics, if you’d like to speak about something interesting, we want it!</p>
      <p>We do not set out with a predefined list of tracks. We would like to leave the topics (tracks) open and only after accepting the submissions we will split the sessions into tracks, but we shall not rule out a single good session just b/c it's not a natural fit to any of the predefined list, so don't worry so much about categorizing your submissions.</p>
      <p>Generally speaking - we are not looking for “intro to something software” or “something software 101”. We’re looking for something of greater depth. However, we are open to session “intro to something that isn’t software”, as long is this something is of general interest, for example “intro to moonwalking and breakdance”</p>
      <p>We are looking for deep, hard-core technical sessions which exemplify outstanding and unique work or learnings which derive from your personal experience.</p>
      <br /><p>There are three possible session types you may submit:</p>

      <h6>Full Featured sessions (30-40 minutes)</h6>
      <p>Full feature are frontal presentations b/w 30 - 40 minutes. They will be held either in the large room (500 attendees) or the small room (200 attendees) in two parallel tracks.</p>
      <br />
      <h6>Lightning Sessions (5 minutes)</h6>
      <p>Lightning are speedy 5 min sessions. They will be presented in a series in which each presenter has exactly 20 slides, 15 sec per slide, slides are auto advanced and in total 5 min. No break b/w the sessions. It's fun, it's speedy, it's concise and it's breathtaking :-)</p>
      <br />
      <h6>Open Source in Israel (10 minutes)</h6>
      <p>We are especially interested in open source projects made in israel or created by Israelis. We will have a special stage for that.</p>
    </div>
  )
};

const Faq = (props) => {
  return (
    <div style={{marginTop: 40}}>
      <h4>FAQ</h4>
      <span className={cx('h7')}>What Language?</span>
      <p>C. Just kidding. The default language is Hebrew. This is not an international event, it's a local event for local developers and by local developers. There are awesome developers here in Israel. Having said that, if you as a speaker would prefer to speak in English that's totally fine.</p>
      <p>Non-Hebrew speakers are most welcome, but bear in mind that most of the contents is going to be in Hebrew.</p>
      <br />
      <span className={cx('h7')}>Submitters’ perks</span>
      <p>Registration will open about a month before the event. If you've registered on time, all is well. If not, <strong>every submitter gets a single personal ticket</strong>, regardless of whether your session got accepted or not (assuming quality submission). <strong>Accepted speakers get a personal ticket +1</strong> (so you can do a friend a favor)</p>
    </div>
  )
};

class Submit extends Component {

    static need = [
      fetchTags
    ];

    constructor(props) {
        super(props);

        this.state = {
          proposalType: 'full',
          abstractLen: 0,
          abstractErr: true,
          tags: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
        this.onChangeAbstract = this.onChangeAbstract.bind(this);
        this.onAddTag = this.onAddTag.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
    }

    handleProposalTypeChange(event) {
      this.setState({ proposalType: event.target.value });
    }

    handleSubmit(event) {
      event.preventDefault();
      const formElements = event.target.elements;

      const { dispatch, user: { authenticated, id } } = this.props;

      if (authenticated) {
        const fullname = formElements.fullname.value;
        const oneLiner = formElements.oneLiner.value;
        const bio = formElements.bio.value;
        const trackRecord = formElements.trackRecord.value;
        const linkedin = formElements.linkedin.value;
        const twitter = formElements.twitter.value;

        const title = formElements.title.value;
        const proposalType = this.state.proposalType;
        const abstract = formElements.abstract.value;
        const tags = this.state.tags.map(tag => tag.text);

        if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
          const y = formElements.abstract.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 150;
          window.scrollTo(0, y);
          formElements.abstract.focus();
          return;
        }

        dispatch(updateUser({
          'profile.name': fullname,
          'profile.bio': bio,
          'profile.trackRecord': trackRecord,
          'profile.linkedin': linkedin,
          'profile.twitter': twitter,
          'profile.oneLiner': oneLiner
        }))
        .then(() => dispatch(createProposal(title, abstract, proposalType, [id], tags)))
        .then((result) => dispatch(push(`/session/${result.id}`)))
        .catch(e => ga.exception({
          description: `Error on submit: ${e}`,
          fatal: true
        }));
      }
    }

    onChangeAbstract(e) {
      const val = e.target.value;
      const abstractLen = val.length;
      const abstractErr = val.length < ABSTRACT_MIN ? 'low' : val.length > ABSTRACT_MAX ? 'high' : null;
      this.setState({
        abstractLen,
        abstractErr
      });
    }

    onAddTag(tag) {
      const { tagSuggestions } = this.props;
      if (this.state.tags.map(t => t.text).indexOf(tag) > -1) {
        return;
      } else if ((tagSuggestions && tagSuggestions.indexOf(tag) === -1) && PREDEFINED_TAGS.indexOf(tag) === -1) {
        this.setState({ newTagPending: tag });
      } else {
        this.addTag(tag);
      }
    }

    addTag(tag) {
      let tags = this.state.tags;
      tags.push({
        id: tag,
        text: tag
      });
      this.setState({tags: tags});
    }

    onDeleteTag(i) {
      let tags = this.state.tags;
      tags.splice(i, 1);
      this.setState({tags: tags});
    }

    renderSubmissionForm() {
      const { user } = this.props;
      let { tagSuggestions } = this.props;
      const { tags, proposalType, abstractErr, abstractLen, newTagPending } = this.state;
      let bestMatch, predefinedTags, tagStrs = this.state.tags.map(t => t.text);

      tagSuggestions = tagSuggestions || [];
      tagSuggestions = _.uniq(_.without(PREDEFINED_TAGS.concat(tagSuggestions), ...tagStrs));
      predefinedTags = _.without(PREDEFINED_TAGS, ...tagStrs);

      if (newTagPending) {
        bestMatch = findBestMatch(newTagPending, tagSuggestions).bestMatch.target;
      }

      const proposalTypes = [
        { value: "full", text: "Full Featured (30-40 min.)" },
        { value: "lightning", text: "Lightning Talk (5 min.)" },
        { value: "ossil", text: "Open Source in Israel (10 min.)"}
      ];

      return (
        <div style={{marginTop: 40}}>
          <h4>Submission</h4>
          <p>You may submit up to 3 proposals.</p>
          <p>Call for paper ends: <strong>July 20th midnight UTC</strong>. No kidding.</p>
          <form onSubmit={this.handleSubmit.bind(this)} >
            <h5>About you</h5>
            <small>Tell us about yourself</small>

            <h6>Public information</h6>
            <small>The following information will be presented in the website</small>
            <FormField id="fullname" label="Full name" required={true} placeholder="Your name" value={user.name} />
            <FormField id="oneLiner" label="One Liner" value={user.oneLiner} maxLength={100} subtitle={<span>Maximum 100 characters<br/><b>Example</b>: COBOL developer at Acme Corp</span>}/>
            <FormField id="linkedin" label="Linkedin Profile" value={user.linkedin} inputType="url"/>
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
              <ul><li>&bull; ExampleCon 2017, Sweden (Keynote speaker): “Modern Fortran development with ActiveX” (45 minutes). Video: , <a target="_blank" href="https://www.youtube.com/watch?v=Nf_Y4MbUCLY">https://www.youtube.com/watch?v=Nf_Y4MbUCLY</a> slides: http://example.com/slide1</li>
                <li>&bull; EsoteriCon 2016, Tel Aviv: “How I sold my Piet program to MOMA for $20M” (20 minutes), Video: <a target="_blank" href="https://youtu.be/DGXx56WqqJw">https://youtu.be/DGXx56WqqJw</a>, slides: http://example.com/slide2</li>
                <li>&bull; Israeli LOLCODE meetup (February 2015), Tel Aviv, “Is LOLCODE Turing complete?” (5 minutes),  Video: <a target="_blank" href="https://www.youtube.com/watch?v=Wpx6XnankZ8">https://www.youtube.com/watch?v=Wpx6XnankZ8</a>, slides: http://example.com/slide3</li></ul></span>}/>
            <h5>Session proposal</h5>
            <small style={{marginBottom:24}}>Tell us about your talk</small>

            <h6>Public information</h6>
            <small>The following information will be presented in the website</small>
            <FormField id="title" label="Title" required={true} placeholder="Title of your talk" maxLength="100" subtitle={<span>Make it descriptive, concise, and appealing. You are welcome to review <a href="http://summit2016.reversim.com/#schedule" target="_blank">last year’s agenda</a>, or use the following examples:<br/><br/>
            <ul><li><i>“How we optimized micro-service utilization using machine learning”</i></li>
<li><i>“Writing on sand? Embracing CI-CD techniques in the HR team”</i></li>
<li><i>“Effective Hackathon: How to re-write a project in 24 hours and save your startup”</i></li>
              <li><i>“Cost of choosing the wrong development stack: A learn-build-measure story from the trenches”</i></li></ul>

Reversim Summit is about deep-tech, and we will reject trivial introductory talks in software-related sessions (introduction to other topics is OK).
            </span>}/>
            <FormField id="proposalType" inputType="radio" required={true} onChange={this.handleProposalTypeChange.bind(this)} values={proposalTypes} value={proposalType}/>
            <FormField id="video_url" label="Link to video" required={true} placeholder="e.g. http://youtu.be/xxxx" subtitle={<span><b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.<br/><b>New speakers</b>: A short video introducing them and the planned session outline. Example can be found <a href="https://www.youtube.com/watch?v=2A6cLeXLLII">in this video</a>.</span>} caption={null}/>
            <FormField id="abstract" label="Abstract" required={true} multiline={true} placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`} subtitle={<span>Markdown syntax is supported. You can edit your proposal at any given time during the CFP period.<br/><br/><b>Example:</b><br/>Building an effective micro-service architecture is a non-trivial task. At example.com, we have accumulated more than 500 different micro-services over the years, ended up with a micro-service spaghetti, long latency, and inevitably -  a broken CI/CD pipeline.
Then, we decided to remove human factor out of the equation.
In this session I will present our open-sourced package that analyzed our microservice architecture as a graph, measured the load on each server, improved server utilization by 73% and brought our CI-CD pipeline back from the dead.<br/><br/><span className={cx({'abstract-err': abstractErr})}>{abstractLen}/{ABSTRACT_MAX}</span></span>} fullRow={true} caption={null} onChange={this.onChangeAbstract}/>
            <Tags
                  tags={tags}
                  predefinedSuggestions={predefinedTags}
                  suggestions={tagSuggestions}
                  handleAddition={this.onAddTag}
                  handleDelete={this.onDeleteTag}
                  readOnly={this.state.tags.length===2} />

            <Rodal visible={!!newTagPending} onClose={() => { this.setState({ newTagPending: null })}}>
              <div style={{textAlign: 'center'}}>
                <h6 style={{marginTop:16}}>'{newTagPending}' doesn't exist</h6>
                <p>Before adding a new tag, please check if there's already an existing tag like this one.</p>
                { bestMatch ? <p>Did you mean <b>{bestMatch}</b>?</p> : undefined }
                <div style={{marginTop:24}}>
                  { bestMatch ? <button style={{ textTransform: 'none', letterSpacing: 1, fontWeight:400}} className={cx('btn', 'btn-sm', 'btn-sm-center')} onClick={(e) => { e.preventDefault(); this.addTag(bestMatch); this.setState({ newTagPending:null }); }}>Add <b>{bestMatch}</b></button> : undefined }
                  <button style={{ textTransform: 'none', letterSpacing: 1, fontWeight:400}} className={cx('btn', 'btn-outline-clr', 'btn-sm', 'btn-sm-center')} onClick={(e) => { e.preventDefault(); this.addTag(newTagPending); this.setState({ newTagPending:null }); }}>Add <b>{newTagPending}</b></button>
                </div>
              </div>
            </Rodal>

            <h6>Private information</h6>
            <small>The following information will be available <b>only to the organizing committee</b></small>
            <FormField id="outline" label="Outline" required={true} multiline={true} placeholder="" subtitle={<span>The outline should include the main subjects you intend to cover with a timing estimation and total timing. A general overview is fine, we don’t expect a per-slide description for now. <br/><br/><b>For example:</b><br/>

&bull; 2m Introduction: Who am I and my professional background<br/>
&bull; 5m Architectural overview: how we built 500 different micro-services over 5 years, and why we ended up supporting 15 different programming languages.<br/>
&bull; 5m The latency math behind a micro-service call-chain, and why we had to over-provision containers to avoid a 1s response time because accumulated latency is not a normal distribution<br/>
&bull; 15m Our solution: Measuring everything and using a managed machine-learning platform to optimize our response time and server utilization<br/>
&bull; 5m: The open source power! How can you use our code to optimize your production system<br/>
&bull; 5m Q&A<br/>

Total time: 37m</span>} fullRow={true} caption={null}/>

            <fieldset className={cx("row")} style={{marginTop: '30px'}}>
              <div className={cx("text-center")}>
                <input type="submit" value="submit" className={cx('btn', 'btn-lg')} />
              </div>
            </fieldset>
            </form>
        </div>
      )
    }

    renderSubmissionClosed() {
      return (
        <div style={{marginTop: 40}} className={cx('col-md-10', 'col-md-offset-1')}>
          <h6>Call for papers is closed for submission. You can view the submitted proposals <Link to="proposals">here</Link>.</h6>
        </div>
      );
    }

    renderNonAuthenticated() {
        return (
          <div style={{textAlign:'center'}}>
            <hr/>
            <h6>Login with Google is required in order to submit a proposal</h6>
            <a style={{backgroundColor:"#4cae4c"}} href="/auth/google" className={cx("btn", "btn-info", "btn-outline-clr1", "buy-btn")}>Login</a>
          </div>
        );
    }

    render() {
        const { location, user: { authenticated } } = this.props;
        let bottomContent;
        if (!authenticated) {
          bottomContent = this.renderNonAuthenticated();
        } else if (features('submission', false)) {
          bottomContent = this.renderSubmissionForm();
        } else {
          this.renderSubmissionClosed()
        }

        return (
            <BaseLayout currentPath={location.pathname} name="submission-page" background="rgb(192, 200, 203)" topBg="#3f7488">
              <section id="submission-info" className={cx('section', 'submission-info')}>
                <div className={cx('container')}>
                  <div className={cx('row')}>
                    <div className={cx('col-xs-10', 'col-xs-offset-1', 'col-sm-8', 'col-sm-offset-2')} style={{background: 'white', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.37)', padding: 30}}>
                      <Title/>
                      <Topics/>
                      <Faq/>
                      { bottomContent }
                    </div>
                  </div>
                </div>
              </section>
            </BaseLayout>
        );
    }
}

Submit.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
      user: state.user,
      tagSuggestions: state.proposal.tags
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Submit);
