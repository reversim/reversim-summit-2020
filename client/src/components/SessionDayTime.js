import React from 'react';
import {agenda1, agenda2} from '../data/agenda';
import halls from '../data/halls';

const agenda = [agenda1, agenda2];

const _getDateAndTime = (index, id) => {
  let day, time, hall;
  agenda[index].forEach(slot => {
    if (time) return;

    if (Array.isArray(slot.sessions)) {
      slot.sessions.forEach((ss, i) => {
        if (ss === id) {
          day = index;
          time = slot.time;
          hall = i;
        } else if (ss && ss.sessions) {
          ss.sessions.forEach(sss => {
            if (sss === id) {
              day = index;
              time = slot.time;
              hall = i;
            }
          });
        }
      });
    } else if (typeof slot.sessions === 'string') {
      if (slot.sessions === id) {
        day = index;
        time = slot.time;
        hall = 0;
      }
    } else if (slot.shortSessions) {
      slot.shortSessions.forEach(ss => {
        if (ss === id) {
          day = index;
          time = slot.time;
          hall = 0;
        }
      });
    }
  });

  if (time) {
    return {day, time, hall};
  }
};

export const getDateAndTime = id => {
  return _getDateAndTime(0, id) || _getDateAndTime(1, id);
};

export default ({id}) => {
  const dateTime = getDateAndTime(id);
  if (dateTime) {
    const {day, time, hall} = dateTime;
    return (
      <span className="font-mono font-weight-heavy">
        Day {day + 1}
        {'\u00A0'}|{'\u00A0'}
        {time}
        {'\u00A0'}|{'\u00A0'}
        {halls[hall]}
      </span>
    );
  } else return null;
};
