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

    ${isOnWhite && `
      border: solid 2px ${color.box_shadow_1};
      box-shadow: -2px 2px ${color.box_shadow_2}, -4px 4px ${color.box_shadow_1};   
    `}

    &:hover{
      color: ${color.text_1};
    }
  `}
`;

const FAButtonContainer = styled.div`
  display: flex;
`

const FAButton = styled.button`
  ${({ theme: { color } }) => `
    width: 50%;
    height: 40px;
    
    display: flex;
    justify-content: center;
    
    user-select: none;
    cursor: pointer;
    
    color: ${color.text_1};
    text-decoration: none;
    background: linear-gradient(to right, ${color.font_awsome_background_1} 0%, ${color.font_awsome_background_2} 100%);
    border: 0;
    border-radius: 0;
    border-color: ${color.font_awsome_border};
    transition: all 200ms;
    
    &:hover{
      color: ${color.text_1};
      text-decoration: none;
      background: linear-gradient(to right, ${color.font_awsome_background_1} 0%, ${color.font_awsome_background_2} 100%);
      box-shadow: inset 0px 0px 10px 2px ${color.font_awsome_box_shadow_1}, 0px 0px 10px 0px ${color.font_awsome_box_shadow_2};
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
                src={image(logo, 350, 150)}
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