import React from 'react';
import styled from 'styled-components';

import {CFP_ENDS_STR_SHORT} from '../../data/proposals';
import {getRemainingCFPDays, REVERSIM_SUMMIT} from '../../utils';
import {daysRemaining} from './CFPPage.css';
import {
  AlignCenterColumn,
  Heading2,
  BreakLineInverted,
  Heading4,
} from '../GlobalStyledComponents/ReversimStyledComps';
import mediaQueryMin from '../../styles/MediaQueriesMixin';

const TitleContainer = styled.div`
  ${({ theme: { color, space } }) => `
    padding: calc(3 * ${space.xxl}) 0 ${space.xxl} 0;
    background: ${color.background_2};
  `}
`;
const PageTitle = styled(Heading2)`
  ${({ theme: { color } }) => `
    color: ${color.text_1};
  `}
`;

const HorizontalLine = styled(BreakLineInverted)`
  ${mediaQueryMin.s`
    width: 100%;
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
    box-sizing: content-box;
    display: inline-block;
    padding: ${space.s} ${space.m};
    line-height: 20px;
    border-radius: 14px;
    background: ${color.background_count_down};
    letter-spacing: 1px;
  `}
`;

const CFPTitle = (props) => {
  const {eventConfig} = props;
  const remainingDays = getRemainingCFPDays();
  const isToday = remainingDays <= 0;
  return (
    <TitleContainer>
    {eventConfig.cfp
    ?(
      <AlignCenterColumn>
        <PageTitle>{REVERSIM_SUMMIT} - Proposal Submission</PageTitle>
        <HorizontalLine />
        <Heading4>Read carefully before submission!</Heading4>
        <Deadline className="text-red">Deadline: {isToday ? 'Today!' : CFP_ENDS_STR_SHORT}</Deadline>
        {isToday && (
          <CountDown>
            <DaysRemaining>{remainingDays}</DaysRemaining> days remaining
          </CountDown>
        )}
      </AlignCenterColumn>
      )
    :(
      <h1 className="my-5 text-primary text-white">{REVERSIM_SUMMIT} - CFP is closed!</h1>
    )}
    </TitleContainer>
  );
};

export default CFPTitle;
