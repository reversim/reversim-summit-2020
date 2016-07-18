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
        q: "Why should I mark sessions with WILL ATTEND? What does that mean?",
        a: "We use this data to determine interest in the sessions. You should click WILL ATTEND if you find the session and its presenter interesting and you'd like to spend your time listening to it.\n\nYou can access your favorite sessions via [favorite sessions](/my-favorites) page (under profile dropdown, top right of this page)."
      },
      {
        q: "How many sessions can I click on WILL ATTEND?",
        a: "You may click on how many sessions you like. There's no limit. Click one or click hundred, every click counts the same. (it doesn't matter how many you click for counting your clicks)."
      },
      {
        q: "Can I unclick (undo my click)?",
        a: "Yes you can. Just click the button again."
      },
      {
        q: "When does the voting ends?",
        a: "Voting ends end of day Sat night **July 23**. There's only a few days left."
      },
      {
        q: "Who sees the results?",
        a: "Results are confidential. Only the moderators team sees them in aggregate. **The results will not be published.**\n\n *Within the moderators team only the data admins (3ppl) have non-aggrerate access to personal vote information, the rest see them in aggregate.*"
      },
      {
        q: "Is WILL ATTEND just like VOTING?",
        a: "Yes and no. The purpose of this process is to measure interest and improve engagement. We want you to tell us what interest you and we will use this information in order to priorotize our work. BUT - you should click only if you find the topic and and the presenter for this topic interesting and you want to spend 5m or 1/2h listening to it. Being good friends with the spekaer is the wrong reason to vote. Showing interest in the session is the right reason to vote. Keep in mind that all votes are confidential."
      },
      {
        q: "If I clicked WILL ATTEND - does that mean I'm registered to the conference?",
        a: "No. Registration will open mid August. By clicking you merely are showing interest. that's all, you're not yet registered."
      }
    ]

    render() {
        return (
            <BaseLayout currentPath={this.props.location.pathname} name="attending-faq">

              <section id="register" className={cx('section', 'container')}>
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

                <h5 className={cx('text-center')} style={{marginTop: 80}}>So, are you ready to mark your favorite sessions?  <Link to='/proposals' className={cx('btn', 'btn-lg')} style={{marginTop: 30}}>Start reviewing</Link></h5>
                </div>
              </section>

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
