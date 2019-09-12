import React from "react";
import cn from "classnames";
import {
  hero,
  heroInner,
  heroContent,
  subtitle,
} from "./Hero.css";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import logoImg from "../images/SVG/logo.svg";
import {
  faMapMarkerAlt,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

library.add(faMapMarkerAlt, faCalendarAlt);

const StyledSection = styled.section`
  ${props => {
    return(`
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("../images/home-reg-bg.png") center white; /*NOTE: something wierd here doesn't seem to load image from url*/
      background-size: cover;
      height: 100vh;
      background-color: ${props.theme.color.background_2};
      border-top: 100px solid ${props.theme.color.background_2};
    `)
  }}
`;

const HeroInner = styled.div`
  width: 100%;
  justify-content: center;
  display: flex !important;
  align-items: center !important;
  text-align: center !important;
  color: white !important; /*change to theme */

  @media (min-width: 768px){
    text-align: left !important;
  } /*change to theme */
`;

const Hero = ({ eventConfig }) => (
  <StyledSection>
    <Container>
      <HeroInner>
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
          <div className="d-flex justify-content-between mobile-flex-column mx-2">
            <a href="https://ti.to/reversim-summit/2019" className="unstyled-link mb-4">
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
      </HeroInner>
    </Container>
    <div>
      <i className="fas fa-angle-down" />
    </div>
  </StyledSection>
);

export default Hero;
