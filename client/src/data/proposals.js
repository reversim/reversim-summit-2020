export const PREDEFINED_TAGS = [
  'Frontend',
  'Backend',
  'Mobile',
  'Infrastructure',
  'Product',
  'Culture',
];

export const PROPOSAL_TYPES = {
  full: 'Full Featured (30 min.)',
  lightning: 'Lightning Talk (5 min.)',
  ossil: 'Open Source in Israel (10 min.)',
};

export const PROPOSAL_TYPES_SHORT = {
  full: 'Full',
  lightning: 'Ignite',
  ossil: 'OSSil',
};

export const PROPOSAL_TYPES_ARR = Object.keys(PROPOSAL_TYPES).map(type => ({
  value: type,
  text: PROPOSAL_TYPES[type],
}));

export const CFP_ENDS = new Date(2019, 2, 20);
export const CFP_ENDS_STR = 'February 20st midnight UTC';
export const CFP_ENDS_STR_SHORT = 'Feb 20';
export const ABSTRACT_MAX = 700;
export const ABSTRACT_MIN = 280;

export const CATEGORIES = [
  {name: 'Backend', description: 'Data, operation, infrastructure, cloud & scale'},
  {name: 'Frontend', description: 'Building modern frontends'},
  {name: 'Mobile', description: 'Emerging technologies in mobile development'},
  {
    name: 'Quality',
    description:
      'Building quality systems (monitoring, alerting, dev methodologies, process, testing, automation, etc.)',
  },
  {
    name: 'Artificial Intelligence',
    description: 'Building intelligent systems (AI, ML, DS, etc.)',
  },
  {name: 'Programming', description: 'Programming languages, API design, paradigms, etc.'},
  {
    name: 'Culture',
    description: 'Scaling organizations, management, motivation, employee engagement',
  },
  {name: 'Customer', description: 'Product, UX, design, marketing, customer oriented'},
];

export const MAX_CATEGORIES = 2;

export const TAG_COLORS = {
  craft: 'purple',
  frontend: 'teal',
  'ai/ml': 'indigo',
  product: 'red',
  culture: 'orange',
  security: 'yellow',
  infrastructure: 'green',
  quality: 'lightgreen',
  programming: 'blue',
  'open source': 'pink',
};
