import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//general elements

export const AlignCenter = styled.div`
  ${ ({ theme: { mq, space } }) =>`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;

      width: 100%;
      padding: 0 ${space.l};
      margin: 0 auto;

      @media (min-width: ${mq.s}) {
        max-width: 440px;
      };

      @media (min-width: ${mq.m}) {
        max-width: 720px;
      };

      @media (min-width: ${mq.l}) {
        max-width: 960px;
      };

      @media (min-width: ${mq.xl}) {
        max-width: 1280px;
      };    
    `}
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BreakLine = styled.hr`
  ${ ({ theme: { color, space, mq } }) =>`
      flex-grow: 1;
      align-self: center;
      margin-left: ${space.m};
      border-top: 1.5px solid ${color.box_shadow_1};

      @media (max-width: ${mq.l}){
        display: none;
      }
    `}
`;

export const WhiteLine = styled(BreakLine)`
  ${ ({ theme: {color} }) =>`
    border-top: 1.5px solid ${color.box_shadow_2};
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
  ${({ theme: { space, mq } }) => `
  width: 100%;

  display: flex;
  align-items: center;
  margin-bottom: calc(2 * ${space.l});

  @media (max-width: ${mq.m}){
      text-align: center;
    }
  `}
`;

export const HeadingDiamond = styled.img`
  ${ ({ theme: { space, mq } }) => `
    width: 85px;
    height: 85px;
    margin-right: -${space.xxl};
    
    @media (max-width: ${mq.m}){
      display: none;
    }
  `}
`;

export const HeadingTriangle = styled(HeadingDiamond)`
  ${ ({ theme: { space } }) => `
    width: 100px;
    height: 90px;
    margin-right: -${space.xl};
    margin-top: -${space.xl};
    `}
`;

export const HeadingCircle = styled.svg`
  ${ ({ theme: { color, space, mq } }) => `
      width: 100px;
      height: 100px;
      margin-right: -${space.xxl};
      fill: ${color.heading_decoratino};

      @media (max-width: ${mq.m}){
        display: none;
      }
  `}
`;

export const Heading2 = styled.h2`
  ${ ({ theme: { color, font, mq } }) =>`
    color: ${color.heading_2};
    font-family: ${font.main};
    font-size: ${font.size_h2};
    font-weight: ${font.weight_normal};

    @media (min-width: ${mq.l}){
      white-space: nowrap;
    }
    `}
`;

export const Heading3 = styled.h3`
  ${ ({ theme: { color, space, font } }) =>`
    color: ${color.text_1};
    font-family: ${font.main};
    font-size: ${font.size_h3};
    font-weight: ${font.weight_normal};
    margin-bottom: ${space.l};    
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
    font-weight: ${font.weight_normal};
    font-size: ${font.size_reg};
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

export const ButtonStyledLink = styled.a`
  ${ ({ theme: { color, font, space } }) =>`
      color: ${color.text_1};
      height: 40px;
      background: right bottom linear-gradient(to right, ${color.button_bkgr_2} 50%, ${color.button_bkgr_1} 50%);  
      background-size: 205% 100%;
      border: solid 2px ${color.box_shadow_2};
      box-shadow: -2px 2px ${color.box_shadow_1}, -4px 4px ${color.box_shadow_2};

      transition: all .5s ease-out;
      margin-bottom: ${space.xl};
      padding: ${space.m};
      letter-spacing: 1px;
      font-size: ${font.size_reg};
      font-family: ${font.button};
      font-weight: ${font.weight_bold};
      text-decoration: none;
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
    font-weight: ${font.weight_med};
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