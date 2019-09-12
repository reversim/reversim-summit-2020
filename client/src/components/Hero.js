import React from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import logoImg from "../images/SVG/logo.svg";
import backgroundImg from "../images/home-reg-bg.png"
import {
  faMapMarkerAlt,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {ButtonStyledLink} from './GlobalStyledComponents/ReversimStyledComps';

library.add(faMapMarkerAlt, faCalendarAlt);

const StyledSection = styled.section`
  ${props => {
    const {background_2} = props.theme.color;

    return(`
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(${backgroundImg}) center white;
      background-size: cover;
      height: 100vh;
      background-color: ${background_2};
      border-top: 100px solid ${background_2};
    `)
  }}
`;

const HeroInner = styled.div`
  ${props => {
    const {
      color,
      mq: {
        m,
        l,
        xl,
      }
    } = props.theme;

      return(`
      width: 100%;
      display: flex !important;
      justify-content: center;
      align-items: center !important;
      text-align: center !important;
      color: ${color.text_1} !important;

      @media (min-width: ${m}){
        text-align: left !important;
      };
      
      @media (max-width:${m}) {
        margin-right: 0;
      };

      @media (max-width:${l}) {
        margin-right: -80px;
      };

      @media (max-width:${xl}) {
       flex-direction: column;
      };
      `)
  }}
`;

const HeroContent = styled.div`
  ${props => {
    const {
      space,
      color,
    } = props.theme;

    return (`
      display: flex !important;
      flex-direction: column;
      margin-bottom: ${space.xxl} !important;
      background-color: ${color.background_2} !important;
      box-shadow: 0 0 30px 15px ${color.box_shadow_1};
    `)
  }}
`;

const RSLogoImg = styled.img`
  ${props => {
      const {
        m,
        xxs,
      } = props.theme.mq;

      return (`
      width: 400px;
      @media (max-width:${m}) {
            width: 350px;
      };

      @media (max-width:${xxs}) {
            width: 250px;
      };
      `)
  }}
`;

const Subtitle = styled.div`
  ${props => {
    const {
      font,
      space,
      mq,
    } = props.theme;

    return (`
    letter-spacing: 0.6px;
    font-size: ${font.size_md};
    font-weight: 400;
    background-color: #451deb;

    padding: ${space.m} !important;
    display: flex !important;
    justify-content: space-between;
    margin-top: ${space.l} !important;
    margin-bottom: ${space.xxl} !important;

    @media (max-width:${mq.m}) {
      flex-direction: column;
    }
    `);
  }}
`;

const FAIconAligner = styled.div`
  ${props => {
    return (`
    width: max-content;
    display: flex;
    justify-content: space-between;
    margin: 0 ${props.theme.space.m} !important;
    `)
  }}
`;

const ButtonContainer = styled.div`
  ${props => {
    const {
      space,
      mq,
    } = props.theme
  
    return (`
    display: flex !important;
    justify-content: space-around !important;
    margin-right: ${space.m} !important;
    
    @media (max-width: ${mq.m}){
      flex-direction: column;
      }
    `)
  }};
`;

const Hero = ({ eventConfig }) => (
  <StyledSection>
    <Container>
      <HeroInner>
        <HeroContent>
            <RSLogoImg src={logoImg} alt="rs19" />

          <Subtitle>
            <FAIconAligner>
              <FontAwesomeIcon icon="calendar-alt" className="mr-2"/> {/* could not get rid of className and keep style */}
              16-17.6.2019
            </FAIconAligner>
            <FAIconAligner>
              <FontAwesomeIcon icon="map-marker-alt" className="mr-2"/> {/* could not get rid of className and keep style */}
              TLV Convention center
            </FAIconAligner>
          </Subtitle>

          {eventConfig.voting && (
            <ButtonContainer>
              <ButtonStyledLink href="/proposals">
                {"VOTE FOR SESSIONS"}
              </ButtonStyledLink>
          </ButtonContainer>
          )}

          <ButtonContainer>
              <ButtonStyledLink href="https://ti.to/reversim-summit/2019">
                {"Get Tickets"}
              </ButtonStyledLink>
              <ButtonStyledLink href="/agenda" >
                {"View Agenda"}
              </ButtonStyledLink>
          </ButtonContainer>
        </HeroContent>
      </HeroInner>
    </Container>
  </StyledSection>
);

export default Hero;
