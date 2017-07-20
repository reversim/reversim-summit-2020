import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import _ from 'lodash';

import outbrainLogo from 'images/sponsors/outbrain.png';
import wixLogo from 'images/sponsors/wix.png';
import datoramaLogo from 'images/sponsors/datorama.svg';
import gigyaLogo from 'images/sponsors/gigya.png';
import kenshooLogo from 'images/sponsors/kenshoo.png';
import appsFlyerLogo from 'images/sponsors/apps_flyer.png';
import myHeritageLogo from 'images/sponsors/MH_logo.png';
import klarnaLogo from 'images/sponsors/klarna.png';
import livepersonLogo from 'images/sponsors/liveperson.png';
import tikalLogo from 'images/sponsors/tikal.jpg';
import facebookLogo from 'images/sponsors/facebook.png';
import akamaiLogo from 'images/sponsors/akamai.png';
import oracleLogo from 'images/sponsors/oracle-logo.png';
import caprizaLogo from 'images/sponsors/capriza.png';
import cloudinaryLogo from 'images/sponsors/cloudinary.png';
import automatticLogo from 'images/sponsors/automattic.png';

const cx = classNames.bind(styles);

/*
* Note: This is kept as a container-level component,
*  i.e. We should keep this as the container that does the data-fetching
*  and dispatching of actions if you decide to have any sub-components.
*/
export default class Sponsors extends Component {

