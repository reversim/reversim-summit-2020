import React from 'react';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import s from './Agenda.css';
import cn from 'classnames';
import { agenda1, agenda2 } from '../data/agenda';
import {Link} from "react-router-dom";

const _getSession = (sessions, id) => sessions.find(ss => ss.id === id);
const getSession = (sessions, id) => {
  if (id.sessions) return { ...id, sessions: id.sessions.map(x => _getSession(sessions, x)) };
  else return _getSession(sessions, id);
};

const getSpeakerName = (session) => session.speaker_ids.map(ss => ss.name).join(" & ");

const Time = ({tStr}) => (
  <div><span className={s.tall}>{tStr.substr(0,2)}</span><span className={s.small}>{tStr.substr(2)}</span></div>
);

const ShortSessions = ({sessions}) => (
  <div className="mt-3">{sessions.map((ss,i) => (
    <div className={cn("mb-3 pb-2", {[s.igniteSep]: i < sessions.length-1})}>
      <Link to={`/session/${ss.id}`}>
        <h5 className={cn("mr-4 mb-0", s.igniteName)}>{getSpeakerName(ss)}</h5>
        <div>{ss.title}</div>
      </Link>
    </div>
  ))}</div>
);

const Session = ({text, session, shortSessions}) => {
  let content;
  if (session && session.sessions) {
    console.log(session);
    content = <div>
      {session.text && <div className={s.tall}>{session.text}</div>}
      <ShortSessions sessions={session.sessions}/>
    </div>
  } else if (session) {
    content = <Link to={`/session/${session.id}`}>
      <h5>{getSpeakerName(session)}</h5>
      <div>{session.title}</div>
    </Link>
  } else if (shortSessions) {
    content = <ShortSessions sessions={shortSessions}/>
  }

  return <Col className={s.tableCol}>
    {text && <div className={s.tall}>{text}</div> }
    {content}
  </Col>
};

const Line = ({time, sessions, text, shortSessions, muted, allSessions}) => {
  let cols;
  if (Array.isArray(sessions)) {
    cols = sessions.map((sessionId, i) => <Session text={i === 0 && text} session={sessionId && getSession(allSessions, sessionId)}/>);
  } else if (typeof sessions === "string") {
    cols = <Session text={text} session={getSession(allSessions, sessions)}/>;
  } else if (shortSessions) {
    cols = <Session text={text} shortSessions={shortSessions.map(ss => getSession(allSessions, ss))}/>
  } else {
    cols = <Session text={text}/>
  }

  return (
    <Row className={cn("align-items-center py-3", { [s.muted]: muted })}>
      <Col className={s.timeCol}>
        <Time tStr={time}/>
      </Col>
      {cols}
    </Row>
  )
};

const Agenda = ({ selectedDate, sessions, setSelectedDate }) => {
  if (!sessions || !sessions.length) return null;

  return <Page title="Schedule · Reversim Summit 2017">
    <h1 className="text-center font-weight-bold">Schedule for Reversim Summit 2017</h1>
    <Container className={s.agenda}>
      <Row className="my-5a" style={{margin: '80px 0'}}>
        <Col sm={{offset:2, size: 4}} className="text-center">
          <h4 className={cn({[s.selected]: selectedDate === 0}, s.subtitle)} onClick={() => setSelectedDate(0)}>Day 1 - October 15, 2017</h4>
        </Col>
        <Col sm="4" className="text-center">
          <h4 className={cn({[s.selected]: selectedDate === 1}, s.subtitle)} onClick={() => setSelectedDate(1)}>Day 2 - October 16, 2017</h4>
        </Col>
      </Row>
      <Row>
        <Col className={cn(s.timeCol, s.tableCol)}/>
        <Col className={cn(s.tableCol, "text-center1")}>Main hall</Col>
        <Col className={cn(s.tableCol, "text-center1")}>Class 2 - Media<br/>(near the main hall)</Col>
        <Col className={cn(s.tableCol, "text-center1")}>Class 3 - Law</Col>
      </Row>
      {selectedDate === 0 && agenda1.map(line => <Line {...line} allSessions={sessions}/>)}
      {selectedDate === 1 && agenda2.map(line => <Line {...line} allSessions={sessions}/>)}
    </Container>
  </Page>
};

export default Agenda;