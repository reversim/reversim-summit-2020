import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getHref, hyperlink } from "../utils";
import { Button } from "reactstrap";
// import Tag from './Tag';
// import SessionDayTime from './SessionDayTime';
import SessionInfo from "./SessionInfo";
import VoteButton from "./VoteButton";
import { key } from "../utils";
import { image } from "../images";
import ReadMore from "./ReadMore"

const CommunitySponsors = ({
  sponsors,
  canEdit,
  updateSponsor,
  deleteSponsor
}) => {
  return (
    <div
    // className="b-strong d-flex mb-12 flex-column"
    // style={{ minHeight: 440 }}
    >
      {sponsors.map(sponsor => (
        <div key={sponsor.name} className="d-flex mb-12 b-strong">
          <div className="session__speaker d-flex flex-column">
            <div
              style={{
                backgroundImage: `url(${image(sponsor.logo, 236, 236)})`
              }}
              className="session__speaker-picture"
            />
            <div className="d-flex flex-column bg-purple2 text-white p-4 flex-grow-1">
              <h5>{sponsor.name}</h5>
              <p className="flex-grow-1">{sponsor.oneLiner}</p>
              <a
                className="unstyled-link font-weight-bold cursor-pointer"
                href={(sponsor.jobUrl)}
              >
                JOB OPPORTUNITIES >>
              </a>
            </div>
          </div>
          <div className="p-4 d-flex flex-column justify-content-between">
            <div className="content">
              <ReadMore
                lines={11}
                truncateText="…"
                more="Read more"
                less="Show less"
                children={sponsor.about}
                onToggle={()=>{}}
                // onToggle={this.toggle}
              />
              {/*<ReactMarkdown*/}
              {/*  className="mb-4 session__abstract"*/}
              {/*  source={sponsor.about}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunitySponsors;
