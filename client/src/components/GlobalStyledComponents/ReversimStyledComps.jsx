import styled from 'styled-components';

export const Container = styled.div`
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

export const BreakLine = styled.hr`
  ${ ({ theme: { color, space } }) =>`
      width: 100%;
      flex-grow: 1;
      align-self: center;
      margin-left: ${space.m};
      border-top: 1.5px solid ${color.background_2};
    `}
`;

export const Heading2 = styled.h2`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.heading_2};
    font-size: ${font.size_h2};
    `}
`;

export const Heading3 = styled.h3`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.text_1};
    font-size: ${font.size_h3};
    `}
`;

export const Paragraph = styled.p`
  ${ ({ theme: { color, font } }) =>`
    color: ${color.text_1};
    font-size: ${font.size_reg};
    `}
`;

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

export const Input = styled.input`
  ${ ({theme: { space, font, color }}) =>`
    display: block;
  
    width: 100%;
    
    padding: calc(0.25 * ${font.size_reg}) calc(0.5 * ${font.size_reg});
    margin-bottom: ${space.l};

    font-size: calc(0.875 * ${font.size_reg});
    font-weight: 300;

    line-height: 1.5;
    
    color: ${color.input_1};
    background-color: ${color.input_bkgr_1};
    background-clip: padding-box;
    border: 2px solid ${color.input_border_1};
    border-radius: 0.25rem;
    box-shadow: inset 0 1px 1px ${color.input_box_shadow_1};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      color: ${color.input_1};
      background-color: ${color.input_bkgr_1};
      border-color: ${color.input_border_2};
      outline: 0;
      box-shadow: inset 0 1px 1px ${color.input_box_shadow_1}, 0 0 0 0.2rem ${color.input_box_shadow_2};
    }
  `}
`;

export const TextArea = styled.textarea`
${ ({theme: { space, font, color }}) =>`
  display: block;

  width: 100%;
  // height: calc(1.5em + 0.5rem + 4px);
  
  padding: calc(0.25 * ${font.size_reg}) calc(0.5 * ${font.size_reg});
  margin-bottom: ${space.l};

  font-size: calc(0.875 * ${font.size_reg});
  font-weight: 300;

  line-height: 1.5;
  
  color: ${color.input_1};
  background-color: ${color.input_bkgr_1};
  background-clip: padding-box;
  border: 2px solid ${color.input_border_1};
  border-radius: 0.25rem;
  box-shadow: inset 0 1px 1px ${color.input_box_shadow_1};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: ${color.input_1};
    background-color: ${color.input_bkgr_1};
    border-color: ${color.input_border_2};
    outline: 0;
    box-shadow: inset 0 1px 1px ${color.input_box_shadow_1}, 0 0 0 0.2rem ${color.input_box_shadow_2};
  }
`}
`;
