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
import zigzag from "../images/SVG/zigzag.svg";
import s from "./Sponsors.css";
import { image } from "../images";
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
  const mapSocialLink = medium => {
    const mediumMapper = {
      linkedin: faLinkedin,
      github: faGithub,
      facebook: faFacebook,
      twitter: faTwitter,
      medium: faMedium
    };
    return mediumMapper[medium];
  };

  return (
    <Page title={sponsor.name} {...props}>
      <div className="page__hero bg-purple2">
        <Container>
          <div className="d-flex justify-content-center mt-15 mb-12">
            <img src={triangle} className={s.triangle} alt="diamond" />
            <div className={cn("font-size-xxl text-white")}>
              Big Thanks to our sponsor
            </div>
            <div className="bg-white hl" />
          </div>

          <div className="premium-intro">
            <div className="premium-logo">
              <img
                src={image(sponsor.logo, 350, 221)}
                alt={sponsor.name}
                style={{ maxWidth: 350 }}
              />
            </div>
            <article className="premium-intro-content">
              <div className="premium-name">{sponsor.name}</div>
              <p className="premium-oneliner">{sponsor.oneLiner}</p>
            </article>
          </div>
        </Container>
      </div>
      <Container>
        <div className="premium-details">
          <div className="premium-social">
            {sponsor.socials.map((social, i) => (
              <a key={i} href={social.link} target="_blank">
                <FontAwesomeIcon
                  className="premium-social-icon mr-5 text-purple2"
                  icon={mapSocialLink(social.medium)}
                />
              </a>
            ))}
          </div>
          <ul className="premium-internal-links">
            <li>
              <ScrollLink href="#" to={"about"} offset={-100}>
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink href="#" to={"Tech-Story"} offset={-100}>
                Tech-Story
              </ScrollLink>
            </li>
            {!!sponsor.openPositions.length && (
              <li>
                <ScrollLink href="#" to={"open-positions"} offset={-100}>
                  Open Positions
                </ScrollLink>
              </li>
            )}
            {sponsor.reversimAndUs && (
              <li>
                <ScrollLink href="#" to={"reversim-and-us"} offset={-100}>
                  Reversim & Us
                </ScrollLink>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="premium-pr premium-mr">
          <section className="premium-who" name="about">
            <div className="d-flex">
              <h3 className="font-size-xl text-purple2">Who We Are?</h3>
              <div className="hl bg-purple2" />
            </div>
            <p className="premium-text">{sponsor.about}</p>
          </section>
          {sponsor.images &&
            sponsor.images.length > 0 && (
              <section className="premium-gallery">
                <SponsorCarousel sponsor={sponsor} />
              </section>
            )}
        </div>
        <div className="premium-mr premium-tech">
          <div className={cn("d-flex", s.premiumSection)} name="Tech-Story">
            <h3 className="font-size-xl text-purple2">Our Technology Story</h3>
            <div className="hl bg-purple2" />
          </div>
          <div className="premium-tech-story">
            <p className="premium-text">{sponsor.techStory.text}</p>

            {sponsor.techStory.technologies &&
              sponsor.techStory.technologies.length > 0 && (
                <div className="premium-tech-list">
                  {sponsor.techStory.technologies.map(t => (
                    <div className="premium-tech-item" key={t}>
                      {t}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
        {sponsor.openPositions &&
          sponsor.openPositions.length > 0 && (
            <div className="premium-mr">
              <section name="open-positions">
                <div className="d-flex align-items-center mb-8 mt-12">
                  <img
                    src={zigzag}
                    alt=""
                    height="80"
                    style={{ marginRight: -11 }}
                  />
                  <h3 className="text-purple2 font-size-xl mr-4">
                    Open Positions
                  </h3>
                  <div className="flex-grow-1 border-bottom border-purple2" />
                </div>
                <div className="premium-positions">
                  {sponsor.openPositions.map((openPosition, i) => (
                    <OpenPosition
                      key={i}
                      openPosition={openPosition}
                      {...this.props}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        {sponsor.reversimAndUs && (
          <div className="premium-mr">
            <section name="reversim-and-us">
              <div className="d-flex align-items-center mb-4 mt-12">
                <h3 className="text-purple2 font-size-xl mr-4">
                  Reversim & Us
                </h3>
                <div className="flex-grow-1 border-bottom border-purple2" />
              </div>
              <p className="premium-text">{sponsor.reversimAndUs}</p>
            </section>
          </div>
        )}
      </Container>
    </Page>
  );
};

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

    const images = sponsor.images.sort((img1, img2) => 
      img1.endsWith("mp4") ? -1 : (img2.endsWith("mp4") ? 1 : 0)
    );
    const slides = images.map((item, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}
          className="text-align-center"
        >
          {item && item.endsWith("mp4") ? (
            <video
              // width="596"
              // height="410"
              controls={false}
              autoPlay={true}
              muted={true}
            >
              <source src={item} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={image(item, 596, 410)} />
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
      <div className="mr-5 mb-4 flex-1 d-flex flex-column">
        <div className={"bg-purple2 p-6"}>
          <div className="text-white">
            <div className="font-size-lg font-weight-bold">
              {openPosition.title}
            </div>
            <div>{openPosition.city}</div>
          </div>
        </div>
        <div className="bg-white b-strong border-purple2 p-6 d-flex flex-column flex-grow-1 justify-content-between">
          <div className="pb-3 premium-position">
            {openPosition.description}
          </div>
          <a href={openPosition.link} className="align-self-end">
            <Button className="styled-button w-max-content">APPLY</Button>
          </a>
        </div>
      </div>
    );
  }
}

export default SponsorPageRoute(SponsorPage);
