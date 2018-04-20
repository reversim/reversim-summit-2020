import React from 'react';
import { CFP_ENDS_STR_SHORT } from '../data/proposals';
import { getRemainingCFPDays, REVERSIM_SUMMIT } from '../utils';
import { daysRemaining } from './CFPPage.css';

const CFPTitle = () => {
  const remainingDays = getRemainingCFPDays();
  const isToday = remainingDays <= 0;
  return <div className="text-center border-bottom pb-5 mb-5">
    <h1 className="my-5 text-primary">{REVERSIM_SUMMIT} - Submission</h1>
    <h4 className="mb-5 text-gray-600">Read carefully before submission!</h4>
    <h4 className="text-red">
      Deadline: {isToday ? 'Today!' : CFP_ENDS_STR_SHORT}
    </h4>
    {!isToday &&
    <div className="text-gray-600"><span className={daysRemaining}>{remainingDays}</span> days
      remaining</div>}
  </div>
};

export default CFPTitle;