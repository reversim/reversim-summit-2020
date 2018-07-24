import React from 'react';
import ical from '../images/ical.gif';

const CalendarLink = () => (
  <div>
    <a
      className="unstyled-link mb-2 d-block"
      target="_blank"
      href="https://calendar.google.com/calendar/ical/feqb8evhmssuc5v0lusrtjkhp4%40group.calendar.google.com/public/basic.ics"
      rel="noopener noreferrer">
      <div className="d-inline-block p-3" style={{border: '1px solid black'}}>
        <i className="fa fa-plus mr-3" />
        <span className="mr-3">Add to calendar</span>
        <img src={ical} alt="download calendar" />
      </div>
    </a>
    <p>
      Clicking here will download an .ics file, which can be imported into any calendar app and
      contains the schedule for easy viewing and notifications during the event.
    </p>
  </div>
);

export default CalendarLink;
