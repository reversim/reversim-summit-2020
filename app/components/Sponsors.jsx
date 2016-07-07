import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/main';
import _ from 'lodash';

import Rodal from 'components/Rodal';

import outbrainLogo from 'images/sponsors/outbrain.png';
import wixLogo from 'images/sponsors/wix.png';
import aolLogo from 'images/sponsors/aol.png';
import gigyaLogo from 'images/sponsors/gigya.png';
import kenshooLogo from 'images/sponsors/kenshoo.png';
import appsFlyerLogo from 'images/sponsors/apps_flyer.png';
import myHeritageLogo from 'images/sponsors/my_heritage.png';
import klarnaLogo from 'images/sponsors/klarna.png';
import fiverrLogo from 'images/sponsors/fiverr.png';
import similarWebLogo from 'images/sponsors/similarWeb.png'

const cx = classNames.bind(styles);

/*
* Note: This is kept as a container-level component,
*  i.e. We should keep this as the container that does the data-fetching
*  and dispatching of actions if you decide to have any sub-components.
*/
export default class Sponsors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSponsorModalOpen: false,
      modalContent: {
        name: 'Gigya',
        logo: gigyaLogo,
        url: 'http://impact.gigya.com',
        info: {
          description: 'Gigya is using micro-services architecture, cutting-edge distributed programming models and big-data to build a scalable Identity Management SaaS platform.',
          featuredJobInfo: 'Front End Developer: The position involves developing client-side and server-side SDKs in various technologies (node.js, c#, php, python, java, js, objective-c, android). The position also includes full ownership on developing our SPA management console used by our clients',
          featuredJobLink: 'http://jobs.jobvite.com/careers/gigya/job/oXDf2fwB?__jvst=Career%20Site'
        }
      }
    }
  }

  static sponsors = _.shuffle([
    {
      name: 'Gigya',
      logo: gigyaLogo,
      url: 'http://impact.gigya.com',
      info: {
        height: 350,
        description: 'Gigya is using micro-services architecture, cutting-edge distributed programming models and big-data to build a scalable Identity Management SaaS platform.',
        featuredJobInfo: 'Front End Developer: The position involves developing client-side and server-side SDKs in various technologies (node.js, c#, php, python, java, js, objective-c, android). The position also includes full ownership on developing our SPA management console used by our clients.',
        featuredJobLink: 'http://jobs.jobvite.com/careers/gigya/job/oXDf2fwB?__jvst=Career%20Site'
      }
    },
    {
      name: 'Apps Flyer',
      logo: appsFlyerLogo,
      url: 'http://www.appsflyer.com',
      info: {
        height: 400,
        description: 'AppsFlyer is the leading mobile attribution and analytics platform, enabling app marketers and brands measure their user accusition, in-app user engagement tracking, lifetime value analysis, ROI and retargeting attribution.',
        featuredJobInfo: 'If you have passion to big data processing, this is the place for you. Come to play around with more than 8 billion events per day in real-time and batch, using Spark, Mesos, Memsql, Druid and Kafka. New systems and technologies, architecture changes and data insights are part of the daily work in this team.',
        featuredJobLink: 'https://www.appsflyer.com/jobs/senior-data-developer/'
      }
    },
    {
      name: 'Kenshoo',
      logo: kenshooLogo,
      url: 'http://www.kenshoo.com',
      info: {
        height: 300,
        description: 'Marketeers of the world\'s top brands are using Kenshoo\'s platform to drive $350 billion in annualized sales revenue.',
        featuredJobInfo: 'We are looking for developers who can get things done, enjoy solving hard problems and like working in a team. Help us solve a huge problem for advertisers and make friends while at it.',
        featuredJobLink: 'http://kenshoo.com/about/company/culture/'
      }
    },
    {
      name: 'Outbrain',
      logo: outbrainLogo,
      url: 'http://www.outbrain.com',
      info: {
        height: 300,
        description: 'Outbrain is the inventor and leader in content discovery. We help people discover interesting content.',
        featuredJobInfo: 'We are looking for an outstanding software engineer who is passionate about quality and bringing value to our users. You will be part of a small, tight-knit, dynamic, hands-on team that takes pride in high coding standards and modern development practices. Each member of our team is an development athlete/all-around-player. You should be able to build a product end-to-end, from the careful mastery of the front-end/client-side to the efficient and maintainable design of the back-end/server-side.',
        featuredJobLink: 'http://outbrain.mytribehr.com/careers'
      }
    },
    {
      name: 'My Heritage',
      logo: myHeritageLogo,
      url: 'http://www.myheritage.com',
      info: {
        height: 300,
        description: 'At MyHeritage, we bring together incredibly bright minds, and all the newest technologies and languages. The result is a culture of constant innovation. With 82 million users, 28 million family trees, and 6.8 billion records, as an engineer at MyHeritage, you’ll overcome exciting scale challenges to build a line of products with massive global impact.',
        featuredJobInfo: 'Are you obsessed with performance and scale challenges? Do you lose hours of sleep thinking about how to reduce ten milliseconds from an SQL query? If you’re looking for challenges with server solutions and running cutting-edge NoSQL big data architecture, then look no further. Our complex environment of over 2.6 billion individual profiles, and over 6 billion historical records, will ensure that you’ll help solve big data challenges (using Hadoop, Cassandra, and other NoSQL solutions) while working in continuous integration and deployment. We\'re growing fast and have opportunities for DevOps experts, Backend and Frontend developers. Join us - Make history!',
        featuredJobLink: 'http://grnh.se/18ochs'
      }
    },
    {
      name: 'Fiverr',
      logo: fiverrLogo,
      url: 'http://www.fiverr.com',
      info: {
        height: 300,
        description: 'Founded in 2010 with offices in New York City, Chicago, Miami, San Francisco and Tel Aviv, Fiverr is the world\'s most transacted marketplace for digital services. Fiverr is shaping the future of work, every day, by shifting the freelance economy online.',
        featuredJobInfo: 'Labs SW Engineer- The labs team is responsible for the evolution of Fiverr\'s Infrastructure toolset, architecture, innovation and Big Data. We are looking for a  talented Software Engineer, with a positive "sure! I can do that." attitude to join our Labs Engineering team. Fiverr\'s mission is to disrupt the freelance industry and you will play a major part in the architecture, design and implementation of our application platform.',
        featuredJobLink: 'https://www.fiverr.com/jobs/544'
      }
    },
    {
      name: 'Similar Web',
      logo: similarWebLogo,
      url: 'https://www.similarweb.com/',
      info: {
        height: 300,
        description: 'SimilarWeb is a digital market intelligence company used by 100,000s of businesses for global cross-device strategic insights.',
        featuredJobInfo: 'If you are passionate about data and solving challenging problems than your place is with us. We are currently looking for senior .NET, big-data, front-end, automation, and production engineers as well as researchers for our data science team.',
        featuredJobLink: 'https://www.similarweb.com/corp/jobs/'
      }
    },
  ]).concat(_.shuffle([
    { name: 'Wix', logo: wixLogo, url: 'http://www.wix.com' },
    { name: 'aol', logo: aolLogo, url: 'http://www.aol.com' },
    { name: 'Klarna', logo: klarnaLogo, url: 'http://www.klarna.com' },
  ]));

  openSponsorModal(info) {
    this.setState({ isSponsorModalOpen: true, modalContent: info })
  }

  closeSponsorModal() {
    this.setState({ isSponsorModalOpen: false })
  }

  renderSponsor(sponsor, index) {
    const { name, logo, url, info } = sponsor;

    if (info) {
      return (
        <div key={index} className={cx('panel', 'align-left')} style={{marginTop: 50}}>
          <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-sm-2', 'col-sm-offset-1', 'img-column')}>
              <a href={url}><img src={logo} alt={name} className={cx('img-responsive')} /></a>
            </div>
            <div className={cx('col-sm-8')}>
              <div className={cx('h7')}>About {name}</div>
              <p>{info.description} <a href={url}>{name} website</a>.</p>
              <div className={cx('h7')} style={{marginTop: 20}}>Featured Job</div>
              <p>{info.featuredJobInfo} Interested? More info <a href={info.featuredJobLink}>here</a>.</p>
            </div>
          </div>
          </div>
        </div>
      );
    } else {
      return (<a key={index}
        style={{cursor: 'pointer'}}
        href={url}>
        <div className={cx('sponsor', 'big')}><img src={logo} alt={name} /></div>
      </a>);
    }
  }

  renderModal() {
    let modalContent;
    if (this.state.modalContent) {
      modalContent = this.renderSponsor(this.state.modalContent)
    }

    return (
      <Rodal width={700} height={(this.state.modalContent && this.state.modalContent.info && this.state.modalContent.info.height) || 350} visible={this.state.isSponsorModalOpen} onClose={this.closeSponsorModal.bind(this)}>
        {modalContent}
      </Rodal>
    );
  }

  render() {
    return (
      <section id="sponsors" className={cx('section', 'align-center')}>
        <div className={cx("container")}>
          <span data-icon className={cx('icon', 'section-icon', 'icon-documents-bookmarks-12')}></span>
          <h3>Sponsors</h3>
          <p className={cx("text-alt")}>companies that <span className={cx("highlight")}>support</span> us</p>
          <br/>
          <br/>

          {Sponsors.sponsors.map(this.renderSponsor)}

        </div>
      </section>
    );
  }
}
