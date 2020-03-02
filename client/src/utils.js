import {createMemoryHistory, createBrowserHistory} from 'history';
import {CFP_ENDS, PROPOSAL_TYPES, PROPOSAL_TYPES_SHORT} from './data/proposals';

export const getSessionTypeStr = type => PROPOSAL_TYPES[type];
export const getSessionTypeShortStr = type => PROPOSAL_TYPES_SHORT[type];

export const getTagStr = tag =>
  tag.toLowerCase() === 'ai/ml' ? 'AI/ML' : `${tag[0].toUpperCase()}${tag.slice(1).toLowerCase()}`;

export const colors = ['purple', 'gold', 'cyan', 'blue', 'pink', 'yellow', 'green', 'orange'];

export const isServer = window === '__server';
export const history = isServer ? createMemoryHistory() : createBrowserHistory();

export const REVERSIM_SUMMIT = 'Reversim Summit 2020';
export const REVERSIM_MAIL = 'rs20team@googlegroups.com';

export const getRemainingCFPDays = () => {
  const today = new Date();
  return Math.ceil((CFP_ENDS - today) / 86400000);
};

export const getHref = obj => (isServer ? `${obj._id}.html` : obj._id);

let _key = 1;
export const key = () => ++_key;
export const hyperlink = url => {
  if (!url) {
    // empty or null
    return null;
  }
  if (url.startsWith("http")) {
    return url;
  }
  return `http://${url}`;
};

export const loadScript = src => {
  let tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('body')[0].appendChild(tag);
};
