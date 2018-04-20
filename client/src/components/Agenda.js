import React from 'react';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import s from './Agenda.css';
import cn from 'classnames';
import { agenda1, agenda2 } from '../data/agenda';
import {Link} from "react-router-dom";
import CalendarLink from './CalendarLink';
import { isServer } from '../utils';

const _getSession = (sessions, id) => sessions.find(ss => ss._id === id);
const getSession = (sessions, id) => {
  if (id.sessions) return { ...id, sessions: id.sessions.map(x => _getSession(sessions, x)) };
  else return _getSession(sessions, id);
};

const getSpeakerName = (session) => session.speaker_ids.map(ss => ss.name).join(" & ");
const getSpeakerPicture = (session) => session.speaker_ids.map(ss => ss.picture);
const getSessionImgs = (session) => getSpeakerPicture(session).map(url => (
  <div className={cn(s.speakerImg, "mr-3")} style={{backgroundImage: `url('${url}')`}} />
));

const _Time = t => [<span className={s.tall}>{t.substr(0,2)}</span>,<span className={s.small}>{t.substr(2)}</span>];
const Time = ({tStr}) => {
  if (tStr.indexOf("-") > -1) {
    const [t1, t2] = tStr.split("-");
    return <div>
      {_Time(t1)} &mdash; {_Time(t2)}
    </div>
  } else {
    return <div>
      {_Time(tStr)}
    </div>
  }
};

const ShortSessions = ({sessions}) => (
  <div className="mt-3">{sessions.map((ss,i) => (
    <div className={cn("mb-3 pb-2", {[s.igniteSep]: i < sessions.length-1})}>
      <Link to={`/session/${ss.href}`}>
        <div className="d-flex">
          {getSessionImgs(ss)}
          <div>
            <h5 className={cn("mr-4 mb-0", s.igniteName)}>{getSpeakerName(ss)}</h5>
            <div>{ss.title}</div>
          </div>
        </div>
      </Link>
    </div>
  ))}</div>
);

const Session = ({text, session, shortSessions, hall}) => {
  let content;
  if (session && session.sessions) {
    content = <div>
      {session.text && <div className={s.tall}>{session.text}</div>}
			{hall && <div className="d-lg-none text-muted"><i className="fa fa-map-marker mr-2" />{hall}</div>}
      <ShortSessions sessions={session.sessions}/>
    </div>
  } else if (session) {
    content = <Link to={`/session/${session.href}`}>
      <div className="d-flex mb-4 mb-lg-0">
        {getSessionImgs(session)}
        <div>
          <h5>{getSpeakerName(session)}</h5>
          <div>{session.title}</div>
          {hall && <div className="d-lg-none text-muted"><i className="fa fa-map-marker mr-2" />{hall}</div>}
        </div>
      </div>
    </Link>
  } else if (shortSessions) {
    content = <div>
			{hall && <div className="d-lg-none text-muted"><i className="fa fa-map-marker mr-2" />{hall}</div>}
      <ShortSessions sessions={shortSessions}/>
    </div>
  }

  return <Col className={s.tableCol} xs="12" lg={true}>
    {text && <div className={s.tall}>{text}</div> }
    {content}
  </Col>
};

const halls = [
  'Main hall',
  'Class 2 - Media',
  'Class 3 - Law'
];

const Line = ({time, sessions, text, href, shortSessions, muted, allSessions}) => {
  let cols;
  if (Array.isArray(sessions)) {
    cols = sessions.map((sessionId, i) => <Session text={i === 0 && text} session={sessionId && getSession(allSessions, sessionId)} hall={halls[i]}/>);
  } else if (typeof sessions === "string") {
    cols = <Session text={text} session={getSession(allSessions, sessions)} hall={halls[0]}/>;
  } else if (shortSessions) {
    cols = <Session text={text} shortSessions={shortSessions.map(ss => getSession(allSessions, ss))} hall={halls[0]}/>
  } else {
    cols = <Session text={text}/>
  }

  if (href) {
    if (isServer) href = `${href}.html`;
    cols = <Link to={href}>{cols}</Link>
  }

  return (
    <Row className={cn("align-items-center py-3", { [s.muted]: muted })}>
      <Col xs="auto" className={cn(s.timeCol, "pl-3")}>
        <Time tStr={time}/>
      </Col>
      <Col>
        <Row>
          {cols}
        </Row>
      </Col>
    </Row>
  )
};

const dates = [
  'Day 1 - October 15, 2017', // TODO change dates
  'Day 2 - October 16, 2017'
];

const agendas = [agenda1, agenda2];

const DayAgenda = ({ index, sessions, isLargeScreen }) => {
  return (
    <Container className={cn(s.agenda, "mb-5")}>
      <h4 className={cn("text-center", s.subtitle)} style={{margin:'80px 0'}}>{dates[index]}</h4>
      <Row className="hidden-md-down mb-4">
        <Col xs="auto" className={cn(s.timeCol, s.tableCol)}/>
        <Col className={s.tableCol}><h4>Main hall</h4></Col>
        <Col className={s.tableCol}><h4>Class 2 - Media<br/>(near the main hall)</h4></Col>
        <Col className={s.tableCol}><h4>Class 3 - Law</h4></Col>
      </Row>
      {agendas[index].map(line => <Line {...line} allSessions={sessions} isLargeScreen={isLargeScreen}/>)}
    </Container>
  )
};

const AddToCal = () => (
  <div className="text-center mt-5">
    <CalendarLink/>
  </div>
);

const Agenda = ({ sessions, ...props }) => {
  if (!sessions || !sessions.length) return null;

  return <Page title="Schedule" {...props}>
    <h1 className="text-center font-weight-bold">Schedule for Reversim Summit 2018</h1>
    <AddToCal />
    <DayAgenda index="0" sessions={sessions}/>
    {/*<h4 className={cn("text-center", s.subtitle)} style={{margin:'80px 0'}}>Day 1 is over, check out day 2 bellow</h4>*/}
    <DayAgenda index="1" sessions={sessions}/>
  </Page>
};

export default Agenda;