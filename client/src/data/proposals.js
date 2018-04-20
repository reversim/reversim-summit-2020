export const PREDEFINED_TAGS = [
  'Frontend',
  'Backend',
  'Mobile',
  'Infrastructure',
  'Product',
  'Culture'
];

export const PROPOSAL_TYPES = {
  "full": "Full Featured (30 min.)",
  "lightning": "Lightning Talk (5 min.)",
  "ossil": "Open Source in Israel (10 min.)"
};

export const PROPOSAL_TYPES_ARR = Object.keys(PROPOSAL_TYPES).map(type => ({
  value: type, text: PROPOSAL_TYPES[type]
}));

export const CFP_ENDS = new Date(2018, 4, 23);
export const CFP_ENDS_STR = 'May 23rd midnight UTC';
export const CFP_ENDS_STR_SHORT = 'May 23rd';
export const ABSTRACT_MAX=700;
export const ABSTRACT_MIN=280;