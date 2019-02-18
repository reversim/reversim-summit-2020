export const PREDEFINED_TAGS = [
  'Engineering',
  'Product',
  'Culture',
];

export const PROPOSAL_TYPES = {
  full: 'Full Featured (30 min.)',
  postmortem: 'Postmortem (15 min.)',
  lightning: 'Lightning Talk (5 min.)',
  ossil: 'Open Source in Israel (10 min.)',
};

export const PROPOSAL_TYPES_SHORT = {
  full: 'Full',
  postmortem: 'Postmortems',
  lightning: 'Ignite',
  ossil: 'OSSil',
};

export const PROPOSAL_TYPES_ARR = Object.keys(PROPOSAL_TYPES).map(type => ({
  value: type,
  text: PROPOSAL_TYPES[type],
}));

export const CFP_ENDS = new Date(2019, 1, 28);
export const CFP_ENDS_STR = 'February 28st midnight UTC';
export const CFP_ENDS_STR_SHORT = 'Feb 28';
export const ABSTRACT_MAX = 800;
export const ABSTRACT_MIN = 280;

export const CATEGORIES = [
  {
    name: 'Engineering',
    description: 'All things development'},
  {
    name: 'Product',
    description: 'Customer facing development / UX / design / product / marketing'},
  {
    name: 'Culture',
    description: 'Culture / scaling organizations / management / motivation and employee engagement',
  },
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
