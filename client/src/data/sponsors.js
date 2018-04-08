import outbrainLogo from '../images/sponsors/outbrain.png';
import wixLogo from '../images/sponsors/wix.png';
import datoramaLogo from '../images/sponsors/datorama.png';
import gigyaLogo from '../images/sponsors/gigya.png';
import kenshooLogo from '../images/sponsors/kenshoo.png';
import appsFlyerLogo from '../images/sponsors/apps_flyer.png';
import myHeritageLogo from '../images/sponsors/MH_logo.png';
import klarnaLogo from '../images/sponsors/klarna.png';
import livepersonLogo from '../images/sponsors/liveperson.png';
import tikalLogo from '../images/sponsors/tikal.png';
import facebookLogo from '../images/sponsors/facebook.png';
import akamaiLogo from '../images/sponsors/akamai.png';
import oracleLogo from '../images/sponsors/oracle-logo.png';
import caprizaLogo from '../images/sponsors/capriza.png';
import cloudinaryLogo from '../images/sponsors/cloudinary.png';
import automatticLogo from '../images/sponsors/automattic.png';
import cellebriteLogo from '../images/sponsors/cellebrite.jpg';
import clicktaleLogo from '../images/sponsors/clicktale.png';
import googleLogo from '../images/sponsors/google.png';
// import amazonLogo from '../images/sponsors/amazon.png';

import React from 'react';
import shuffle from 'lodash/shuffle';

