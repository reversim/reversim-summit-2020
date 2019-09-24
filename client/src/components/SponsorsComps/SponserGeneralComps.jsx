/* eslint-disable prettier/prettier */
import React from "react";

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
  ButtonStyledLink,
} from '../GlobalStyledComponents/ReversimStyledComps'
import {image} from '../../images';

library.add(faPencilAlt, faTrash);


//styled-components section

const SponsorItem = styled.div`
${( { theme: { space } } ) =>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${space.xxl};
`}
`;

const ImageContainer= styled.a`
  ${( { theme: { color, space } } ) => `
      width: 248px;
      height: 230px;
      max-width: 248px;

      position: relative;
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      margin-bottom: ${space.m};

      color: inherit;      
      border: 4px solid ${color.box_shadow_1};
      background: ${color.image_link_bkgr};
      text-decoration: none;
      cursor: pointer;
    `}
`;

const SMPLinkingButton = styled(ButtonStyledLink)`
  &:hover{
    color: ${props => props.theme.color.text_1};
  }
`;

const PencilButton = styled.button`
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

box-sizing: border-box;
margin: 0;
overflow: visible;
text-transform: none;
-webkit-appearance: button;
display: inline-block;
  /* text-align: center; */
  /* vertical-align: middle; */
  user-select: none;
  padding: 0.25rem 0.5rem;
  /* line-height: 1.5; */
  margin-left: 10px;
  cursor: pointer;
  /* font-family: Montserrat, sans-serif; */
  font-size: 16px;
  /* font-weight: 500; */
  /* letter-spacing: 1px; */
  outline: none;
  border: 0;
  transition: all 200ms;
  border-radius: 0;
  height: 40px;
  /* padding-top: 0;
  padding-bottom: 0; If both are deleted result is the same */
text-decoration: none;
  color: #fff;
border-color: #003acc;
  background: linear-gradient(to right, rgba(118, 12, 146, 0.4) 0%, rgba(0, 92, 177, 0.2) 100%);
  /* box-shadow: inset 0px 0px 10px 2px rgba(0, 238, 255, 0.2), 0px 0px 10px 0px rgba(89, 0, 255, 0.8); */
  &:hover{
    background: linear-gradient(to right, rgba(118, 12, 146, 0.4) 0%, rgba(0, 92, 177, 0.8) 100%);
    box-shadow: inset 0px 0px 10px 2px rgba(0, 238, 255, 0.2), 0px 0px 10px 0px rgba(89, 0, 255, 0.8);
    color: #fff;
    background-color: #003dd9;
    /* border-color: #003acc; */
    text-decoration: none;
  }
`;

//React components section

export class SponsorMiniPremium extends React.Component {
  state = {
    hovered: false
  };
  render() {
    const { 
      name,
      logo,
      onEdit,
      onDelete,
      isOnWhite
    } = this.props;

    return (
      <div>
        <span>
            <PencilButton 
              onClick={onEdit}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </PencilButton>
            <Button
              size="sm"
              color="danger"
              className="ml-2"
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </span>
        {/* {onEdit && (
          
        )} */}
        {/* Will need to create a Styled-Buttom for the above section */}

        <SponsorItem>
            <ImageContainer href={`/sponsor/${name}`}>
              <img
                src={image(logo, 350, 150)}
                className={s.sponsorImg}
                alt={name}
                style={{ maxWidth: 240, maxHeight: 240 }}
              />
            </ImageContainer>
            <SMPLinkingButton href={`/sponsor/${name}`}>
              Explore Opportunities
            </SMPLinkingButton>

        </SponsorItem>
      </div>
    );
  }
};