  static sponsors = _.shuffle([
    {
      name: 'Gigya',
      logo: gigyaLogo,
      url: 'http://impact.gigya.com',
      info: {
        height: 350,
        description: 'Gigya is using micro-services architecture, cutting-edge distributed programming models and big-data to build a scalable Identity Management SaaS platform.',
        featuredJobInfo: <span><a href="https://jobs.lever.co/gigya/7dfe08be-62a6-4485-a656-34f859c3f93a">Senior C# Server Software Engineer</a>: We handle 1B api calls a day and are looking for .Net developers to come help us build a robust distributed Micro service architecture using our <a href="https://github.com/gigya/microdot">open source framework</a> on top of a cutting edge <a href="https://dotnet.github.io/orleans/">Actor model framework</a>.</span>,
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
        description: 'Marketeers of the world\'s top brands are using Kenshoo\'s platform to drive $350 billion in annualized sales revenue',
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
      name: 'Wix',
      logo: wixLogo,
      url: 'http://www.wix.engineering/',
      info: {
        height: 300,
        description: <span>Wix.com is a leading cloud-based web development platform with more than 110 million users worldwide. Wix was founded on the belief that the Internet should be accessible to everyone to develop, create, and contribute.<br/><br/>Our Software Engineering culture is based on developers who love their work, are passionate about technology, and believe that nothing is impossible. We deploy hundreds of times a day and design our software for ease of change. We use TDD with Scala and JS to develop our microservices, encourage C/I, and we give back to the community by speaking at developer events and contributing to Open-Source. Wix\'s headquarters are in Tel Aviv, Israel with offices in Be\'er Sheva, San Francisco, New York, Miami, Berlin, Vilnius, Kyiv, and Dniepero.</span>,
        featuredJobInfo: <span>At Wix’s Engineering group, lead developers shape the architecture of our services and product. They set the tone and standard of our developer culture, fusing facets of engineering, product management, DevOps, analytics, and technical management. They are also mentors, helping less-experienced engineers improve and hone their skills so that they are eventually capable of being tech leads themselves. The Wix development culture is transparent, highly technical, and agile. Because we ship often, we’ve happily adopted Continuous Delivery and Test-Driven Development. We code in Scala, Python, Go, Javascript and TypeScript. We develop and maintain highly scalable systems that support Wix’s tens of millions of users—and the people who visit their websites.<br/><br/>We strive to hire engineers who have ‘fire and forget’ abilities, and who are independent, innovative, and bold. Does this sound like you? We’re always looking for engineers who share our technical ethos!</span>,
        featuredJobLink: 'http://www.wix.com/jobs/home'
      }
    },
    // {
    //   name: 'Facebook',
    //   logo: facebookLogo,
    //   url: 'https://www.facebook.com/careers/',
    //   info: {
    //     height: 300,
    //     description: 'Founded in 2004, Facebook’s mission is to give people the power to share and make the world more open and connected. People use Facebook to stay connected with friends and family, do discover what’s going on in the world, and to share and express what matters to them.',
    //     featuredJobInfo: 'We are currently building our engineering team here at Tel Aviv and looking for the best people to join us. We work on some of the most interesting and important company initiatives to make the world more open and connected. Just an example: we develop internet.org and providing billions of users, mainly in developing countries, an available and affordable connection to the internet.',
    //     featuredJobLink: 'https://www.facebook.com/careers/locations/tel-aviv'
    //   }
    // },
    {
      name: 'Oracle Ravello',
      logo: oracleLogo,
      url: 'https://www.ravellosystems.com',
      info: {
        height: 300,
        description: 'Oracle’s R&D organization is comprised of engineers with passion and expertise in solving difficult problems in highly scalable environments - from distributed systems and virtualized infrastructure to big-data and probabilistic modeling. A substantial organization with an entrepreneurial fast paced mentality - we are still only just starting; with a lot of positive energy, passion and fast decision making. If it’s in solving immense data-centric challenges like we do at Crosswise, or in changing the way companies consume the public cloud like we do at Ravello - at Oracle you can design and build innovative new systems from the ground up.',
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
      name: 'Cloudinary',
      logo: cloudinaryLogo,
      url: 'http://cloudinary.com/',
      info: {
        height: 300,
        description: <span>At Cloudinary we are building the world’s best platform for end-to-end image and video management. We enable our customers to easily upload images to the cloud, perform smart image manipulations and have their media files delivered lightning fast to their website and mobile app users. Cloudinary offers comprehensive APIs, SDK for all development frameworks and extensive administration capabilities.</span>,
        featuredJobInfo: 'We believe that interacting and working with great, creative, passionate, fun and smart PEOPLE leads to creating amazing products! We are offering you to join this unique working environment in addition to competitive salary and full benefits.',
        featuredJobLink: 'http://cloudinary.com/jobs'
      }
    },
    {
      name: 'Datorama',
      logo: datoramaLogo,
      url: 'https://datorama.com',
      info: {
        height: 300,
        description: 'Datorama is a global marketing analytics company providing the world’s first Marketing Integration Engine for enterprises, agencies, publishers and platforms. Datorama’s software-as-service (SaaS) platform gives marketers the ability to connect all of their data sources together, whether it’s a handful or hundreds, to form a single source of truth for more efficient reporting, better decision making and total control over their marketing performance. Datorama’s best-in-class combination of end-to-end data management, machine learning (AI) technology, and high-performance architecture makes it simple for data-driven marketers of all experience levels to connect, unify, analyze and act on all of their marketing data.',
        featuredJobInfo: 'Datorama is proud to be an equal opportunity workplace and is an affirmative action employer. We are committed to equal employment opportunity regardless of race, color, ancestry, religion, sex, national origin, sexual orientation, age, citizenship, marital status, disability, gender identity or Veteran status.',
        featuredJobLink: 'https://datorama.com/join-us/'
      }
    },
    {
      name: 'LivePerson',
      logo: livepersonLogo,
      url: 'https://www.liveperson.com/',
      info: {
        height: 300,
        description: <span>At LivePerson, our mission is to create meaningful connections.<br/><br/>Connection at the workplace inspires us to serve our clients exceptionally, to work together efficiently, and to get personally involved in our local communities.  Our emphasis on connection leads to more opportunity— whether it’s increased value for our customers, product innovation, or community growth.<br/><br/>LivePerson is a leading provider of cloud-based mobile and online business messaging solutions, enabling a meaningful connection between brands and consumers. LiveEngage, the Company’s enterprise-class platform, empowers consumers to stop wasting time on hold with 1-800 numbers, and instead message their favorite brands, just as they do with friends and family. More than 18,000 businesses, including Adobe, Citibank, HSBC, EE, IBM, L’Oreal, Orange, PNC and The Home Depot rely on the unparalleled intelligence, security and scalability of LiveEngage to reduce costs, increase lifetime value and create meaningful connection with consumers.</span>,
        featuredJobInfo: '',
        featuredJobLink: 'https://www.liveperson.com/company/careers/locations/raanana'
      }
    },
    {
      name: 'Tikal',
      logo: tikalLogo,
      url: 'https://www.tikalk.com/',
      info: {
        height: 300,
        description: 'We are a global software company founded by experts in the open-source community. Our open-source approach provides our clients with value added services, assuring rapid development and easy customization, while eliminating the risk of being held captive by a specific vendor.',
        featuredJobInfo: '',
        featuredJobLink: 'https://www.tikalk.com/careers/'
      }
    },
    {
      name: 'Capriza',
      logo: caprizaLogo,
      url: 'https://www.capriza.com/',
      info: {
        height: 300,
        description: 'Capriza fundamentally disrupts the speed and economics of taking existing business applications mobile. Go mobile by next week with our award-winning enterprise mobility platform.'
      }
    },
    {
      name: 'Automattic',
      logo: automatticLogo,
      url: 'https://automattic.com/',
      info: {
        height: 300,
        description: 'We are the people behind WordPress.com, WooCommerce, Jetpack, Simplenote, Longreads, VaultPress, Akismet, Gravatar, Polldaddy, Cloudup, and more. We believe in making the web a better place.'
      }
    },
  ]);

  renderSponsor(sponsor, index) {
    const { name, logo, url, info } = sponsor;

    if (info) {
      return (
        <div key={index} className={cx('panel', 'align-left')} style={{marginTop: 50}}>
          <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-sm-2', 'col-sm-offset-1', 'spons-logo')} style={{marginBottom:20}}>
              <a href={url}><img src={logo} alt={name} className={cx('img-responsive')} /></a>
            </div>
            <div className={cx('col-sm-8')}>
              <div className={cx('h7')}>About {name}</div>
              <p>{info.description} <a href={url}>{name} website</a>.</p>
              {info.featuredJobLink && <div className={cx('h7')} style={{marginTop: 20}}>Featured Job</div> }
              {info.featuredJobLink && <p>{info.featuredJobInfo} Interested? More info <a href={info.featuredJobLink}>here</a>.</p> }
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

  render() {
    return (
      <section id="sponsors" className={cx('section', 'align-center')}>
        <div className={cx("container")} style={{paddingLeft:15, paddingRight:15}}>
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
