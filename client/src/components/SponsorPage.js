import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { getHref } from "../utils";
import SponsorPageRoute from "./SponsorPageRoute";
import * as Scroll from "react-scroll";
import { animateScroll as scroll, Link as ScrollLink } from "react-scroll";
import Page from "./Page";
import { Container, Row, Col, Button } from "reactstrap";
import triangle from "../images/SVG/triangle.svg";
import s from "./Sponsors.css";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

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
      linkedin: faLinkedin,
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
    return (
      <div>
        <div className={cn("bg-purple2 text-white", s.premiumTitle)}>
            <div className="d-flex justify-content-center mt-15 mb-12">
                <img src={triangle} className={s.triangle} alt="diamond" />
                <div className={cn("font-size-xxl text-white")}>
                    Big Thanks to our sponsor
                </div>
                <div className="bg-white hl" />
            </div>

            <div className={cn("d-flex flex-row mb-4", s.premiumTitle)}>
                <div className="b-strong border-purple2 bg-white mr-5">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    style={{ maxWidth: 250 }}/>
                </div>
            <div>
                <div className={"d-flex flex-column "}>
                  <div className="d-flex flex-inline align-items-baseline">
                    <div className={"font-size-xl font-weight-bold  mr-5"}>{sponsor.name}</div>
                    <div>{sponsor.oneLiner}</div>
                  </div>
                </div>




              <div className={cn("d-flex flex-column mt-4")}>
                <div className={s.socialWrapper}>
                  {sponsor.socials.map((social, i) => (
                    <a key={i} href={social.link}>
                      <FontAwesomeIcon
                        className="mr-3 text-purple2"
                        icon={this.mapSocialLink(social.medium)}
                      />
                    </a>
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
                  {!!sponsor.openPositions.length && (
                    <div>
                      <span>{" | "}</span>
                      <ScrollLink to={"Open Positions"} offset={-100}>
                        Open Positions
                      </ScrollLink>
                    </div>
                  )}
                  {sponsor.reversimAndUs && (
                    <div>
                      <span>{" | "}</span>
                      <ScrollLink to={"Reversim & Us"} offset={-100}>
                        Reversim & Us
                      </ScrollLink>
                    </div>
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

class SponsorCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.sponsor = this.props.sponsor;
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.sponsor.images.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.sponsor.images.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { sponsor } = this.props;

    const slides = sponsor.images.map((item, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}
          className="text-align-center"
        >
          {item && item.endsWith("mp4") ? (
            <video
              // width="400"
              // height="400"
              controls={false}
              autoPlay={true}
              muted={true}
            >
              <source src={item} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={item} />
          )}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
      >
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
          className={cn(s.carouselControl, "cursor-pointer bg-purple2")}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
          className={cn(s.carouselControl, "cursor-pointer bg-purple2")}
        />
      </Carousel>
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
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit } = this.props;
    console.log("sponsor", sponsor);
    return (
      <Container>
        <div className="pt-8">
          <div className={cn("d-flex", s.premiumSection)} name="about">
            <div className="width-half mr-4">
              <div className="d-flex">
                <div className="font-size-xl text-purple2">Who We Are?</div>
                <div className="hl bg-purple2" />
              </div>
              <div className="text-black-50">{sponsor.about}</div>
            </div>
            <div className="width-half ml-4">
              <SponsorCarousel sponsor={sponsor} />
            </div>
          </div>
        </div>
        <div className="pt-8">
          <div className={cn("d-flex", s.premiumSection)} name="Tech-Story">
            <div className="font-size-xl text-purple2">
              Our Technology Story
            </div>
            <div className="hl bg-purple2" />
          </div>
          <div className="d-flex">
            <div className="text-black-50 width-half">
              {sponsor.techStory.text}
            </div>
            <div className="d-flex align-content-start flex-wrap">
              {sponsor.techStory.technologies.map(
                (technology, i) =>
                  technology && (
                    <div
                      className="bg-purple2 text-white w-max-content h-max-content p-1 m-2"
                      key={i}
                    >
                      {technology}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        {!!sponsor.openPositions.length && (
          <div className="pt-8" name="Open Positions">
            <div className={cn("d-flex", s.premiumSection)}>
              <div className="font-size-xl text-purple2">
                Open Positions - Join Us
              </div>
              <div className="hl bg-purple2" />
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
        )}
        {sponsor.reversimAndUs && (
          <div className="pt-8" name="Reversim & Us">
            <div className={cn("d-flex", s.premiumSection)}>
              <div className="font-size-xl text-purple2">Reversim and us</div>
              <div className="hl bg-purple2" />
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
        <div
          className={cn(
            "bg-white b-strong border-purple2 p-6 d-flex flex-column",
            s.openPosition
          )}
        >
          <div className="pb-3">{openPosition.description}</div>
          <a href={openPosition.link} className="align-self-end">
            <Button className="styled-button w-max-content">APPLY</Button>
          </a>
        </div>
      </div>
    );
  }
}

export default SponsorPageRoute(SponsorPage);
