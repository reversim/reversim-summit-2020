/* eslint-disable prettier/prettier */
import React from 'react';

import { image } from '../../images';

import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from "reactstrap";

import cn from "classnames";
import s from "../Sponsors.css";

library.add(faMapMarkerAlt);

// SponsorCarousel is rendered in SponsorPage
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
          <img src={image(item, 720, 495)} />
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

export default SponsorCarousel;
