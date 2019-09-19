/* eslint-disable prettier/prettier */
import React from "react";
import HomeCommunitySponsors from "../HomeCommunitySponsors";

import s from "../Sponsors.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import styled from 'styled-components';
import {
  Container,
  BreakLine,
} from '../GlobalStyledComponents/ReversimStyledComps'
import {image} from '../../images';

library.add(faPencilAlt, faTrash);

export class SponsorMiniPremium extends React.Component {
  state = {
    hovered: false
  };
  render() {
    const { name, logo, url, onEdit, onDelete, isOnWhite } = this.props;
    return (
      <div>
        {onEdit && (
          <span>
            <Button size="sm" color="primary" className="ml-2" onClick={onEdit}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            <Button
              size="sm"
              color="danger"
              className="ml-2"
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </span>
        )}
        <div className="d-flex flex-column align-items-center mb-10">
          <div
            className="p-relative text-center white-bg mb-2 d-flex justify-content-center align-items-center b-strong cursor-pointer"
            style={{ width: 248, height: 230, maxWidth: 248 }}
          >
            <Link to={`/sponsor/${name}`} className="unstyled-link">
              <img
                src={image(logo, 350, 150)}
                className={s.sponsorImg}
                alt={name}
                style={{ maxWidth: 240, maxHeight: 240 }}
              />
            </Link>
          </div>
          <Link to={`/sponsor/${name}`} className="unstyled-link">
            <Button className={cn('styled-button w-max-content', !isOnWhite && 'on-purple')}>
              Explore Opportunities
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const SponserSectionContainter = styled(Container)`
  margin-top: 80px;
  margin-bottom: 100px; 
`;

const HeadingAlinger = styled.div`
  ${props => {
      return(`
        width: 100%;
        display: flex;
        align-items: baseline;
        margin-bottom: ${props.theme.space.xxl};
      `)
    }}
  `;

const Heading = styled.h2`
  ${props => {
      const {
        color,
        font,
      } = props.theme;
      
      return(`
        position: relative;
        z-index: 1;
        text-align: center;
        font-weight: ${font.weight_normal};
        font-family: ${font.main};
        font-size: ${font.size_h2};
        color: ${color.heading_2};
      `)
  }}
`;

const HomeSponsors = styled.div`
  ${props => {
        return(`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          
          @media (max-width: ${props.theme.mq.l}) {
            justify-content: space-around;
          }
        `)
    }}
`;

const CommunitySponsorsHome = styled.div`
  ${props => {
        const {
          space,
          mq,
        } = props.theme;
        
        return(`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: ${space.xl};
          @media (max-width: ${mq.l}) {
            justify-content: space-around;
          }
        `)
    }}
`;

const SponsorsSection = ({ sponsors }) => {
  return (
    <SponserSectionContainter>
      <HeadingAlinger>
        <Heading>Meet Our Sponsors</Heading>
          <BreakLine />
      </HeadingAlinger>
      
        <HomeSponsors>
          {sponsors
            .filter(sponsor => sponsor.isPremium)
            .map((sponsor, i) => {
              return (
                <div key={i}>
                  <SponsorMiniPremium key={sponsor._id} isOnWhite={true} {...sponsor} />
                </div>
                );
          })}
        </HomeSponsors>
        <BreakLine /> 
        <CommunitySponsorsHome> {/* NOTE: This is not shown when screen width is under 992px couldn't figure out why */}
          <HomeCommunitySponsors sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}/>
        </CommunitySponsorsHome>
      
    </SponserSectionContainter>
);
};

export default SponsorsSection;