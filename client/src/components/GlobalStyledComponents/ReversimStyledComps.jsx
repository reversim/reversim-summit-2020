import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faExclamationTriangle, faCog } from '@fortawesome/free-solid-svg-icons';
import mediaQueryMin from '../../styles/MediaQueriesMixin';
import FormBit from '../FormField';

//general elements

export const PageHero = styled.div`
  ${({ theme: { space, color } }) => `
    padding: calc(12 * ${space.m}) 0 calc(3 * ${space.m}) 0;
    background: ${color.background_2};
  `}
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      margin: 0 auto;
      padding: calc(18.5 * ${space.m}) 0 calc(6.5 * ${space.m}) 0;
    `}
  `}
`;

export const ResponsiveContainer = styled.div`
  ${({ theme: { width } }) => `
    min-width: ${width.main_for_mq_xs};
    max-width: ${width.main_for_mq_xs};
    margin: 0 auto;
  `};

  ${mediaQueryMin.s`
    ${({ theme: { width } }) => `
      min-width: ${width.main_for_mq_s};    
      max-width: ${width.main_for_mq_s};  
    `}
  `};

  ${mediaQueryMin.m`
    ${({ theme: { width } }) => `
      min-width: ${width.main_for_mq_m};  
      max-width: ${width.main_for_mq_m};
    `}
  `};

  ${mediaQueryMin.l`
    ${({ theme: { width } }) => `
      min-width: ${width.main_for_mq_l};  
      max-width: ${width.main_for_mq_l};
    `}
  `};

  ${mediaQueryMin.xl`
    ${({ theme: { width } }) => `
      min-width: ${width.main_for_mq_xl};  
      max-width: ${width.main_for_mq_xl};
    `}
  `};

  ${mediaQueryMin.xxl`
    ${({ theme: { width } }) => `
      min-width: ${width.main};  
      max-width: ${width.main};
    `}
  `};
`;

export const AlignCenter = styled(ResponsiveContainer)`
  ${({ theme: { space } }) =>`
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;

      
      padding: 0 ${space.l};
      margin: 0 auto;
    `}      
`;

export const AlignCenterColumn = styled(AlignCenter)`
  flex-direction: column;
`;

export const BreakLineMain = styled.hr`
  ${({ theme: { color } }) =>`
    border-top: 2px solid ${color.box_shadow_1};
    display: none;
  `}

  ${mediaQueryMin.s`
    ${({ theme: { space } }) =>`
    min-width: 100px;  
    display: inline-block;
      flex-grow: 1;
      align-self: center;
      margin-left: ${space.m};
    `}`}
`;

export const BreakLineInverted = styled(BreakLineMain)`
  ${({ theme: {color} }) =>`
    border-top: 2px solid ${color.box_shadow_2};
  `}
`;

export const LongTextContainer = styled.div`
${({ theme: { width } }) => `
    min-width: ${width.main_for_mq_xs};
    max-width: ${width.main_for_mq_xs};
  `};

  ${mediaQueryMin.s`
    ${({ theme: { width } }) => `
      min-width: ${width.main_for_mq_s};    
      max-width: ${width.main_for_mq_s};  
    `}
  `};

  ${mediaQueryMin.m`
    ${({ theme: { width } }) => `
      min-width: ${width.main_for_mq_m};  
      max-width: ${width.main_for_mq_m};
    `}
  `};
`;


// Emphasis
/*NOTE:
The below components (Bold, Italic) is needed to override the problematic reset file in:
/home/yariv/Projects/reversim/client/node_modules/styled-reset/lib/index.js

It assigns <em> with "font-style: inherit" which does not let it be 'italic'.
Tried to change it in the file on line 21 (i.e. deleted '.em') but it had no effect on the text.
*/

export const Bold = styled.span`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_bold}
  `}
`;

export const Italic = styled.span`
  font-style: italic;
`;

export const Important = styled.span`
  ${({ theme: { color } }) => `
    color: ${color.important};
  `};
`;

//<h2, 3, ...> and <p>

export const HeadingAligner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

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
  ${({ theme: { space, font } }) => `
    width: calc(2.4 * ${font.size_h3});
    height: calc(2.4 * ${font.size_h3});
    margin-right: -${space.xxl};
  `}
`;

export const HeadingTriangle = styled(HeadingDiamond)`
  ${({ theme: { space, font } }) => `
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
    ${({ theme: { color, space, font } }) => `
      width: calc(2.85 * ${font.size_h3});
      height: calc(2.85 * ${font.size_h3});
      fill: ${color.heading_decoration};
      margin: -${space.l} -${space.xxl} ${space.xl} 0; 
    `}

  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
        margin-top: ${space.xl};
    `}`}
