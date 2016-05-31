import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';

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
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>June 2</strong>
                        <h6 className={cx("title")}>Open Call for Papers<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time1" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>June 30</strong>
                        <h6 className={cx("title")}>Close Call for Papers<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time2" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Early July</strong>
                      <h6 className={cx("title")}>Review Starts<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time3" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Mid August</strong>
                      <h6 className={cx("title")}>Review Ends<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time4" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Mid August</strong>
                      <h6 className={cx("title")}>Publish Agenda<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time5" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>Mig August</strong>
                      <h6 className={cx("title")}>Open Registration<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time6" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
                        </article>
                      </div>
                    </div>
                    {/*  Lecture end  */}

                    {/*  Lecture start  */}
                    <div className={cx('panel', 'schedule-item')}>
                      <div className={cx("lecture-icon-wrapper")}>
                        <span className={cx('fa', 'fa-group')}></span>
                      </div>
                      <a data-toggle="collapse" data-parent="#day1_auditorium1_timeline" href="#day1_auditorium1_time1" className={cx("schedule-item-toggle")}>
                        <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>September 19-20</strong>
                        <h6 className={cx("title")}>Reversim Summit 2016<i className={cx('icon', 'icon-arrows-06')}></i></h6>
                      </a>
                      <div id="day1_auditorium1_time7" className={cx('panel-collapse', 'collapse', 'in', 'schedule-item-body')}>
                        <article>
                          <p className={cx("description")}>Luctus at accumsan eget ut ante. Cras molestie sollicitudin. Ultricies et eros id quisque auctor. Per mus enim ac lorem integer. Erat netus id. Porta enim quis et elementum amet risus volutpat magna nec ac.</p>
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
