import React from "react";
import cn from "classnames";
import {
  hero,
  heroInner,
  title,
  subtitle,
  headphones,
  left,
  separator,
  h2,
  heroCounterWrapper
} from "./Hero.css";
import { Button } from "reactstrap";
import { REVERSIM_SUMMIT } from "../utils";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import logoImg from "../images/SVG/logo.svg";
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
      "d-flex justify-content-center align-items-center bg-purple2"
    )}
  >
    <div
      className={cn(
        heroInner,
        "d-flex align-items-center text-center text-md-left text-white"
      )}
    >
      <div className="d-flex flex-column my-8">
        <div className="d-flex mb-2">
          <div className="font-size-xxl">Welcome</div>
          <div className="hl bg-white" />
        </div>
        {/*<div className='d-flex'>*/}
        <div style={{ width: 400 }}>
          <img src={logoImg} alt="rs19" />
        </div>

        {/*<div className={cn(left, 'text-white')}>*/}
        <div className={cn(subtitle, "p-2 d-flex mt-4 mb-4")}>
          <div>
            <FontAwesomeIcon className="mr-2" icon="calendar-alt" />
            16-17.6.2019
          </div>
          <div className="ml-4">
            <FontAwesomeIcon className="mr-2" icon="map-marker-alt" />
            Ganei HaTaarucha
          </div>
        </div>
        <div>
          <Link to="/proposals" className="unstyled-link">
            <Button className="styled-button on-purple">
              {"VOTE FOR SESSIONS"}
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          heroCounterWrapper,
          "d-flex flex-row-reverse align-items-end justify-content-evenly"
        )}
      >
        <div>
          <div className="text-white">
            {"Voting closes at 17:00, March 21st"}
          </div>
          <div>
            <CountDown timeRemainingInSeconds={eventConfig.votingCountDown} />
          </div>
        </div>
        <div />
      </div>
    </div>
  </section>
);

export default Hero;