`;

const HoopJSX = ({className}) => {
  return (
    <svg className={className}>
      <path d="M50,15.62A34.38,34.38,0,1,0,84.37,50,34.43,34.43,0,0,0,50,15.62M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z"/>
    </svg>
  );
};

export const HeadingHoop = styled(HoopJSX)`
  ${({ theme: { space, font, color } }) => `
    margin-right: -${space.l};
    width: calc(2.08 * ${font.size_h2});
    height: calc(2.08 * ${font.size_h2});
    fill: ${color.heading_decoration}
  `}
`;

export const HeadingZigzag = styled.img`
  ${({ theme: { space, font }})=> `
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
  ${({ theme: { color, font, space } }) =>`
    color: ${color.heading_2};
    margin-right: calc(2 * ${space.m});
    font-family: ${font.main};
    font-size: ${font.size_h3};
    font-weight: ${font.weight_normal};
  `}

    ${mediaQueryMin.l`
      ${({ theme: { font } }) =>`
        white-space: nowrap;
        font-size: ${font.size_h2};
      `}
    `}
`;

export const PageHeading = styled(Heading2)`
${({ theme: { color } }) => `
  max-width: 90%;
  text-align: initial;
  color: ${color.text_1};
  `}
`

export const Heading3 = styled.h3`
  ${({ theme: { color, space, font } }) =>`
    margin-bottom: ${space.l};
    color: ${color.text_1};
    font-family: ${font.main};
    font-size: ${font.size_h3};
    font-weight: ${font.weight_normal};
  `}
`;

export const Heading4 = styled.h4`
  ${({ theme: { color, space, font } }) =>`
    color: ${color.text_1};
    font-family: ${font.main};
    font-size: ${font.size_h4};
    font-weight: ${font.weight_normal};
    margin-bottom: ${space.m};    
  `}
`;

export const Heading5 = styled.h5`
  ${({ theme: { color, space, font } }) =>`
    color: ${color.text_1};
    font-family: ${font.main};
    font-size: ${font.size_h5};
    font-weight: ${font.weight_normal};
    margin-bottom: ${space.m};    
  `}
`;

export const Paragraph = styled.p`
  ${({ theme: { color, font } }) =>`
    color: ${color.text_1};
    font-family: ${font.main};
    font-weight: ${font.weight_medium};
    font-size: ${font.size_reg};
    line-height: 1.7;
  `}
`;

export const Paragraph2 = styled(Paragraph)`
  ${({ theme: { color} }) =>`
    color: ${color.text_2};
  `}
`;

// Lists

export const ListItem = styled.li`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.s};
    line-height: 1.7;
  `}
`;

export const ListBolt = styled(FontAwesomeIcon)`
 ${({theme: { space, color }}) =>`
  margin-right: ${space.m};
  color: ${color.font_awsome_watch};
  `}
`;

export const FullScreenBoundries = styled(AlignCenterColumn)`
  ${({ theme: { space } }) => `
    min-height: 100vh;  
    padding: calc(3 * ${space.xxl}) ${space.l};
    justify-content: center;
  `};
  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
    padding: calc(3 * ${space.xxl}) ${space.xl};
    `}
  `};
`;

export const MarginedPageHeading = styled(PageHeading)`
  ${({ theme: { color, space } }) => `
    color: ${color.text_3};
    margin: ${space.xl} 0;
    text-align: center;
    `}
    ${mediaQueryMin.l`
      white-space: inherit;
    `}
`;

// <a>s and <button>s
export const SimpleLink = styled.a`
  ${({ theme: { color } }) =>`
    color: ${color.text_1};
    font-size: inherit;

    &:hover{
      color: ${color.text_1};
    }
  `}
`;
export const InvertedColorLink = styled(SimpleLink)`
  ${({ theme: { color } }) =>`
    color: ${color.text_3};

    &:hover{
      color: ${color.text_3};
    }
  `}
`;

export const ItalicLink = styled(InvertedColorLink)`
  font-style: italic;
`;

export const ButtonStyledLink = styled.a`
  ${({ theme: { color, font, space } }) =>`
      width: max-content;
      min-width: 280px;
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
        color: ${color.text_1};
      }
  `};
`;

export const InvertedButtonStyledLink = styled(ButtonStyledLink)`
  ${({ theme: { color } }) => `
    border: solid 2px ${color.box_shadow_1};
    box-shadow: -2px 2px ${color.box_shadow_2}, -4px 4px ${color.box_shadow_1};
  `}
