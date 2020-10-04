/* eslint-disable prettier/prettier */
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { ButtonStyledLink } from '../GlobalStyledComponents/ReversimStyledComps'
import {image} from '../../images';

library.add(faPencilAlt, faTrash);

//styled-components section

const SponsorItem = styled.div`
  ${({ theme: { space } } ) =>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${space.xl} ${space.s};
  `}
`;

const ImageContainer= styled.a`
  ${({ theme: { color, space } } ) => `
    width: 248px;
    height: 230px;

    display: flex;
    align-items: center;
    margin-bottom: ${space.m};

    color: inherit;
    border: 4px solid ${color.box_shadow_1};
    background: ${color.image_link_bkgr};
    text-decoration: none;
    cursor: pointer;
    transition: opacity 300ms linear;

    &:hover{
      opacity: 0.5;
    }
  `}
`;

const SponsorImg = styled.img`
    ${({ theme: { space } }) => `
      max-height: 240px;
      max-width: 240px;
      padding: ${space.s};
    `}
`;

const SMPLinkingButton = styled(ButtonStyledLink)`
  ${({ theme: { space, color }, isOnWhite }) =>`
    padding: 0 ${space.xl};
    display: flex;
    align-items: center;
  `}
`;

const FAButtonContainer = styled.div`
  display: flex;
`

const FAButton = styled.button`
  ${({ theme: { space, color } }) => `
    width: 50%;
    height: 40px; 
    display: flex;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    transition: all 200ms;
    padding: ${space.m} ${space.s} ${space.m} ${space.l};
    letter-spacing: 1px;
    color: ${color.text_3};
    position: relative;
    background: ${color.button_bkgr_2};

    text-align: center;
    text-decoration: none;

    transition: all .5s ease-out;

    &:after {
      content: '';
      background: ${color.button_bkgr_2};
      width: ${space.m};
      height: 65%;
      position: absolute;
      left: 100%;
      bottom: 0;
      transition: all .5s ease-out;
    }

    &:hover{
      text-decoration: none;
      color: ${color.text_3};
      background: ${color.button_bkgr_3};

      &:after {
        background: ${color.button_bkgr_3};
      }
    }
  `}
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
        {onEdit && (
          <FAButtonContainer>
            <FAButton
              onClick={onEdit}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </FAButton>
            <FAButton
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </FAButton>
          </FAButtonContainer>
        )}

        <SponsorItem>
            <ImageContainer href={`/sponsor/${name}`}>
              <SponsorImg
                src={image(logo, 240, 150)}
                alt={name}
              />
            </ImageContainer>
            <SMPLinkingButton isOnWhite={isOnWhite} href={`/sponsor/${name}`}>
              Explore Opportunities
            </SMPLinkingButton>

        </SponsorItem>
      </div>
    );
  }
};
