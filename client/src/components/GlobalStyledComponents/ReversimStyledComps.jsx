import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mediaQueryMin from '../../styles/MediaQueriesMixin';

//general elements

export const AlignCenter = styled.div`
  ${ ({ theme: { space } }) =>`
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      padding: 0 ${space.l};
      margin: 0 auto;
      `}

      ${mediaQueryMin.s`
        ${({ theme: { width } }) => `
          max-width: ${width.main_for_mq_s};  
          `}`};

      ${mediaQueryMin.m`
        ${({ theme: { width } }) => `
          max-width: ${width.main_for_mq_m};  
          `}`};

      ${mediaQueryMin.l`
        ${({ theme: { width } }) => `
          max-width: ${width.main_for_mq_l};  
          `}`};

      ${mediaQueryMin.xl`
        ${({ theme: { width } }) => `
          max-width: ${width.main_for_mq_xl};  
          `}`};

      ${mediaQueryMin.xxl`
        ${({ theme: { width } }) => `
          max-width: ${width.main_for_mq_xxl};  
          `}`};
`;

export const AlignCenterColumn = styled(AlignCenter)`
  flex-direction: column;
`;

export const BreakLineMain = styled.hr`
  ${({ theme: { color } }) =>`
    border-top: 2px solid ${color.box_shadow_1};
    `}
 
  ${mediaQueryMin.m`
    ${({ theme: { space } }) =>`
      flex-grow: 1;
      align-self: center;
      margin-left: ${space.m};
      `}`}
`;

export const BreakLineInverted = styled(BreakLineMain)`
  ${ ({ theme: {color} }) =>`
    border-top: 2px solid ${color.box_shadow_2};
  `}
`;

export const StyledFontAwsomeIcon = styled(FontAwesomeIcon)`
  ${ ({ theme: { color, space } }) => `
    margin: 0 ${space.m};
    color: ${color.font_awsome_trash};
    cursor: pointer;
  `}
`;

//<h2, 3, ...> and <p>

export const HeadingAligner = styled.div`
  text-align: center;

  ${mediaQueryMin.m`
    justify-content: center;
    `}

  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      width: 100%;

      display: flex;
      align-items: center;
      margin: ${space.l} 0;
      `}`}
`;

export const HeadingDiamond = styled.img`
  ${ ({ theme: { space, font } }) => `
    width: calc(2.4 * ${font.size_h3});
    height: calc(2.4 * ${font.size_h3});
    margin-right: -${space.xxl};
    `}
`;

export const HeadingTriangle = styled(HeadingDiamond)`
  ${ ({ theme: { space, font } }) => `
    width: calc(2.85 * ${font.size_h3});
    height: calc(2.5 * ${font.size_h3});
    margin-right: -${space.xl};
    margin-top: -${space.xl};
    `}
`;

const CircleJSX = ({className}) => {
  return (
    <svg className={className}>
      <path d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z" />
    </svg>
  );
}; //this component is used as the basis for the HeadingCircle styled-component below

export const HeadingCircle = styled(CircleJSX)`
  ${mediaQueryMin.m`
    ${ ({ theme: { color, space, font } }) => `
        width: calc(2.85 * ${font.size_h3});
        height: calc(2.85 * ${font.size_h3});
        margin-right: -${space.xxl};
        fill: ${color.heading_decoratino};
        `}`}
`;

export const HeadingZigzag = styled.img`
  ${ ({ theme: { space, font }})=> `
    height: calc(2.3 * ${font.size_h3});
    margin-right: -${space.m};
  `}
`;


export const HeadingSquares = styled(HeadingDiamond)`
  width: 122px;
  height: 122px;
  margin-right: 0px;
`;

export const Heading2 = styled.h2`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.heading_2};
    font-family: ${font.main};
    font-size: ${font.size_h2};
    font-weight: ${font.weight_normal};
    `}

    ${mediaQueryMin.l`
      white-space: nowrap;
      `}
`;

export const Heading3 = styled.h3`
  ${ ({ theme: { color, space, font } }) =>`
    margin-bottom: ${space.l};
    color: ${color.text_1};
    font-family: ${font.main};
    font-size: ${font.size_h3};
    font-weight: ${font.weight_normal};
    `}
`;

export const Heading4 = styled.h4`
  ${ ({ theme: { color, space, font } }) =>`
    color: ${color.text_1};
    font-family: ${font.main};
    font-size: ${font.size_h4};
    font-weight: ${font.weight_normal};
    margin-bottom: ${space.m};    
    `}
`;

export const Paragraph = styled.p`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.text_1};
    font-family: ${font.main};
    font-weight: ${font.weight_medium};
    font-size: ${font.size_reg};
    line-height: 1.7;
    `}
`;

