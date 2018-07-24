import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import {CFP_ENDS, PROPOSAL_TYPES} from './data/proposals';

export const getSessionTypeStr = type => PROPOSAL_TYPES[type];

export const colors = ['purple', 'gold', 'cyan', 'blue', 'pink', 'yellow', 'green', 'orange'];

export const isServer = window === '__server';
export const history = isServer ? createMemoryHistory() : createBrowserHistory();

export const REVERSIM_SUMMIT = 'Reversim Summit 2018';
export const REVERSIM_MAIL = 'rs18-team@googlegroups.com';

export const getRemainingCFPDays = () => {
  const today = new Date();
  return Math.ceil((CFP_ENDS - today) / 86400000);
};

export const getHref = obj => (isServer ? `${obj._id}.html` : obj._id);
