import outbrainLogo from '../images/sponsors/outbrain.png';
import wixLogo from '../images/sponsors/wix.png';
// import datoramaLogo from '../images/sponsors/datorama.png';
// import gigyaLogo from '../images/sponsors/gigya.png';
import kenshooLogo from '../images/sponsors/kenshoo.png';
import appsFlyerLogo from '../images/sponsors/apps_flyer.png';
import myHeritageLogo from '../images/sponsors/MH_logo.png';
// import klarnaLogo from '../images/sponsors/klarna.png';
import livepersonLogo from '../images/sponsors/liveperson.png';
// import tikalLogo from '../images/sponsors/tikal.png';
// import facebookLogo from '../images/sponsors/facebook.png';
// import akamaiLogo from '../images/sponsors/akamai.png';
// import oracleLogo from '../images/sponsors/oracle-logo.png';
// import caprizaLogo from '../images/sponsors/capriza.png';
import cloudinaryLogo from '../images/sponsors/cloudinary.png';
// import automatticLogo from '../images/sponsors/automattic.png';
// import cellebriteLogo from '../images/sponsors/cellebrite.jpg';
// import clicktaleLogo from '../images/sponsors/clicktale.png';
// import googleLogo from '../images/sponsors/google.png';
import amazonLogo from '../images/sponsors/amazon.png';
import microsoftLogo from '../images/sponsors/microsoft.jpg';
import ebayLogo from '../images/sponsors/ebay.png';
import dropboxLogo from '../images/sponsors/dropbox.png';

import React from 'react';
import shuffle from 'lodash/shuffle';

