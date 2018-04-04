import React from 'react';
import Page from "./Page";
import heroImg from '../images/session.png';
import { Container, Row, Col } from 'reactstrap';
import {getSessionTypeStr, REVERSIM_SUMMIT} from "../utils";
import Tag from './Tag';
import SpeakerShort from "./SpeakerShort";
import ReactMarkdown from 'react-markdown';
import { agenda1, agenda2 } from '../data/agenda';

const agenda = [agenda1, agenda2];

const _getDateAndTime = (index, id) => {
  let day, time;
  agenda[index].forEach(slot => {
    if (time) return;

    if (Array.isArray(slot.sessions)) {
      slot.sessions.forEach(ss => {
        if (ss === id) {
          day = index;
          time = slot.time;
        } else if (ss && ss.sessions) {
          ss.sessions.forEach(sss => {
            if (sss === id) {
              day = index;
              time = slot.time;
            }
          });
        }
      });
    } else if (typeof slot.sessions === "string") {
      if (slot.sessions === id) {
        day = index;
        time = slot.time;
      }
    } else if (slot.shortSessions) {
      slot.shortSessions.forEach(ss => {
        if (ss === id) {
          day = index;
          time = slot.time;
        }
      })
    }
  });

  if (time) {
    return { day, time };
  }
};

const getDateAndTime = id => {
  return _getDateAndTime(0, id) || _getDateAndTime(1, id);
};

const dates = [
  "October 15, 2017", // TODO change dates
  "October 16, 2017"
];


class SessionPage extends React.Component {
	componentWillMount() {
		this.getProposalIfNeeded();
	}

	componentWillReceiveProps(nextProps) {
		this.getProposalIfNeeded();
	}

	getProposalIfNeeded() {
		const session = this.findSession();
		if (this.props.sessions.length && !session) {
			this.props.getProposal(this.props.match.params.id);
		}
	}

	findSession() {
		const { proposals, match: {params: {id}}} = this.props;
		return proposals.find(s => s.id === id);
	}

	render() {
		const session = this.findSession();

		if (!session) return <div>aaaaa</div>;

		const {title, abstract, type, tags, outline} = session;
		const speakers = session.speaker_ids;

		const dayTime = getDateAndTime(this.props.match.params.id);

		return (
			<Page title={session.title} {...this.props}>
				<div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
				<Container className="mt-4">
					<Row>
						<Col sm={{size: 8, offset: 2}}>
							<p>{getSessionTypeStr(type)}</p>
							<div className="d-flex text-muted mb-3">{tags.map(Tag)}</div>
							<Row className="align-items-center my-4">
								{ dayTime && <Col>
									<i className="fa fa-calendar-o mr-3"/><span className="mr-4">{dates[dayTime.day]}</span>
									<i className="fa fa-clock-o mr-3"/><span>{`${dayTime.time.substr(0, 2)}:${dayTime.time.substr(2)}`}</span>
								</Col>}
							</Row>
							{speakers.map(SpeakerShort)}
							<h4>{title}</h4>
							{!dayTime && <div className="mb-3"><small title={`Not participating in ${REVERSIM_SUMMIT}`} className="py-1 px-2 bg-danger text-white">Proposal</small></div> }
							<ReactMarkdown source={abstract}/>
							{outline && <div>
								<h4>Outline</h4>
								<ReactMarkdown source={outline}/>
							</div>}
						</Col>
					</Row>
				</Container>
			</Page>
		);
	}
}

export default SessionPage;