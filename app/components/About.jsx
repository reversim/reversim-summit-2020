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
              <span data-icon className={cx('icon', 'section-icon', 'icon-seo-icons-37')}></span>
              <h3>About</h3>
              <br />
              <br />

            <div className={cx('tabs-wrapper', 'tabs-horizontal')} style={{minHeight: '717px'}}>
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
                      <p>Reversim summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too.</p>
                      <p>This is the fifth(!) Reversim Summit. The summits of <a href="http://summit2013.reversim.com">2013</a> and <a href="http://summit2014.reversim.com">2014</a> (TLV Campus), <a href="http://summit2015.reversim.com">2015</a> (Technion) and <a href="http://summit2016.reversim.com">2016</a> (Weizmann Institute of Science) also featured community content. Watch previous years&#39; sessions to get the general feel of the Revesim Summit spirit.</p>
                      <br />
                      <h6>About Reversim Podcast</h6>
                      <p>
                        <a href="http://reversim.com/">Reversim</a> (רברס עם פלטפורמה) is a Hebrew podcast by <a href="https://twitter.com/orilahav">Ori Lahav</a> and <a href="http://tavory.com/">Ran Tavory</a> which brings together software developers and product, with over 300 recorded episodes and a few thousands listners.
                      </p>
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
                    <div className={cx('col-sm-3', 'img-column')}>
                      <img src={aboutSponsors} alt="" className={cx("img-responsive")} />
                    </div>
                    <div className={cx('col-sm-8', 'col-xs-offset-1', 'align-left')}>
                      <h6>Sponsorship plan</h6>
                      <p>We feature a sponsorship plan for companies relevant to the conference attendees. The plan includes:</p>
                      <span className={cx('h7')}>Featured job description</span>
                      <ul className={cx('with-bullets')}>
                        <li>A featured job description near your company name at the sponsors page in our site, with a link to your site.</li>
                        <li>A link to your careers / jobs page from the sponsors page in our site.</li>
                      </ul>
                      <span className={cx('h7')}>A Thank-you before the keynote sessions</span>
                      <p>We will thank all sponsors before the daily keynote session.</p>
                      <span className={cx('h7')}>Website</span>
                      <ul className={cx('with-bullets')}>
                        <li>A logo in the home page of the Reversim conference site.</li>
                        <li>A section in the sponsors page in the Reversim conference site, with a link to the company’s home page.</li>
                      </ul>
                      <span className={cx('h7')}>Video</span>
                      <p>All major conference sessions are video-recorded and will be freely available on the web. Sponsors logos will appear in the cover page appearing before each session.</p>
                      <span className={cx('h7')}>Tickets</span>
                      <p>Tickets are free, but they tend to vanish quickly. We provide each sponsor with 4 unnamed reservations that can be given to last-minute attendees.</p>
                      <br />
                      <h6>Becoming a sponsor</h6>
                      <p>The sponsorship plan cost is 15,000 NIS + V.A.T.</p>
                      <p>We do encourage sponsors to submit sessions. In fact, sessions by sponsors have been some of the best we had in previous summits. However, these sessions go through our independent submission and moderation process.</p>
                      <p>To become a sponsor, please contact <a href="mailto:shlomi.hassan@gmail.com">Adam matan</a>.</p>
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