const sponsors = shuffle([
  {
    name: 'Wix',
    logo: wixLogo,
    url: 'https://www.wix.engineering/',
    description: <span>Wix.com is a leading cloud-based web development platform with more than 110 million users worldwide. Wix was founded on the belief that the Internet should be accessible to everyone to develop, create, and contribute.<br/>
      Our Software Engineering culture is based on developers who love their work, are passionate about technology, and believe that nothing is impossible. We deploy hundreds of times a day and design our software for ease of change. We use TDD with Scala and JS to develop our microservices, encourage C/I, and we give back to the community by speaking at developer events and contributing to Open-Source. Wix's headquarters are in Tel Aviv, Israel with offices in Be'er Sheva, San Francisco, New York, Miami, Berlin, Vilnius, Kyiv, and Dnipro - Wix's website.</span>,
    featuredJobInfo: 'At Wix’s Engineering group, lead developers shape the architecture of our services and product. They set the tone and standard of our developer culture, fusing facets of engineering, product management, DevOps, analytics, and technical management. They are also mentors, helping less-experienced engineers improve and hone their skills so that they are eventually capable of being tech leads themselves. The Wix development culture is transparent, highly technical, and agile. Because we ship often, we’ve happily adopted Continuous Delivery and Test-Driven Development. We code in Scala, Python, Go, Javascript and TypeScript. We develop and maintain highly scalable systems that support Wix’s tens of millions of users—and the people who visit their websites.',
    featuredJobLink: 'https://www.wix.com/jobs/home'
  },
  {
    name: 'Microsoft',
    logo: microsoftLogo,
    url: 'https://www.microsoft.com/',
    description: 'The Microsoft Israel R&D Center, located in both Herzeliya and Haifa, is one of three strategic global development centers situated around the world. Our mission is to lead strategic products and services that realize Microsoft\'s vision, by tapping into Israel\'s unique technological & entrepreneurial assets. The center is home to some of the company\'s most exciting and innovative technologies driven by a collective of rare and diverse individuals.',
    featuredJobInfo: '',
    featuredJobLink: 'https://careers.microsoft.com/'
  },
  {
    name: 'eBay',
    logo: ebayLogo,
    url: 'http://ebay.co.il',
    description: <span>eBay Israel R&D center offers you a great playground - whether you are a software engineer, analyst or researcher.  With over 1.2 billion items, all ready-to-buy, your day-to-day job will be super dynamic and interesting, and you\'ll be able to use techniques like ML, NLP, Taxonomy management, Computer Vision and more.<br/>
    You may have a meaningful contribution to eBay\'s platform and thus to the entire shopping experience.  Through our organizational culture, you\'ll impact not only on internal processes, but also the lives of tens of millions of people around the world, by delivering eBay\'s core strategy.<br/>
    Join us on Facebook: eBay Israel - R&D Center</span>,
    featuredJobInfo: '',
    featuredJobLink: 'http://ebay.co.il/rnd',
  },
  {
    name: 'Cloudinary',
    logo: cloudinaryLogo,
    url: 'https://cloudinary.com/',
    description: 'Cloudinary provides an easy-to-use, end-to-end cloud-based image and video management solution for the world’s top brands. With 5,000 customers and nearly 300,000 users, Cloudinary has quickly become the de facto solution used by web and mobile application developers to streamline image and video management and deliver an optimal end user experience.',
    featuredJobInfo: 'We believe that interacting and working with great, creative, passionate, fun and smart PEOPLE leads to creating amazing products! We are offering you to join this unique working environment in addition to competitive salary and full benefits.',
    featuredJobLink: 'https://cloudinary.com/jobs'
  },
  {
    name: 'Kenshoo',
    logo: kenshooLogo,
    url: 'http://www.kenshoo.com',
    description: 'Marketeers of the world\'s top brands are using Kenshoo\'s platform to drive $350 billion in annualized sales revenue Kenshoo\'s website.',
    featuredJobInfo: 'We are looking for developers who can get things done, enjoy solving hard problems and like working in a team. Help us solve a huge problem for advertisers and make friends while at it.',
    featuredJobLink: 'http://kenshoo.com/about/company/culture/'
  },
  {
    name: 'LivePerson',
    logo: livepersonLogo,
    url: 'http://www.liveperson.com',
    description: 'LivePerson is the global leader in digital communication solutions and we aim to make life easier by transforming how people communicate with brands. Our 18,000 customers, including leading brands like Citibank, HSBC, Orange, and The Home Depot, use our conversational commerce solutions to orchestrate humans and AI, at scale, and create a convenient, deeply personal relationship — a conversational relationship — with their millions of consumers.Join this digital revolution and work on one of the biggest OpenStack cloud services in the world! We invest heavily in artificial intelligence, bots, big data technologies, real-time analytics and messaging solutions, all hosted on our dynamic open platform.',
    featuredJobInfo: '',
    featuredJobLink: 'https://www.liveperson.com/company/careers?gh_jid=769715'
  },
  {
    name: 'Dropbox',
    logo: dropboxLogo,
    url: 'https://www.dropbox.com',
    description: 'Dropbox is a leading global collaboration platform that\'s transforming the way people work together, from the smallest business to the largest enterprise. With more than 500 million registered users across more than 180 countries, our mission is to unleash the world’s creative energy by designing a more enlightened way of working.Our mission in Tel Aviv is to reshape the future of work by designing a more enlightened way of working. We aim-higher in everything we do and work hard to gain our users’ love and trust. We have a unique combination of start-up energy and enthusiasm with world class software engineering standards, which attracts the best talent to join us in our quest to conquer the next peak.',
    featuredJobInfo: '',
    featuredJobLink: 'https://www.dropbox.com/jobs/locations/tlv'
  },
  {
    name: 'Outbrain',
    logo: outbrainLogo,
    url: 'http://www.outbrain.com',
    description: <span>Outbrain is the world’s largest discovery platform, bringing personalized, relevant online, mobile and video content to audiences while helping publishers understand their audiences through data. Our core technology relays on recommendation systems using state of the art machine learning models and deep learning built using big data. Every day, Outbrain engineers overcome technology challenges with the help of experienced mentors and a unique culture encouraging taking risks, ownership, and co-working. Take a look at our technology story in <a href="http://goo.gl/CgLhc8">Outbrain's tech blog</a> where engineers share their knowledge and experience.</span>,
    featuredJobInfo: '',
    featuredJobLink: 'https://careers.outbrain.com/index.html'
  },
  {
    name: 'Amazon',
    logo: amazonLogo,
    url: 'https://www.amazon.jobs/location/tel-aviv-israel?offset=0&result_limit=10&sort=relevant&business_category%5b%5d=amazon-web-services&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=&city=&country=&region=&county=&query_options=&',
    description: <span>When Amazon.com launched in 1995, it was with the mission “to be Earth’s most customer-centric company, where customers can find and discover anything they might want to buy online, and endeavors to offer its customers the lowest possible prices.”<br/><br/>
      Amazon Web Services (AWS) is a subsidiary of Amazon.com that provides on-demand cloud computing platforms to individuals, companies and governments, on a paid subscription basis.</span>,
    featuredJobInfo: 'Come and join us!',
    featuredJobLink: 'https://www.amazon.jobs/location/tel-aviv-israel?offset=0&result_limit=10&sort=relevant&business_category%5b%5d=amazon-web-services&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=&city=&country=&region=&county=&query_options=&',
  },
  {
    name: 'AppsFlyer',
    logo: appsFlyerLogo,
    url: 'http://www.appsflyer.com',
    description: 'AppsFlyer’s technology is found on 98 percent of the world’s smartphones, making it the global leader in mobile attribution and marketing analytics. Data-driven marketers rely on AppsFlyer for independent measurement solutions and innovative tools to grow their mobile business. AppsFlyer’s platform processes billions of mobile actions every day, empowering mobile marketers and developers to maximize the return on their marketing investments. With AppsFlyer’s NativeTrackTM Attribution, Marketing Analytics Data, OneLink’s Deep linking capabilities and the Active Fraud Suite featuring DeviceRank, AppsFlyer is the go-to resource for the most successful mobile apps in the world. Trusted by Facebook, Google, Twitter, Pinterest, Snap Inc., Tencent, HBO, Playtika, Waze, Alibaba, Kayak and 12,000+ other leading brands and partners, AppsFlyer has 12 global offices to support every app marketer around the world. To learn more, visit http://www.appsflyer.com.',
    featuredJobInfo: '',
    featuredJobLink: ''
  },
  {
    name: 'My Heritage',
    logo: myHeritageLogo,
    url: 'https://careers.myheritage.com/',
    description: <span>As one of Israel's most successful start-ups, with over 420 employees, MyHeritage is utilizing the latest technological advancements, such as DNA testing and advanced matching algorithms developed in-house, to discover, preserve and share the family histories of over 95 million users worldwide.<br/>
      We invite you to join our <a href="https://www.meetup.com/MyHeritage-Meetup/">MyHeritage Meetup Group</a> to receive updates about upcoming events hosted in our office. Come along to discuss cross-technology challenges with our top-notch R&D team and visit our fascinating <a href="https://medium.com/myheritage-engineering">Engineering blog.</a></span>,
    featuredJobInfo: 'Join us - Make history.',
    featuredJobLink: 'https://careers.myheritage.com/'
  },

]);

export default sponsors;
