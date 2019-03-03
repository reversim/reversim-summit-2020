import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { getHref } from "../utils";
import SponsorPageRoute from "./SponsorPageRoute";
import Page from "./Page";
import { Container, Row, Col, Button } from "reactstrap";
import s from "./Sponsors.css";
import {faMapMarkerAlt, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
library.add(faMapMarkerAlt);


const SponsorPage = ({ sponsor, color, isFull, ...props }) => {
  console.log("sponsor", sponsor);
  // const {} = sponsor;
  return (
    <Page title={sponsor.name} {...props}>
      <div className="page__hero bg-purple2">
      <Container>
        <TitleSection sponsor={sponsor} />
      </Container>
      </div>
    </Page>
  );
};

class TitleSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isEditing: false,
      isLoading: false
    };
  }

  render() {
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit } = this.props;
    console.log('sponsor', sponsor)
    return (
      <div className={cn("bg-purple2 text-white font-weight-light", s.premiumCover)}>
        <div className={"d-flex"}>
          <div className={"font-size-xxl"}>Big Thanks to our sponsor</div>
          <div className={cn(s.hr, "bg-white")} />
        </div>
        <div className={'d-flex'}>
        <div className={"font-size-xl"}>{sponsor.name}</div>
        <FontAwesomeIcon icon="map-marker-alt" />
        <span>{sponsor.location.shortAddress}</span>
        </div>
      </div>
    );
  }
}

export default SponsorPageRoute(SponsorPage);
