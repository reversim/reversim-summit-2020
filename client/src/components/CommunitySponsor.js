import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getHref, hyperlink } from "../utils";
import cn from "classnames";
import s from './Sponsors.css'
import { Button } from "reactstrap";
import { image } from "../images";
import ReadMore from "./ReadMore";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faPencilAlt, faTrash);

const CommunitySponsor = ({ canEdit, onEdit, onDelete, sponsor }) => {
  return (
    <div className={cn("d-flex mb-12 b-strong", s.communitySponsors)}>
      <div className={cn("session__speaker d-flex flex-column", s.communitySponsorsImageSection)}>
        <div
          style={{
            backgroundColor: 'white',
            backgroundImage: `url(${image(sponsor.logo, 236, 236)})`
          }}
          className="session__speaker-picture"
        />
        <div className="d-flex flex-column bg-purple2 text-white p-4 flex-grow-1">
          <h5>{sponsor.name}</h5>
          {sponsor.jobUrl && <a
            className="unstyled-link font-weight-bold cursor-pointer"
            href={sponsor.jobUrl}
          >
            JOB OPPORTUNITIES >>
          </a>}
        </div>
      </div>
      <div className="p-4 d-flex flex-column justify-content-between">
        <div className="content">
          <ReadMore
            lines={10}
            truncateText="…"
            more="Read more"
            less="Show less"
            children={sponsor.about}
            onToggle={() => {}}
          />
          {/*<ReactMarkdown*/}
          {/*  className="mb-4 session__abstract"*/}
          {/*  source={sponsor.about}*/}
          {/*/>*/}
        </div>
        {canEdit && <div>
          <Button
            size="sm"
            className="ml-2 styled-button btn btn-secondary"
            onClick={onEdit}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
          <Button
            size="sm"
            className="ml-2 styled-button btn btn-secondary"
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>}
      </div>
    </div>
  );
};

export default CommunitySponsor;
