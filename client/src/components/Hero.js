import React from "react";
import { Container } from "reactstrap";
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
  ${ ({ theme: { color } }) =>`
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(${backgroundImg}) center white;
      background-size: cover;
      height: 100vh;
      background-color: ${color.background_2};
      border-top: 100px solid ${color.background_2};
    `}
`;

const HeroInner = styled.div`
  ${ ({ theme: { color, mq, }}) =>`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: ${color.text_1};

      @media (min-width: ${mq.m}){
        text-align: left;
      };
      
      @media (max-width:${mq.m}) {
        margin-right: 0;
      };

      @media (max-width:${mq.l}) {
        margin-right: -80px;
      };

      @media (max-width:${mq.xl}) {
       flex-direction: column;
      };
      `}
`;

const HeroContent = styled.div`
  ${ ({ theme: { space, color, } }) =>`
      display: flex !important;
      flex-direction: column;
      margin-bottom: ${space.xxl} !important;
      background-color: ${color.background_2} !important;
      box-shadow: 0 0 30px 15px ${color.box_shadow_1};
    `}
`;

const LogoImg = styled.img`
  ${ ({ theme: { mq } }) =>`
      width: 400px;
      @media (max-width:${mq.m}) {
            width: 350px;
      };

      @media (max-width:${mq.xxs}) {
            width: 250px;
      };
      `}
`;

const Subtitle = styled.div`
  ${ ({ theme: { font, space, mq } }) =>`
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
    `};
`;

const IconAligner = styled.div`
  ${ ({ theme: { space } }) =>`
    width: max-content;
    display: flex;
    justify-content: space-between;
    margin: 0 ${space.m} !important;

    svg {
    margin-right: 10px
    }
    `};
`;

const ButtonContainer = styled.div`
  ${ ({ theme: { space, mq, } }) => `
    display: flex !important;
    justify-content: space-around !important;
    margin-right: ${space.m} !important;
    
    @media (max-width: ${mq.m}){
      flex-direction: column;
      }
    `};
`;

const Hero = ({ eventConfig }) => (
  <StyledSection>
    <Container>
      <HeroInner>
        <HeroContent>
          <LogoImg src={logoImg} alt="rs19" />

          <Subtitle>
            <IconAligner>
              <FontAwesomeIcon icon="calendar-alt" />
              16-17.6.2019
            </IconAligner>
            <IconAligner>
              <FontAwesomeIcon icon="map-marker-alt" />
              TLV Convention center
            </IconAligner>
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
            <ButtonStyledLink href="/agenda">
              {"View Agenda"}
            </ButtonStyledLink>
          </ButtonContainer>
        </HeroContent>
      </HeroInner>
    </Container>
  </StyledSection>
);

export default Hero;
