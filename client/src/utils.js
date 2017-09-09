const proposalTypes = {
  "full": "Full Featured (30-40 min.)",
  "lightning": "Lightning Talk (5 min.)",
  "ossil": "Open Source in Israel (10 min."
};

export const getSessionTypeStr = type => proposalTypes[type];