export const Paragraph2 = styled(Paragraph)`
  ${ ({ theme: { color} }) =>`
    color: ${color.text_2};
    `}
`;

// <a>s and <button>s
export const SimpleLink = styled.a`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.text_1};
    font-size: ${font.size_reg};

    &:hover{
      color: ${color.text_1};
    }
    `}
`;
export const InvertedColorLink = styled.a`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.text_3};
    font-size: ${font.size_reg};

    &:hover{
      color: ${color.text_3};
    }
    `}
`;

export const ButtonStyledLink = styled.a`
  ${ ({ theme: { color, font, space } }) =>`
      width: max-content;
      height: 40px;
      margin: 0 ${space.m} ${space.xl} ${space.m};
      padding: ${space.m} ${space.l};
      letter-spacing: 1px;
      color: ${color.text_1};

      background: right bottom linear-gradient(to right, ${color.button_bkgr_2} 50%, ${color.button_bkgr_1} 50%);  
      background-size: 205% 100%;
      border: solid 2px ${color.box_shadow_2};
      box-shadow: -2px 2px ${color.box_shadow_1}, -4px 4px ${color.box_shadow_2};

      font-size: ${font.size_reg};
      font-family: ${font.button};
      font-weight: ${font.weight_bold};
      text-align: center;
      text-decoration: none;

      transition: all .5s ease-out;

      &:hover{
        background-position: left bottom;
        text-decoration: none;
        color: inherit;
      }
    `};
`;

export const FormButton = styled.button`
  ${ ({theme: {color, font, space,}}) => `
    box-shadow: inset 0px 0px 10px 2px ${color.font_awsome_box_shadow_3};
    background: ${color.background_linear_gradient_1};
    font-family: ${font.form_button};
    font-size: ${font.size_reg};
    font-weight: ${font.weight_medium};
    color: ${color.text_1};
    letter-spacing: 1px;
    outline: none;
    border: 0;
    transition: all 200ms;
    border-radius: 0;
    height: 40px;

    position: relative;

    margin: ${space.l} 0;
    padding: calc(0.25 * ${font.size_reg}) calc(0.5 * ${font.size_reg});
    line-height: 1.5;

    display: inline-block;
    text-transform: none;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    overflow: visible;

    &:hover{
      background: ${color.background_linear_gradient_2};
      box-shadow: inset 0px 0px 10px 2px ${color.form_button_box_shadow_1}, 0px 0px 10px 0px ${color.form_button_box_shadow_2};
      color: ${color.text_1};
      border-color: ${color.form_button_border_hover};
      text-decoration: none;
    }

    &:active{
      background: ${color.background_linear_gradient_2};
    }
  `}
`;

// <input>s and <textarea>

export const Input = styled.input`
  ${ ({theme: { space, font, color }}) =>`
    display: block;
  
    width: 100%;
    
    padding: calc(0.25 * ${font.size_reg}) calc(0.5 * ${font.size_reg});
    margin: ${space.l} 0;

    font-family: ${font.main};
    font-size: calc(0.875 * ${font.size_reg});
    font-weight: 300;

    line-height: 1.5;
    
    color: ${color.input_1};
    background-color: ${color.input_bkgr_1};
    background-clip: padding-box;
    border: 2px solid ${color.input_border_1};
    border-radius: calc(0.25 * ${font.size_reg});
    box-shadow: ${color.input_box_shadow_1};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      color: ${color.input_1};
      background-color: ${color.input_bkgr_1};
      border-color: ${color.input_border_2};
      outline: 0;
      box-shadow: ${color.input_box_shadow_1}, ${color.input_box_shadow_2};
    }
  `}
`;

export const TextArea = styled.textarea`
${ ({theme: { space, font, color }}) =>`
  display: block;

  width: 100%;
  
  padding: calc(0.25 * ${font.size_reg}) calc(0.5 * ${font.size_reg});
  margin: ${space.l} 0;

  font-family: ${font.main};
  font-size: calc(0.875 * ${font.size_reg});
  font-weight: 300;

  line-height: 1.5;
  
  color: ${color.input_1};
  background-color: ${color.input_bkgr_1};
  background-clip: padding-box;
  border: 2px solid ${color.input_border_1};
  border-radius: calc(0.25 * ${font.size_reg});
  box-shadow: ${color.input_box_shadow_1};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: ${color.input_1};
    background-color: ${color.input_bkgr_1};
    border-color: ${color.input_border_2};
    outline: 0;
    box-shadow: ${color.input_box_shadow_1}, ${color.input_box_shadow_2};
  }
`}
`;

export const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;