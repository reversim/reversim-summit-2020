import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { getHref } from "../utils";
import SponsorPageRoute from "./SponsorPageRoute";
import * as Scroll from "react-scroll";
import { animateScroll as scroll, Link as ScrollLink } from "react-scroll";
import Page from "./Page";
import { Container, Row, Col, Button } from "reactstrap";
import s from "./Sponsors.css";
import {
  faMapMarkerAlt,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faMedium,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className={cn("page__hero bg-white", s.halfColoredDiv)}>
        <Container>
          <DescriptionSection sponsor={sponsor} />
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
  mapSocialLink(medium) {
    const mediumMapper = {
      linkdin: faLinkedin,
      github: faGithub,
      facebook: faFacebook,
      twitter: faTwitter,
      medium: faMedium
    };
    return mediumMapper[medium];
  }

  render() {
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit } = this.props;
    console.log("sponsor", sponsor);
    return (
      <div>
        <div className={cn("bg-purple2 text-white")}>
          <div className={"d-flex"}>
            <div className="font-size-xxl">Big Thanks to our sponsor</div>
            <div className={cn(s.hr, "bg-white")} />
          </div>
          <div className="d-flex flex-row mb-4">
            <div className="b-strong border-purple2 bg-white  mr-5">
              <img src={sponsor.logoHover} alt={sponsor.name} />
            </div>
            <div>
              <div>
                <div className={"d-flex flex-column "}>
                  <div className="d-flex flex-inline align-items-baseline">
                    <div className={"font-size-xl mr-5"}>{sponsor.name}</div>
                    <FontAwesomeIcon className="mr-2" icon="map-marker-alt" />
                    <span className="font-weight-bold">
                      {sponsor.location.shortAddress}
                    </span>
                  </div>
                  <div>
                    <span>{sponsor.oneLiner}</span>
                  </div>
                </div>
              </div>
              <div className={"d-flex flex-column mt-4"}>
                <div>
                  {sponsor.socials.map((social, i) => (
                    <Link key={i} to={social.link}>
                      <FontAwesomeIcon
                        className="mr-3 text-purple2"
                        icon={this.mapSocialLink(social.medium)}
                      />
                    </Link>
                  ))}
                </div>
                <div className={"text-purple2 cursor-pointer"}>
                  <ScrollLink to={"about"} offset={-100}>
                    about
                  </ScrollLink>
                  <span>{"  | "}</span>
                  <ScrollLink to={"Tech-Story"} offset={-100}>
                    Tech-Story
                  </ScrollLink>
                  <span>{" | "}</span>
                  <ScrollLink to={"Open Positions"} offset={-100}>
                    Open Positions
                  </ScrollLink>
                  <span>{" | "}</span>
                  {sponsor.reversimAndUs && (
                    <ScrollLink to={"Reversim & Us"} offset={-100}>
                      Reversim & Us
                    </ScrollLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class DescriptionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isEditing: false,
      isLoading: false
    };
  }

  render() {

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        sizes:'16x16'
      },
      {
        original: 'http://lorempixel.com/100/100/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/',
        sizes:'16x16'
      },
      {
        original: 'http://lorempixel.com/100/100/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/',
        sizes:'16x16'
      }
    ]
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit } = this.props;
    console.log("sponsor", sponsor);
    return (
      <Container>
        <div className="pt-8">
          <div className="d-flex" name="about">
            <div className="width-half">
              <div className="d-flex">
                <div className="font-size-xl text-purple2">Who We Are?</div>
                <div className={cn(s.hr, "bg-purple2")} />
              </div>
              <div className="text-black-50">{sponsor.about}</div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="pt-8" name="Tech-Story">
          <div className="d-flex">
            <div className="font-size-xl text-purple2">
              Our Technology Story
            </div>
            <div className={cn(s.hr, "bg-purple2")} />
          </div>
          <div className="d-flex">
            <div className="text-black-50 width-half">
              {sponsor.techStory.text}
            </div>
            <div className="d-flex align-content-start flex-wrap">
              {sponsor.techStory.technologies.map((technology, i) => (
                <div
                  className="bg-purple2 text-white w-max-content h-max-content p-1 m-2"
                  key={i}
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8" name="Open Positions">
          <div className="d-flex">
            <div className="font-size-xl text-purple2">
              Open Positions - Join Us
            </div>
            <div className={cn(s.hr, "bg-purple2")} />
          </div>
          <div className="text-black-50 d-flex">
            {sponsor.openPositions.map((openPosition, i) => (
              <OpenPosition
                key={i}
                openPosition={openPosition}
                {...this.props}
              />
            ))}
          </div>
        </div>
        {sponsor.reversimAndUs && (
          <div className="pt-8" name="Reversim & Us">
            <div className="d-flex">
              <div className="font-size-xl text-purple2">Reversim and us</div>
              <div className={cn(s.hr, "bg-purple2")} />
            </div>
            <div className="text-black-50">{sponsor.reversimAndUs}</div>
          </div>
        )}
      </Container>
    );
  }
}

class OpenPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isEditing: false,
      isLoading: false
    };
  }

  render() {
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit, openPosition } = this.props;
    console.log("NETA openPosition", openPosition);
    return (
      <div className={cn("mr-5")}>
        <div className={"bg-purple2 p-6"}>
          <div className="text-white">
            <div className="font-size-lg font-weight-bold">
              {openPosition.title}
            </div>
            <div>{openPosition.city}</div>
          </div>
        </div>
        <div className="bg-white b-strong border-purple2 p-6 d-flex flex-column">
          <div className="pb-3">{sponsor.description}</div>
          <a href={openPosition.link} className="align-self-end">
            <Button className="styled-button w-max-content">APPLY</Button>
          </a>
        </div>
      </div>
    );
  }
}

export default SponsorPageRoute(SponsorPage);
