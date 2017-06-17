import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BaseLayout from 'containers/BaseLayout';
import {createProposal} from 'actions/proposals';
import { push } from 'react-router-redux';
import {updateUser} from 'actions/users';
import ga from 'react-ga';
import features from 'features';
import FormField from 'components/FormField';

import { cx } from 'css/styles';

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
      <p>You may get a good sense of the topics we're interested in by looking into previous events: <a href="http://summit2013.reversim.com">Reversim Summit 2013</a> and <a href="http://summit2014.reversim.com">Reversim Summit 2014</a> and <a href="http://summit2015.reversim.com">Reversim Summit 2015</a>.</p>
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
      <br /><p>There are three possible session types you may submit:</p>

      <h6>Full Featured sessions (30-40 minutes)</h6>
      <p>Full feature are frontal presentations b/w 30 - 40 minutes. They will be held either in the large room (500 ppl) or the small room (200 ppl) in two parallel tracks.</p>
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
      <p>If you are a non Israeli speaker and would like to present in this conference, you are most welcome, that's perfectly fine, you may do so in English, just be aware that most of the contents is going to be in Hebrew.</p>
      <br />
      <span className={cx('h7')}>What do you get for X?</span>
      <p>Registration will open about a month before the event. If you've registered on time, all is well. If not, <strong>every submitter gets a single personal ticket</strong>, regardless of whether your session got accepted or not (assuming quality submission). <strong>Accepted speakers get a personal ticket +1</strong> (so you can do a friend a favor)</p>
    </div>
  )
};

class Submit extends Component {

    constructor(props) {
        super(props);

        const {dispatch, user: { authenticated }} = props;
        if (!authenticated) {
          dispatch(push('/'))
        }

        this.state = {
          proposalType: 'full',
          abstractLen: 0,
          abstractErr: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
        this.onChangeAbstract = this.onChangeAbstract.bind(this)
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

        if (abstract.length > 800 || abstract.length < 400) {
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
        .then(() => dispatch(createProposal(title, abstract, proposalType, [id])))
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
      const abstractErr = val.length < 400 ? 'low' : val.length > 800 ? 'high' : null;
      this.setState({
        abstractLen,
        abstractErr
      });
    }

    renderSubmissionForm() {
      const { user } = this.props;

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
            <FormField id="oneLiner" label="One Liner" value={user.oneLiner} maxLength={100} subtitle="Maximum 100 characters"/>
            <FormField id="linkedin" label="Linkedin Profile" value={user.linkedin} inputType="url"/>
            <FormField id="twitter" label="Twitter @name" value={user.twitter} placeholder="@Reversim"/>
            <FormField id="bio" label="Short Bio" value={user.bio} placeholder="" required={true} multiline={true} fullRow={true}/>


            <h6>Private information</h6>
            <small>The following information will be available <b>only to the organizing committee</b></small>
            <FormField id="email" label="Email" text={user.email} required={true}/>
            <FormField id="phone" label="Phone number" required={true} placeholder="05x-xxxxxxx" value={user.phone}/>
            <FormField id="trackRecord" label="Track record as speaker" value={user.trackRecord} placeholder="" required={true} multiline={true} fullRow={true} subtitle="Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)"/>

            <h5>Talk proposal</h5>
            <small style={{marginBottom:24}}>Tell us about your talk</small>

            <h6>Public information</h6>
            <small>The following information will be presented in the website</small>
            <FormField id="title" label="Title" required={true} placeholder="Title of your talk" maxLength="100"/>
            <FormField id="proposalType" inputType="radio" required={true} onChange={this.handleProposalTypeChange.bind(this)} values={proposalTypes} value={this.state.proposalType}/>
            <FormField id="abstract" label="Abstract" required={true} multiline={true} placeholder="Between 500-800 characters" subtitle={<span>Markdown syntax is supported. You can edit your proposal at any given time during the CFP period.<br/><span className={cx({'abstract-err': this.state.abstractErr})}>{this.state.abstractLen}/800</span></span>} fullRow={true} caption={null} onChange={this.onChangeAbstract}/>

            <h6>Private information</h6>
            <small>The following information will be available <b>only to the organizing committee</b></small>
            <FormField id="outline" label="Outline" required={true} multiline={true} placeholder="TODO: length (it will be funny if this stays after release :)" subtitle="Describe the topics you will cover and an outline of the story you are telling. Include timing and slide details." fullRow={true} caption={null}/>

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
        <div style={{marginTop: 40}} className={cx('col-md-12', 'col-md-offset-2')}>
          <h6>Call for papers is closed for submission. You can view the submitted proposals <Link to="proposals">here</Link>.</h6>
        </div>
      );
    }

    render() {
        const { location } = this.props;

        return (
            <BaseLayout currentPath={location.pathname} name="submission-page" background="rgb(192, 200, 203)" topBg="#3f7488">
              <section id="submission-info" className={cx('section', 'submission-info')}>
                <div className={cx('container')}>
                  <div className={cx('row')}>
                    <div className={cx('col-xs-10', 'col-xs-offset-1', 'col-sm-8', 'col-sm-offset-2')} style={{background: 'white', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.37)', padding: 30}}>
                      <Title/>
                      <Topics/>
                      <Faq/>
                      { features('submission', false) ? this.renderSubmissionForm() : this.renderSubmissionClosed() }
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
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Submit);
