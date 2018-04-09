import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import { CFP_ENDS, PROPOSAL_TYPES } from './data/proposals';

export const getSessionTypeStr = type => PROPOSAL_TYPES[type];

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
const history = isServer ? createMemoryHistory() : createBrowserHistory();

export const navigateTo = (route) => history.push(route);

export const REVERSIM_SUMMIT = "Reversim Summit 2018";

export const getRemainingCFPDays = () => {
  const today = new Date();
  return Math.ceil((CFP_ENDS - today) / 86400000);
};

export const getSpeakerHref = (user) => isServer ? `${user._id}.html` : user._id;