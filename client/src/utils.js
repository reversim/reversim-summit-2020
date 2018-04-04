const proposalTypes = {
  "full": "Full Featured (30-40 min.)",
  "lightning": "Lightning Talk (5 min.)",
  "ossil": "Open Source in Israel (10 min.)"
};

export const getSessionTypeStr = type => proposalTypes[type];

export const colors = [
  'purple',
  'gold',
  'cyan',
  'blue',
  'pink',
  'yellow',
  'green',
  'orange'
];

export const isServer = window === "__server";

export const REVERSIM_SUMMIT = "Reversim Summit 2018";
