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
import similarWebLogo from 'images/sponsors/similarWeb.png';
import facebookLogo from 'images/sponsors/facebook.png';
import akamaiLogo from 'images/sponsors/akamai.png';
import oracleLogo from 'images/sponsors/oracle-ravello.png';
import vonageLogo from 'images/sponsors/vonage.png';

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
        featuredJobInfo: 'If you have passion to BigData processing, this is the place for you. Come to play around with more than 8 billion events per day in real-time and batch, using Spark, Mesos, Memsql, Druid and Kafka. New systems and technologies, architecture changes and data insights are part of the daily work in this team.',
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
        featuredJobInfo: 'Are you obsessed with performance and scale challenges? Do you lose hours of sleep thinking about how to reduce ten milliseconds from an SQL query? If you’re looking for challenges with server solutions and running cutting-edge NoSQL BigData architecture, then look no further. Our complex environment of over 2.6 billion individual profiles, and over 6 billion historical records, will ensure that you’ll help solve BigData challenges (using Hadoop, Cassandra, and other NoSQL solutions) while working in continuous integration and deployment. We\'re growing fast and have opportunities for DevOps experts, Backend and Frontend developers. Join us - Make history!',
        featuredJobLink: 'http://grnh.se/18ochs'
      }
    },
    {
      name: 'Fiverr',
      logo: fiverrLogo,
      url: 'http://www.fiverr.com',
      info: {
        height: 300,
        description: 'Founded in 2010 with offices in New York City, Chicago, Miami, San Francisco and Tel Aviv, Fiverr® is the world\'s most transacted marketplace for digital services. Fiverr is shaping the future of work, every day, by shifting the freelance economy online.',
        featuredJobInfo: 'Labs SW Engineer- The labs team is responsible for the evolution of Fiverr\'s Infrastructure toolset, architecture, innovation and BigData. We are looking for a  talented Software Engineer, with a positive "sure! I can do that." attitude to join our Labs Engineering team. Fiverr\'s mission is to disrupt the freelance industry and you will play a major part in the architecture, design and implementation of our application platform.',
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
    {
      name: 'Klarna',
      logo: klarnaLogo,
      url: 'http://www.klarnaisrael.com/',
      info: {
        height: 300,
        description: 'We make online shopping as smooth, simple and safe.',
        featuredJobInfo: 'Web Application Engineer - Klarna Engineering is the driving force behind Klarna\'s global growth. Our work is full of fascinating problems: How do we build delightfully simple products in a complex marketplace? How do we make hundreds of real time credit decisions based on limited data, every minute? How do we provide high availability while working in a micro service architecture where teams deliver new features daily? Fortunately, we have some good solutions: We hire quality-driven engineers from diverse backgrounds, encourage them to grow continually and make it easy for them to get their voices heard. We\'re always on the lookout for curious, friendly and ambitious people to join us.',
        featuredJobLink: 'http://www.klarnaisrael.com/join/'
      }
    },
    {
      name: 'Aol',
      logo: aolLogo,
      url: 'http://www.aol.co.il/',
      info: {
        height: 300,
        description: 'A Verizon company, we disrupt content production, distribution and monetization, delivering 500 million global consumers monthly via TechCrunch, The Huffington Post, MAKERS and more',
        featuredJobInfo: 'Front End Software Developer- Ready to scale up your talents? Join our global team shaping how the world experiences the internet, supporting 500 million+ monthly visits, 2 billion+ videos per month, collecting 1 million events/sec that add 100 terabytes+ of new raw data every day to our backend systems. Work in JAVA, JavaScript, AngularJS, JQuery, Hadoop, Cassandra, Scala, Vertica, MongoDB and CouchDB and more.',
        featuredJobLink: 'http://www.aol.co.il/#career'
      }
    },
    {
      name: 'Wix',
      logo: wixLogo,
      url: 'http://www.wix.engineering/',
      info: {
        height: 300,
        description: 'At Wix Engineering we develop some of the most innovative cloud-based web applications that influence our 85+ million users worldwide.',
        featuredJobInfo: 'We hire Software Engineers who love their work, are passionate about technology and believe that nothing is impossible. We don\'t care which technology you speak, we just want to make sure you play it amazingly. We\'re growing quickly, but function like a start-up –meaning you\'ll have the chance to make a real impact.',
        featuredJobLink: 'http://www.wix.com/jobs/home'
      }
    },
    {
      name: 'Facebook',
      logo: facebookLogo,
      url: 'https://www.facebook.com/careers/',
      info: {
        height: 300,
        description: 'Founded in 2004, Facebook’s mission is to give people the power to share and make the world more open and connected. People use Facebook to stay connected with friends and family, do discover what’s going on in the world, and to share and express what matters to them.',
        featuredJobInfo: 'We are currently building our engineering team here at Tel Aviv and looking for the best people to join us. We work on some of the most interesting and important company initiatives to make the world more open and connected. Just an example: we develop internet.org and providing billions of users, mainly in developing countries, an available and affordable connection to the internet.',
        featuredJobLink: 'https://www.facebook.com/careers/locations/tel-aviv'
      }
    },
    {
      name: 'Oracle Ravello',
      logo: oracleLogo,
      url: 'https://www.ravellosystems.com',
      info: {
        height: 300,
        description: 'At Oracle Ravello we develop a cutting edge cloud virtualization service - enabling *any* workload to run in *any* cloud.',
        featuredJobInfo: 'At Oracle\'s Ravello we work on extremely diverse technologies, by a very small team. From the bits and bytes of the x86 architecture, through virtualization and operating systems internals, networking and storage, and all the way up to highly scalable and resilient SaaS backend and frontend and all the required infrastructure to operate it - we have it all. We value professionalism and responsibility, being a team player and you owning your features and components all the way from inception to production.',
        featuredJobLink: 'https://www.ravellosystems.com/jobs'
      }
    },
    {
      name: 'Akamai',
      logo: akamaiLogo,
      url: 'http://www.akamai.com',
      info: {
        height: 300,
        description: 'Akamai is the global leader in Content Delivery Network (CDN) services, making the Internet business ready—fast, reliable, and secure—for its customers. We operate the most pervasive, highly distributed CDN—with more than 200,000 servers in 110 or more countries—delivering up to 30% of all Web traffic.',
        featuredJobInfo: 'We\'re currently looking for software engineers and test/automation engineers with strong Java background to join our web and cloud security teams! As a part of these teams, you\'ll be working on innovating and developing new and groundbreaking Security and BigData products in the largest scales.',
        featuredJobLink: 'https://akamaijobs.referrals.selectminds.com/via/MichalF-39kEz/jobs/search/123169'
      }
    },
    {
      name: 'Vonage',
      logo: vonageLogo,
      url: 'http://www.joinvonage-il.com/',
      info: {
        height: 300,
        description: 'A leading provider of cloud communications services for consumers and businesses.',
        featuredJobInfo: 'Looking for a senior backend engineer, to be the architect, designer, and coder of unified communication platforms that serve millions of users, mainly in Java and using the latest technologies such as: AWS, Terraform, micro-service architecture, MongoDB, and Docker.',
        featuredJobLink: 'http://www.joinvonage-il.com/senior-backend-engineer'
      }
    }
  ]).concat(_.shuffle([
    // Add sponsors here
  ]));

  openSponsorModal(info) {
    this.setState({ isSponsorModalOpen: true, modalContent: info });
  }

  closeSponsorModal() {
    this.setState({ isSponsorModalOpen: false });
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
