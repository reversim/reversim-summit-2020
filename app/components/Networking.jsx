import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import ga from 'react-ga';

import aboutGeneralInfo from 'images/about-general-info.jpg';
import aboutSponsors from 'images/about-sponsors.jpg';
import aboutTopics from 'images/about-topics.jpg';
import networkingWomen from 'images/networking.jpeg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class Networking extends Component {
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
                category: 'Networking',
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
            <section id="networking" className={cx('section', 'align-center')}>
                <div className={cx("container")}>
                    <span data-icon className={cx('icon', 'section-icon', 'icon-party-06')}></span>
                    <h3>Networking</h3>
                    <br />
                    <br />

                    <div className={cx('tabs-wrapper', 'tabs-horizontal')} style={{minHeight: '717px'}}>
                        <div className={cx('nav-wrapper')}>
                            <ul className={cx('nav', 'nav-tabs')}>
                                <li className={this.state.activeTab === 0 ? cx("active") : ""}><a href="#horizontal_tab1" onClick={this.onTabClicked.bind(this)(0)} data-toggle="tab">
                                    <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-code')}></span> Women Networking Event</h6>
                                </a></li>
                            </ul>
                        </div>

                        <div className={cx("tab-content")}>
                            <div id="horizontal_tab1" className={this.tabContentClass(0)}>
                                <div className={cx('col-sm-5', 'img-column')}>
                                    <img src={networkingWomen} alt="" className={cx("img-responsive")} />
                                </div>
                                <div className={cx('col-sm-7', 'align-left')}>
                                    <h6>We would like to see more women in Reversim!</h6>
                                    <p><b>Networking lunch for women</b> - We invite all women who register for the summit to join us for a networking lunch for women.
                                        We will introduce ourselves and share our stories during lunch.
                                        (Depending on the number of women who register we may split into several groups.)
                                    </p>
                                    <br />
                                    <h6>Encourage women to register</h6>
                                    <p>
                                        If you want to register for the summit but have no one to come with, or have any other concerns, we invite you to join our <a href="https://www.facebook.com/groups/1762800823976512/" target="_blank">facebook group.</a> You can talk to women who participated in the last event. You can also connect with other women before the event and arrange to meet.
                                        If you prefer, we can also match you with a “buddy” for the duration of the event.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Networking;
