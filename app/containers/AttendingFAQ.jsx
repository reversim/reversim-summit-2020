import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import {fetchUserProposals } from 'actions/users';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png';

const cx = classNames.bind(styles)

class AttendingFAQ extends Component {

    constructor(props) {
        super(props);
    }

    static data = [
      {
        q: "What is the purpose of the vote?",
        a: "The vote button reads WILL ATTEND and so is the purpose of it - to indicate that you are personally interested in attending this session. Please note - it’s not registration. By clicking WILL ATTEND you are not yet registered to the conference. Think of it as “I want to attend”. It helps in the selection of the sessions (but by no means is the only signal for that)"
      },
      {
        q: "To how many sessions can I vote?",
        a: "As many as you wish. You may vote for just one or all of them.\n\nTypically most people vote for a few dozen sessions."
      },
      {
        q: "Who can vote?",
        a: "Anyone **can** vote. But you **should** vote only if you plan to attend the conference.\nSimply login and vote. Invite your friends and coworkers.\nBut keep in mind that the purpose of the vote is WILL ATTEND so vote only if you intend to come to the conference and of course are interested in this specific session."
      },
      {
        q: "Can I undo my vote?",
        a: "Yes. Until the 31 you may vote and unvote freely. Simply click the WILL ATTEND button once more.\nVisit [https://summit2017.reversim.com/my-favorites](https://summit2017.reversim.com/my-favorites) to list the sessions you voted for."
      },
      {
        q: "When does the voting end?",
        a: "Voting ends end of day Mon night **July 31**. There's only a few days left."
      },
      {
        q: "Who sees the results?",
        a: "Results are confidential. Only the moderators team sees them in aggregate. **The results will not be published.**\n\n *Within the moderators team only the data admins (3ppl) have non-aggrerate access to personal vote information, the rest see them in aggregate.*"
      },
      {
        q: "Is WILL ATTEND just like VOTING?",
        a: "Yes and no. The purpose of this process is to measure interest and improve engagement. We want you to tell us what interests you and we will use this information in order to prioritize our work. BUT - you should click only if you find the topic and and the presenter for this topic interesting and you want to spend 5m or 1/2h listening to it. Being good friends with the spekaer is the wrong reason to vote. Showing interest in the session is the right reason to vote. Keep in mind that all votes are confidential."
      },
      {
        q: "If I clicked WILL ATTEND - does that mean I'm registered to the conference?",
        a: "No. Registration will open mid September. By clicking you are merely showing interest. That's all, you're not yet registered."
      },
      {
        q: "When will selected sessions and agenda be announced?",
        a: "Around early-mid Sep."
      },
      {
        q: "When will registration open?",
        a: "Mid Sep"
      },
      {
        q: "When is the conference?",
        a: "Oct 15-16."
      },
      {
        q: "Where can I get more updates?",
        a: "You should follow us on Twitter [https://twitter.com/reversim](https://twitter.com/reversim) or join the Facebook group [https://www.facebook.com/groups/806177629478248/](https://www.facebook.com/groups/806177629478248/) or the mailing list [https://groups.google.com/forum/#!managemembers/reversim-summit](https://groups.google.com/forum/#!managemembers/reversim-summit)\n\nAnd/or occasionally visit the site [https://summit2017.reversim.com/](https://summit2017.reversim.com/)"
      },
      {
        q: "I’m a submitter. What do I do now?",
        a: "If you’re a submitter then you should have received another email with more details about what’s coming next.\n\nThank you and happy voting. You have until July 31. Hope to see you at the conference, RS17 team."
      }
    ];

    render() {
        return (
            <BaseLayout currentPath={this.props.location.pathname} name="attending-faq">

              <section id="register" className={cx('section', 'container')} style={{ marginTop: 60 }}>
                <div className={cx('col-xs-12', 'col-md-offset-2', 'col-md-8')}>
                  <h3 className={cx('text-center')} style={{marginBottom: 80}}>I Will Attend - Q&A</h3>

                {AttendingFAQ.data.map((q, i) => {
                  return (
                    <div className={cx('question')} key={i}>
                      <h6 className={cx('q')}>{q.q}</h6>
                      <ReactMarkdown source={q.a} className={cx('a')} />
                    </div>
                  )
                })}

                </div>
              </section>
              <h5 className={cx('text-center')} style={{marginTop: 40}}>So, are you ready to mark your favorite sessions?</h5>
              <div className={cx('text-center')} style={{marginBottom: 40}}><Link to='/proposals' className={cx('btn', 'btn-lg')} style={{marginTop: 30}}>Start reviewing</Link></div>

            </BaseLayout>
        );
    }
}

AttendingFAQ.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

AttendingFAQ.defaultProps = { };

function mapStateToProps(state) {
    return {};
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AttendingFAQ);
