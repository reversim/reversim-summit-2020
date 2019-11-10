// NOTE: this mixin file was created to ensure consistent mobile-first media-queris.
import { css } from 'styled-components';
import theme from './Theme';

const breakpoints = theme.mq;

const mediaQueryMin = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  }, {}
);

export default mediaQueryMin;