const sponsors = shuffle([
  {
    name: 'Gigya',
    logo: gigyaLogo,
    url: 'http://impact.gigya.com',
    description: 'Gigya is using micro-services architecture, cutting-edge distributed programming models and big-data to build a scalable Identity Management SaaS platform.',
    featuredJobInfo: <span><a href="https://jobs.lever.co/gigya/7dfe08be-62a6-4485-a656-34f859c3f93a">Senior C# Server Software Engineer</a>: We handle 1B api calls a day and are looking for .Net developers to come help us build a robust distributed Micro service architecture using our <a href="https://github.com/gigya/microdot">open source framework</a> on top of a cutting edge <a href="https://dotnet.github.io/orleans/">Actor model framework</a>.</span>,
    featuredJobLink: 'http://jobs.jobvite.com/careers/gigya/job/oXDf2fwB?__jvst=Career%20Site'
  },
  {
    name: 'Apps Flyer',
    logo: appsFlyerLogo,
    url: 'http://www.appsflyer.com',
    description: <span>AppsFlyer’s technology is found on 98 percent of the world’s smartphones, making it the global leader in mobile attribution and marketing analytics. Data-driven marketers rely on AppsFlyer for independent measurement solutions and innovative tools to grow their mobile business. AppsFlyer’s platform processes billions of mobile actions every day, empowering mobile marketers and developers to maximize the return on their marketing investments. With AppsFlyer’s NativeTrackTM Attribution, Marketing Analytics Data, OneLink’s Deep linking capabilities and the Active Fraud Suite featuring DeviceRank, AppsFlyer is the go-to resource for the most successful mobile apps in the world. Trusted by Facebook, Google, Twitter, Pinterest, Snap Inc., Tencent, HBO, Playtika, Waze, Alibaba, Kayak and 12,000+ other leading brands and partners, AppsFlyer has 12 global o ces to support every app marketer around the world. To learn more, visit <a href="http://www.appsflyer.com">http://www.appsflyer.com</a>.</span>,
    featuredJobInfo: <span>At AppsFlyer’s back-end development group we shape and improve our micro-services architecture on a daily basis. We work closely with DevOps, Product and Business Development to provide the leading mobile analytics solution while using cutting edge technologies.  We have a totally transparent, very dynamic and highly technical development culture. We ship fast and very often, a matter of days or hours between coding to production, while safely handling 10+ billion system events on any given day AppsFlyer R&D strives to hire highly independent, innovative and responsible engineers who share our passion for technology, quality and speed. If all of this sounds like you, don’t be a stranger, <a href="https://www.appsflyer.com/jobs/senior-backend-developer/">send your CV today</a>!</span>,
    featuredJobLink: 'https://www.appsflyer.com/jobs/senior-backend-developer/',
    excludeWebsite: true
  },
  {
    name: 'Kenshoo',
    logo: kenshooLogo,
    url: 'http://www.kenshoo.com',
    description: 'Marketeers of the world\'s top brands are using Kenshoo\'s platform to drive $350 billion in annualized sales revenue',
    featuredJobInfo: 'We are looking for developers who can get things done, enjoy solving hard problems and like working in a team. Help us solve a huge problem for advertisers and make friends while at it.',
    featuredJobLink: 'http://kenshoo.com/about/company/culture/'
  },
  {
    name: 'Outbrain',
    logo: outbrainLogo,
    url: 'http://www.outbrain.com',
    description: 'Outbrain is the inventor and leader in content discovery. We help people discover interesting content.',
    featuredJobInfo: 'We are looking for an outstanding software engineer who is passionate about quality and bringing value to our users. You will be part of a small, tight-knit, dynamic, hands-on team that takes pride in high coding standards and modern development practices. Each member of our team is a development athlete/all-around-player. You should be able to build a product end-to-end, from the careful mastery of the front-end/client-side to the efficient and maintainable design of the back-end/server-side.',
    featuredJobLink: 'http://outbrain.mytribehr.com/careers'
  },
  {
    name: 'My Heritage',
    logo: myHeritageLogo,
    url: 'http://www.myheritage.com',
    description: <span>As one of <a href="http://uk.businessinsider.com/coolest-tech-startups-in-israel-2017-5/#22-myheritage-online-family-tree-service-4">Israel's most successful start-ups</a>, with over 370 employees, MyHeritage is utilizing the latest technological advancements, such as DNA testing and advanced matching algorithms developed in-house, to discover, preserve and share the family histories of over 90 million users worldwide.<br/><br/>We invite you to join our <a href="http://www.meetup.com/MyHeritage-Meetup/">MyHeritage Meetup Group</a> to receive updates about upcoming events hosted in our office. Come along to discuss cross-technology challenges with our top-notch R&D team.</span>,
    featuredJobInfo: 'Join us - Make history.',
    featuredJobLink: 'https://careers.myheritage.com/positions/engineering'
  },
  {
    name: 'Klarna',
    logo: klarnaLogo,
    url: 'http://www.klarnaisrael.com/',
    description: 'We make online shopping as smooth, simple and safe.',
    featuredJobInfo: 'Web Application Engineer - Klarna Engineering is the driving force behind Klarna\'s global growth. Our work is full of fascinating problems: How do we build delightfully simple products in a complex marketplace? How do we make hundreds of real time credit decisions based on limited data, every minute? How do we provide high availability while working in a micro service architecture where teams deliver new features daily? Fortunately, we have some good solutions: We hire quality-driven engineers from diverse backgrounds, encourage them to grow continually and make it easy for them to get their voices heard. We\'re always on the lookout for curious, friendly and ambitious people to join us.',
    featuredJobLink: 'http://www.klarnaisrael.com/join/'
  },
  {
    name: 'Wix',
    logo: wixLogo,
    url: 'http://www.wix.engineering/',
    description: <span>Wix.com is a leading cloud-based web development platform with more than 110 million users worldwide. Wix was founded on the belief that the Internet should be accessible to everyone to develop, create, and contribute.<br/><br/>Our Software Engineering culture is based on developers who love their work, are passionate about technology, and believe that nothing is impossible. We deploy hundreds of times a day and design our software for ease of change. We use TDD with Scala and JS to develop our microservices, encourage C/I, and we give back to the community by speaking at developer events and contributing to Open-Source. Wix's headquarters are in Tel Aviv, Israel with offices in Be'er Sheva, San Francisco, New York, Miami, Berlin, Vilnius, Kyiv, and Dniepero.</span>,
    featuredJobInfo: <span>At Wix’s Engineering group, lead developers shape the architecture of our services and product. They set the tone and standard of our developer culture, fusing facets of engineering, product management, DevOps, analytics, and technical management. They are also mentors, helping less-experienced engineers improve and hone their skills so that they are eventually capable of being tech leads themselves. The Wix development culture is transparent, highly technical, and agile. Because we ship often, we’ve happily adopted Continuous Delivery and Test-Driven Development. We code in Scala, Python, Go, Javascript and TypeScript. We develop and maintain highly scalable systems that support Wix’s tens of millions of users—and the people who visit their websites.<br/><br/>We strive to hire engineers who have ‘fire and forget’ abilities, and who are independent, innovative, and bold. Does this sound like you? We’re always looking for engineers who share our technical ethos!</span>,
    featuredJobLink: 'http://www.wix.com/jobs/home'
  },
  {
    name: 'Facebook',
    logo: facebookLogo,
    url: 'https://www.facebook.com/careers/',
    description: 'Founded in 2004, Facebook’s mission is to give people the power to build community and bring the world closer together. People use Facebook to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.',
    featuredJobInfo: <span>We are currently building our engineering team here in Tel Aviv and are looking for the best people to join us. Connecting people, building community and bringing the world closer together happens in real time. Our teams are small and nimble. We work quickly and collaboratively to build smarter, more meaningful solutions on a global scale. At Facebook Tel Aviv, we get to work on some of the most interesting and important company initiatives to bring the world closer together. Our teams are developing <a href="http://internet.org/">internet.org</a> and providing millions of users, mainly in developing countries, an available and affordable connection to the internet and with fb.lite, our teams are enabling users to access Facebook in areas with slow or unstable Internet connections, whilst using less data.<br/><br/>When you’re in charge of making a difference, there’s no limit to what you can do. Join us, <a href="https://www.facebook.com/careers/locations/tel-aviv">apply here</a>.<br/><br/>Stay Connected!<br/>Learn about Life at Facebook on Instagram via @facebooklife.<br/>Join our Facebook Careers Talent Community Page for the latest updates.</span>,
    featuredJobLink: 'https://www.facebook.com/careers/locations/tel-aviv',
    excludeWebsite: true
  },
  {
    name: 'Oracle R&D',
    logo: oracleLogo,
    url: 'https://www.oracle.com',
    description: 'Oracle’s R&D organization is comprised of engineers with passion and expertise in solving difficult problems in highly scalable environments - from distributed systems and virtualized infrastructure to big-data and probabilistic modeling. A substantial organization with an entrepreneurial fast paced mentality - we are still only just starting; with a lot of positive energy, passion and fast decision making. If it’s in solving immense data-centric challenges like we do at Crosswise, or in changing the way companies consume the public cloud like we do at Ravello - at Oracle you can design and build innovative new systems from the ground up.',
    featuredJobInfo: <span>From the bits and bytes of x86 architecture, through virtualization, networking and storage, and all the way up to highly scalable and resilient SaaS back-end and front-end - We have it all at <a href="https://cloud.ravellosystems.com/jobs/jobs-list.html#jobs-list">Ravello</a>.<br/><br/>If you are into solving huge data-centric challenges by applying advanced data science and proprietary machine learning techniques - We have it all at <a href="https://www.crosswise.com/jobs/jobs-list.html">Crosswise</a>.<br/><br/>If you are top notch at what you do, a team player who gets the job done, a curious self-learner looking for ways to grow, a ROSH GADOL - you are a great fit.</span>,
    featuredJobLink: 'https://www.ravellosystems.com/jobs',
    excludeWebsite: true
  },
  {
    name: 'Akamai',
    logo: akamaiLogo,
    url: 'http://www.akamai.com',
    description: 'Akamai is the global leader in Content Delivery Network (CDN) services, making the Internet business ready—fast, reliable, and secure—for its customers. We operate the most pervasive, highly distributed CDN—with more than 200,000 servers in 110 or more countries—delivering up to 30% of all Web traffic.',
    featuredJobInfo: 'We\'re currently looking for software engineers and test/automation engineers with strong Java background to join our web and cloud security teams! As a part of these teams, you\'ll be working on innovating and developing new and groundbreaking Security and BigData products in the largest scales.',
    featuredJobLink: 'https://akamaijobs.referrals.selectminds.com/'
  },
  {
    name: 'Cloudinary',
    logo: cloudinaryLogo,
    url: 'http://cloudinary.com/',
    description: <span>At Cloudinary we are building the world’s best platform for end-to-end image and video management. We enable our customers to easily upload images to the cloud, perform smart image manipulations and have their media files delivered lightning fast to their website and mobile app users. Cloudinary offers comprehensive APIs, SDK for all development frameworks and extensive administration capabilities.</span>,
    featuredJobInfo: 'We believe that interacting and working with great, creative, passionate, fun and smart PEOPLE leads to creating amazing products! We are offering you to join this unique working environment in addition to competitive salary and full benefits.',
    featuredJobLink: 'http://cloudinary.com/jobs'
  },
  {
    name: 'Datorama',
    logo: datoramaLogo,
    url: 'https://datorama.com',
    description: <span>Datorama is a data agnostic Marketing Integration Engine that centralizes all your data — wherever it comes from, whatever it looks like, however much it changes — and gives you the control to analyze, experiment, report and take action on all that data in real time.<br/><br/>Datorama's website - <a href="https://datorama.com">https://datorama.com</a></span>,
    featuredJobInfo: <span>We're growing like crazy and need the best of the best to help us build what appears to be the hottest marketing analytics platform in the industry.<br/>The standards are high, you'll be working with extremely talented peers who expect you to be just as good and even better.<br/>We're obsessed with clean code, testing and continuous delivery, so you better be too.<br/><br/>Jobs - <a href="https://datorama.com/join-us/">https://datorama.com/join-us/</a></span>,
    featuredJobLink: 'https://datorama.com/join-us/',
    excludeWebsite: true
  },
  {
    name: 'LivePerson',
    logo: livepersonLogo,
    url: 'https://www.liveperson.com/',
    description: <span>At LivePerson, our mission is to create meaningful connections.<br/><br/>Connection at the workplace inspires us to serve our clients exceptionally, to work together efficiently, and to get personally involved in our local communities.  Our emphasis on connection leads to more opportunity— whether it’s increased value for our customers, product innovation, or community growth.<br/><br/>LivePerson is a leading provider of cloud-based mobile and online business messaging solutions, enabling a meaningful connection between brands and consumers. LiveEngage, the Company’s enterprise-class platform, empowers consumers to stop wasting time on hold with 1-800 numbers, and instead message their favorite brands, just as they do with friends and family. More than 18,000 businesses, including Adobe, Citibank, HSBC, EE, IBM, L’Oreal, Orange, PNC and The Home Depot rely on the unparalleled intelligence, security and scalability of LiveEngage to reduce costs, increase lifetime value and create meaningful connection with consumers.</span>,
    featuredJobInfo: '',
    featuredJobLink: 'https://www.liveperson.com/company/careers/locations/raanana'
  },
  {
    name: 'Tikal',
    logo: tikalLogo,
    url: 'https://www.tikalk.com/',
    description: <span>
      We are a software company and a home for passionate developers with self-driven mission, to solve our client’s complex challenges while sharing our technological expertise with the community.<br/>
      We help our clients build great software in various ways and platforms. Our services range from expert support services, aimed to boost development workflow and get the job done on-time, to personal consultancy and educational workshops.<br/><br/>
      Staying close to the code<br/>
      Working at Tikal means gaining hands-on experience in different platforms while staying close to the most innovative technologies out there. We encourage all our developers to work on diverse projects and empower them with valuable workshops and community events.<br/>
      This is our way of keeping an interesting and challenging atmosphere, while enabling all our staff to always remain updated with new technologies.</span>,
    featuredJobInfo: '',
    featuredJobLink: 'http://www.tikalk.com/careers/'
  },
  {
    name: 'Capriza',
    logo: caprizaLogo,
    url: 'https://www.capriza.com/',
    description: 'Capriza fundamentally disrupts the speed and economics of taking existing business applications mobile. Go mobile by next week with our award-winning enterprise mobility platform.'
  },
  {
    name: 'Automattic',
    logo: automatticLogo,
    url: 'https://automattic.com/',
    description: 'We are the people behind WordPress.com, WooCommerce, Jetpack, Simplenote, Longreads, VaultPress, Akismet, Gravatar, Polldaddy, Cloudup, and more. We believe in making the web a better place.',
    featuredJobInfo: <span>At Automattic, everyone works from the location they choose. We’re spread out all over the world in more than 50 countries.<br/><br/>Whether it is building new ways to interact with WordPress using modern JavaScript tools like React and Redux, or building a connected search platform for billions of readers using ElasticSearch and Kafka, we\'re looking for developers with a passion for creating experiences that users will rave about, the ability to iterate and ship ideas quickly, and a love of Open Source software.<br/><br/>Interested? Learn about Automattic and <a href="https://automattic.com/work-with-us/">the future of work</a>.</span>,
    featuredJobLink: "https://automattic.com/work-with-us/",
    excludeWebsite: true
  },
  {
    name: 'Cellebrite',
    logo: cellebriteLogo,
    url: 'http://www.cellebrite.com/',
    description: <span>Cellebrite is a global company known for its breakthroughs in mobile data technology, delivering comprehensive solutions for mobile forensics & mobile lifecycle management.<br/>Our innovative platform help Law-Enforcement agencies worldwide to fight serious-crime by providing a high-end mobile forensics solution which extracts, decodes and analyses actionable data from mobile devices using a myriad of cutting-edge technologies ranging from byte-level data understanding and cryptanalysis to Big-Data Analytics and Neural-Networks based Machine Learning. Our solutions deployed to law enforcement, police and security agencies in over 100 countries.</span>,
    featuredJobInfo: <span>At Cellebrite we embrace excellence, our engineering teams strive to embody our core company values: Impact you focus on a great result rather than only the process. Communication you show & listen rather than tell. Courage you don’t afraid to learn and master new domains. Innovation be cleaver and not always smart. Craftsmanship you design it, build it and ship it. <br/>We are looking for leaders (Fullstack, backend, Team leaders) with strong java background who will join our analytics platform and help us shape the world to a safer place.</span>,
    featuredJobLink: "http://www.cellebrite.com/Careers/java-backend-team-leader-jb-487"
  },
  {
    name: 'Clicktale',
    logo: clicktaleLogo,
    url: 'https://www.clicktale.com/',
    description: 'Clicktale taps into the wisdom and behavior of millions of visitors so that businesses can deliver the best digital experiences to drive amazing business results. By synthesizing complex behavioral patterns based on millisecond-level actions such as hovers and scrolls, we enable businesses to interpret their customers’ digital body language and understand intent. The pioneer in Experience Analytics, Clicktale marries cognitive computing, machine learning and psychological research to automatically surface issues and answer questions that keep executives up at night.',
    featuredJobInfo: 'We are looking for strong engineers who really love the challenges of high-scalability. We are already crunching tens of billions of signals a day and we are planning to go x5 or even x10 in the coming year. So, if tech challenges is your thing, come and join us!',
    featuredJobLink: "https://www.clicktale.com/company/careers/D740F"
  },
  {
    name: 'Google',
    logo: googleLogo,
    url: 'https://careers.google.com/locations/tel-aviv-haifa/',
    description: 'Google\'s software engineers develop the next-generation technologies that change how millions of users connect, explore, and interact with information and one another. Our ambitions reach far beyond just Search. Our products need to handle information at the scale of the web. We\'re looking for ideas from every area of computer science, including information retrieval, artificial intelligence, natural language processing, distributed computing, large-scale system design, networking, security, data compression, and user interface design; the list goes on and is growing every day. As a software engineer, you work on a small team and can switch teams and projects as our fast-paced business grows and evolves. We need our engineers to be versatile and passionate to tackle new problems as we continue to push technology forward.',
    featuredJobInfo: '',
    featuredJobLink: 'https://careers.google.com/jobs#!t=jo&jid=/google/full-stack-software-engineer-yigal-alon-98-tel-aviv-yafo-israel-1640920118&'
  },
  // {
  //   name: 'Amazon',
  //   logo: amazonLogo,
  //   url: '',
  //   description: '',
  //   featuredJobInfo: '',
  //   featuredJobLink: ""
  // },
]);

export default sponsors;
