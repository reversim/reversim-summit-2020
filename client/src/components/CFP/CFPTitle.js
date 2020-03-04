import React, { Fragment } from 'react';
import styled from 'styled-components';

import {CFP_ENDS_STR_SHORT} from '../../data/proposals';
import {getRemainingCFPDays, REVERSIM_SUMMIT} from '../../utils';
import CFPIntro from './CFPIntro';
import {
  AlignCenterColumn,
  Heading2,
  BreakLineInverted,
  Heading4,
} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

//styled-components section
const TitleContainer = styled.div`
  ${({ theme: { color, space } }) => `
    padding: calc(3 * ${space.xxl}) 0 ${space.xxl} 0;
    background: ${color.background_2};

    display: flex;
    justify-content: center;
  `}
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PageTitle = styled(Heading2)`
  ${({ theme: { color } }) => `
    color: ${color.text_1};
  `}
  ${mediaQueryMin.l`
    white-space: normal;
  `}
`;

const Dash = styled(PageTitle)`
  display: none;
  ${mediaQueryMin.xxl`
  display: inline;
  `}
`;

const HorizontalLine = styled(BreakLineInverted)`
  ${mediaQueryMin.s`
    width: 100%;
    max-height: 1vh;
    align-self: flex-start;
    margin-left: 0;
  `}
`;

const Deadline = styled(Heading4)`
  ${({ theme: { color } }) => `
    color: ${color.important};
  `}
`;

const CountDown = styled.p`
  ${({ theme: { color, font } }) => `
    color: ${color.count_down};
    font-weight: ${font.weight_bold};
  `}
`;

const DaysRemaining = styled.span`
  ${({ theme: { color, space } }) => `  
    padding: ${space.s} ${space.m};
    box-sizing: content-box;
    display: inline-block;
    
    color: ${color.text_3};
    line-height: 20px;
    letter-spacing: 1px;

    background: ${color.background_count_down};
    border-radius: 14px;
  `}
`;

const ClosedContainer = styled(AlignCenterColumn)`
  height: 70vh;
  justify-content: center;
`;


//React component section
const CFPTitle = (props) => {
  const {eventConfig} = props;
  const remainingDays = getRemainingCFPDays();
  const isToday = remainingDays <= 0;
  return (
    <Fragment>
      <TitleContainer>
      {eventConfig.cfp //IMPORTANT: remove bang
      ? (
          <AlignCenterColumn>
            <HeadingContainer>
              <PageTitle>{REVERSIM_SUMMIT}</PageTitle>
              <Dash>-</Dash>
              <PageTitle>Proposal Submission</PageTitle>
            </HeadingContainer>
            <HorizontalLine />
            <Heading4>Read carefully before submission!</Heading4>
            <Deadline>Deadline: {isToday ? 'Today!' : CFP_ENDS_STR_SHORT}</Deadline>
            {isToday && (
              <CountDown>
                <DaysRemaining>{remainingDays}</DaysRemaining> days remaining
              </CountDown>
            )}
          </AlignCenterColumn>
        )
      : (
          <ClosedContainer>
            <HeadingContainer>
              <PageTitle>{REVERSIM_SUMMIT}</PageTitle>
              <Dash>-</Dash>
              <PageTitle>CFP ended on {CFP_ENDS_STR_SHORT}</PageTitle>
            </HeadingContainer>
            <HorizontalLine />
          </ClosedContainer>
        )
      }
      </TitleContainer>
      {eventConfig.cfp && <CFPIntro />}
    </Fragment>
  );
};

export default CFPTitle;
