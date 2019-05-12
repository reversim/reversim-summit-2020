import React from "react";
import cn from "classnames";
import {
  hero,
  heroInner,
  heroContent,
  title,
  subtitle,
  headphones,
  left,
  separator,
  h2,
  heroCounterWrapper,
  rs19Logo
} from "./Hero.css";
import { Container, Button } from "reactstrap";
import { REVERSIM_SUMMIT } from "../utils";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import logoImg from "../images/SVG/logo.svg";
import homeBG from "../images/home-reg-bg.png";
import {
  faMapMarkerAlt,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMapMarkerAlt, faCalendarAlt);

const Hero = ({ eventConfig }) => (
  <section
    className={cn(
      hero,
      "d-flex justify-content-center align-items-center bg-purple2 navbar-margin"
    )}
  >
    <Container>
      <div
        className={cn(
          heroInner,
          "d-flex align-items-center text-center text-md-left text-white"
        )}
      >
        <div className={cn("d-flex flex-column my-8 bg-purple2", heroContent)}>
          {/*<div className='d-flex'>*/}
          <div className="rs19Logo">
            <img src={logoImg} alt="rs19" />
          </div>

          {/*<div className={cn(left, 'text-white')}>*/}
          <div className={cn(subtitle, "p-2 d-flex mt-4 mb-8")}>
            <div>
              <FontAwesomeIcon className="mr-2" icon="calendar-alt" />
              16-17.6.2019
            </div>
            <div className="ml-4">
              <FontAwesomeIcon className="mr-2" icon="map-marker-alt" />
              TLV Convention center
            </div>
          </div>
          <div className="text-align-left">
            {eventConfig.voting && (
              <Link to="/proposals" className="unstyled-link">
                <Button className="styled-button on-purple">
                  {"VOTE FOR SESSIONS"}
                </Button>
              </Link>
            )}
          </div>
          <div className="d-flex justify-content-around mobile-flex-column">
            <a href="http://tickets.reversim.com" className="unstyled-link mb-4">
              <Button className="styled-button on-purple">
                {"Get Tickets"}
              </Button>
            </a>
            <Link to="/agenda" className="unstyled-link mb-4">
              <Button className="styled-button on-purple">
                {"View Agenda"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
    <div>
      <i className="fas fa-angle-down" />
    </div>
  </section>
);

export default Hero;