`; 

export const StyledButton = styled.button`
  ${({theme: {color, font, space,}}) => `
  width: max-content;
  min-width: 280px;
  height: 40px;
  margin: 0 ${space.m} ${space.xl} ${space.m};
  padding: ${space.m} ${space.l};
  letter-spacing: 1px;
  color: ${color.text_1};

  background: right bottom linear-gradient(to right, ${color.button_bkgr_2} 50%, ${color.button_bkgr_1} 50%);  
  background-size: 205% 100%;
  border: solid 2px ${color.box_shadow_1};
  box-shadow: -2px 2px ${color.box_shadow_2}, -4px 4px ${color.box_shadow_1};

  font-size: ${font.size_reg};
  font-family: ${font.button};
  font-weight: ${font.weight_bold};
  text-align: center;
  text-decoration: none;

  transition: all .5s ease-out;

  &:hover{
    background-position: left bottom;
    text-decoration: none;
    color: ${color.text_1};
  }
  `}
`;

// <input>s and <textarea>

export const Input = styled.input`
  ${({theme: { space, font, color }}) =>`
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
  ${({theme: { space, font, color }}) =>`
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

export const FontAwsomeTrash = styled(FontAwesomeIcon)`
  ${({ theme: { color, space } }) => `
    margin: 0 ${space.m};
    color: ${color.font_awsome_trash};
    cursor: pointer;
  `}
`;

//Components for the StepZilla form (CFP form)
export const StepContainer = styled(ResponsiveContainer)`
  ${({ theme: { space } }) => `
    padding: 0 ${space.xl};
  `}
`;

export const FormField = styled(FormBit)`
  ${({ theme: { space } }) => `
    margin-bottom: ${space.xl};
  `}
`;

export const StepHeading = styled(Heading4)`
  ${({ theme: { color, font } }) => `
    color: ${color.text_3};
    font-weight: ${font.weight_medium};
  `}
`;

export const InputLabel = styled.label`
  ${({ theme: { space, font, color } }) => `
    display: block;
    margin: ${space.m} 0;
    font-family: ${font.main};
    font-size: ${font.size_md};
    color: ${color.text_3};
  `}
`;

export const FormSubHeading = styled.span`
  ${({ theme: { color, font, space } }) => `
    color: ${color.step_zilla_sub_heading};
    font-family: ${font.main};
    font-size: ${font.size_reg};
    font-weight: ${font.weight_medium};
    margin-bottom: ${space.m};
  `}
`;

const ValidationErrorContainer = styled.div`
  ${({ theme: { color, space, font } }) => `
    margin-bottom: ${space.l};
    padding: ${space.m};
    display: flex;
    align-items: center;
    background: ${color.important};
    color: ${color.text_1};
    font-weight: ${font.weight_bold};
    border-radius: 5px;
  `};
`;

const NoteConatiner = styled(ValidationErrorContainer)`
  ${({ theme: { color } }) => `
  background: ${color.note_this};
  `};
`;

const NoteOrErrorBolt = styled(ListBolt)`
  ${({ theme: { color } }) => `
    color: ${color.text_1};
  `};
`;

export const NoteMessage = noteMessage => (
  <NoteConatiner>
    <NoteOrErrorBolt icon={faVideo}/>
    <p>{noteMessage}</p>
  </NoteConatiner>
);

export const ValidationWarning = errorMessage => (
  <ValidationErrorContainer>
    <NoteOrErrorBolt icon={faExclamationTriangle}/>
    <p>{errorMessage}</p>
  </ValidationErrorContainer>
);

// Loading Page

const spin360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled(FontAwesomeIcon)`
${({ theme: { color } }) => `
  color: ${color.font_awsome_watch}
`};

  font-size: 100px;
  animation: 1.5s linear infinite ${spin360};
`;

export const LoadingPage = () => (
  <FullScreenBoundries>
    <MarginedPageHeading>Loading...</MarginedPageHeading>
    <SpinnerContainer icon={faCog}/>
  </FullScreenBoundries>
  );

// Premium Sponsor and Speaker Page

export const TopContainer = styled.div`
${({ theme: { color, space } }) => `
  width: 100%;

  margin: 0 auto calc(30 * ${space.m}) auto;
  padding: ${space.xxl} 0 ${space.xl} calc(3.5 * ${space.m});
  
  background-color: ${color.background_2};
`}

  ${mediaQueryMin.m`
    padding-bottom: 0;
  `}

  ${mediaQueryMin.l`
    ${ ({ theme: { space } }) => `
    margin: 0 auto calc(15 * ${space.m}) auto;
    padding-bottom: calc(3 * ${space.m});
  `}`}
  
  ${mediaQueryMin.xl`
    padding-bottom: 0;
    display: flex;
    justify-content: center;
  `}
`;
