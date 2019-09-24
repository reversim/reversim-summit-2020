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

export const BreakLine = styled.hr`
  ${ ({ theme: { color, space } }) =>`
      flex-grow: 1;
      align-self: center;
      margin-left: ${space.m};
      border-top: 1.5px solid ${color.background_2};
      
    `}
`;