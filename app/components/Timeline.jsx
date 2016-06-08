import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Scroll, { Link as ScrollLink } from 'react-scroll';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Timeline = () => {
  return (
    <section id="timeline" className={cx('section', 'schedule-section', 'align-center')}>
      <div className={cx("container")}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-office-21')}></span>
        <h3>Timeline</h3>
        <br />

      {/*  Timeline start  */}
        <div className={cx("schedule")}>

          {/*  First level content start  */}
          <div className={cx("tab-content")}>

            {/*  Day 1 content start  */}
            <div id="day1" className={cx('tab-pane', 'fade', 'active', 'in')}>

              {/*  Second level content start  */}
              <div className={cx('tab-content', 'tab-content-schedule')}>

                {/*  Auditorium 1 content start  */}
                <div id="day1_auditorium1" className={cx('tab-pane', 'fade', 'active', 'in')}>

                  {/*  Accordion start  */}
                  <div className={cx("panel-group")} id="day1_auditorium1_timeline">

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-bullhorn')}></span>
                      </div>
                      <a data-toggle="collapse" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>June 9</strong>
                        <h6 className={cx("title")}>Call for Papers Period Begins<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time1" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>
                          We've decided that we will not define a list of tracks upfront, rather open up the submission to any topic.
                          Later on we will choose the best sessions and sort them by topic relevance, so that attendees would be able to focus on tracks and room.</p>
                        <p className={cx("description")}>
                        This means that we want submission on any topic that may interest developers, product folks, UX etc.
                        Topics might include startups, mobile, web, devops, data processing, scaling, programming languages, api design, data science, gaming, computer vision and more...
                        This is not a closed list, it's just to give ideas, if your topic doesn't seem to fit here and is of general interest, we want it!
                          </p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-ban')}></span>
                      </div>
                      <a data-toggle="collapse" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>July 8</strong>
                        <h6 className={cx("title")}>Call for Papers Period Ends<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>

                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-comments')}></span>
                      </div>
                      <a data-toggle="collapse" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Mid July</strong>
                      <h6 className={cx("title")}>Review Starts<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time3" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>We have a <ScrollLink to="team" spy={true} smooth={true} offset={-50} duration={500}>wonderful group of moderators</ScrollLink> that would help you refine your submission and eventually select the proposed sessions.
                          Please feel free to <a href="mailto:rs16-team@googlegroups.com">reach out</a> to any of us if you have any questions.</p>
                          <p className={cx("description")}>During the selection process we take into account various aspects, including relevance, popularity, interest, originality, presenters track record, diversity etc.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-calendar')}></span>
                      </div>
                      <a data-toggle="collapse" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Mid August</strong>
                      <h6 className={cx("title")}>Review Ends, Publish Agenda<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                    </div>
                    {/*  Lecture end  */}


                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-ticket')}></span>
                      </div>
                      <a data-toggle="collapse" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Mid August</strong>
                      <h6 className={cx("title")}>Open Registration<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>September 19-20</strong>
                        <h6 className={cx("title")}>Reversim Summit 2016<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time7" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>See you in <ScrollLink to="location" spy={true} smooth={true} offset={-50} duration={500}>Weizmann Institute of Science</ScrollLink>, Rehovot. 19-20 September, 2016.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}
                  </div>
                  {/*  Accordion end  */}

                </div>
                {/*  Auditorium 1 content end  */}

              </div>
              {/*  Second level content end  */}

            </div>
            {/*  Day 1 content end  */}

          </div>
          {/*  First level content end  */}

        </div>
        {/*  Timeline end  */}

      </div>

    </section>
  );
};

export default Timeline;
