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
import { Container, Button } from "reactstrap";
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
        )}>
        <Container>
        <div
        className={cn(
                heroInner,
            "d-flex align-items-center text-center text-md-left text-white"
        )}
        >
        <div className="d-flex flex-column my-8">
            <div className="d-flex mb-6">
            <div className="font-size-xxl">Welcome</div>
            <div className="hl bg-white" />
            </div>
        {/*<div className='d-flex'>*/}
        <div style={{ width: 400 }}>
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
        <Link to="/proposals" className="unstyled-link">
            <Button className="styled-button on-purple">
              {"VOTE FOR SESSIONS"}
            </Button>
          </Link>
            </div>
            </div>
            <div className="hero__right heroCounterWrapper d-flex flex-row-reverse align-items-end justify-content-evenly">
                <div className="hero__timer-wrapper">
                    <div className="hero__timer-title text-white">{"Voting closes at 17:00, March 21st"}</div>
                    <div><CountDown timeRemainingInSeconds={eventConfig.votingCountDown} /></div>
                </div>
            <div/>
        </div>
        </div>
    </Container>
    <div>
        <i className="fas fa-angle-down"/>
    </div>
    </section>
);

export default Hero;
