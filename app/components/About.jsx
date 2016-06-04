import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import ga from 'react-ga';

import aboutGeneralInfo from 'images/about-general-info.jpg';
import aboutSponsors from 'images/about-sponsors.jpg';
import aboutTopics from 'images/about-topics.jpg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: 0};
    this.onTabClicked = this.onTabClicked.bind(this);
    this.tabContentClass = this.tabContentClass.bind(this);
  }

  onTabClicked(index) {
    return (event) => {
      event.preventDefault();

      ga.event({
        category: 'About',
        action: 'Change tab',
        value: index
      });

      this.setState({ activeTab: index });
    }
  }

  tabContentClass(index) {
    return this.state.activeTab === index ? cx('tab-pane', 'fade', 'active', 'in') : cx('tab-pane', 'fade');
  }

  render() {
    return (
          <section id="about" className={cx('section', 'align-center')}>
            <div className={cx("container")}>
              <span data-icon className={cx('icon', 'section-icon', 'icon-faces-users-04')}></span>
              <h3>About</h3>
              <p className={cx("text-alt")}>About the conference, topics, important dates, etc.</p>
              <br />
              <br />

            <div className={cx('tabs-wrapper', 'tabs-horizontal')}>
              <div className={cx('nav-wrapper')}>
                <ul className={cx('nav', 'nav-tabs')}>
                  <li className={this.state.activeTab === 0 ? cx("active") : ""}><a href="#horizontal_tab1" onClick={this.onTabClicked.bind(this)(0)} data-toggle="tab">
                    <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-code')}></span> General info</h6>
                  </a></li>
                  <li className={this.state.activeTab === 1 ? cx("active") : ""}><a href="#horizontal_tab2" data-toggle="tab" onClick={this.onTabClicked.bind(this)(1)} >
                    <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-rocket')}></span> Topics</h6>
                  </a></li>
                  <li className={this.state.activeTab === 2 ? cx("active") : ""}><a href="#horizontal_tab3" data-toggle="tab" onClick={this.onTabClicked.bind(this)(2)} >
                    <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-external-link')}></span> Sponsor info</h6>
                  </a></li>
                </ul>
              </div>

                <div className={cx("tab-content")}>
                  <div id="horizontal_tab1" className={this.tabContentClass(0)}>
                    <div className={cx('col-sm-5', 'img-column')}>
                      <img src={aboutGeneralInfo} alt="" className={cx("img-responsive")} />
                    </div>
                    <div className={cx('col-sm-7', 'align-left')}>
                      <h6>About Reversim Summit</h6>
                      <p>
                        <a href="http://reversim.com/">Reversim</a> (רברס עם פלטפורמה) is a Hebrew podcast by <a href="https://twitter.com/orilahav">Ori Lahav</a> and <a href="http://tavory.com/">Ran Tavory</a> which brings together software developers and product, with over 300 recorded episodes and a few thousands listners.
                      </p>
                      <p>The summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too.</p>
                    </div>
                  </div>

                  <div id="horizontal_tab2" className={this.tabContentClass(1)}>
                    <div className={cx('col-sm-7', 'align-left')}>
                      <h6>Topics</h6>
                      <p>We’re interested in everything including software development, software product development, UX, startups, mobile, web, devops, data processing, scaling, software company culture, tooling and more. There is no predefined list of topics, if you’d like to speak about something interesting, we want it!</p>
                      <p>We do not set out with a predefined list of tracks. We would like to leave the topics (tracks) open and only after accepting the submissions we will split the sessions into tracks, but we shall not rule out a single good session just b/c it's not a natural fit to any of the predefined list, so don't worry so much about categorizing your submissions.</p>
                      <p>Generally speaking - we are not looking for “intro to something software” or “something software 101”. We’re looking for something of greater depth. However, we are open to session “intro to something that isn’t software”, as long is this something is of general interest, for example “intro to moonwalking and breakdance”</p>
                    </div>

                    <div className={cx('col-sm-5', 'img-column')}>
                      <img src={aboutTopics} alt="" className={cx("img-responsive")} />
                    </div>
                  </div>

                  <div id="horizontal_tab3" className={this.tabContentClass(2)}>
                    <div className={cx('col-sm-5', 'img-column')}>
                      <img src={aboutSponsors} alt="" className={cx("img-responsive")} />
                    </div>
                    <div className={cx('col-sm-7', 'align-left')}>
                      <h6>Sponsors apply</h6>
                      <p>Thank you for your interest in becoming a Reversim sponsor! While our speakers and attendees are what makes the conference tick, it is our sponsors that allow us to keep tickets cheap, bring in international speakers and make the conference experience the best it can possibly be.</p>
                      <br />
                      <h6>Why become a sponsor?</h6>
                      <p>As a sponsor you’ll contribute to the success of the conference by providing monetary aid or rendering services.</p>
                      <p>More information about sponsorship packages will be published soon.</p>
                      <br />
                      <h6>Becoming a sponsor</h6>
                      <p>To become a sponsor, <a href="mailto:adam@matan.name">contact the organization team</a>. We will reach back to you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    );
  }
};

export default About;
