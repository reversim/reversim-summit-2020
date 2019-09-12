import styled from 'styled-components';

export const Container = styled.div`
  ${props => {
    const {
      s,
      m,
      l,
      xl,
    } = props.theme.mq;

    return (`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;

      width: 100%;
      padding-right: 1rem;
      padding-left: 1rem;
      margin-right: auto;
      margin-left: auto;
      @media (min-width: ${s}) {
        max-width: 440px;
      };
      @media (min-width: ${m}) {
        max-width: 720px;
      };
      @media (min-width: ${l}) {
        max-width: 960px;
      };
      @media (min-width: ${xl}) {
        max-width: 1280px;
      };    
    `)
  }}

`

export const ButtonStyledLink = styled.a`
  ${props => {
    const {
      color:{
        text_1,
        button_bkgr_1,
        button_bkgr_2,    
        box_shadow_1,
        box_shadow_2,
      },
      font:{
        button,
        weight_bold,
        size_reg,
      },
      space,
    } = props.theme;

    return (`
      color: ${text_1};
      height: 40px;
      background: right bottom linear-gradient(to right, ${button_bkgr_2} 50%, ${button_bkgr_1} 50%);  
      background-size: 205% 100%;
      border: solid 2px ${box_shadow_2};
      box-shadow: -2px 2px ${box_shadow_1}, -4px 4px ${box_shadow_2};
      transition: all .5s ease-out;
      margin-bottom: ${space.xl};
      padding: ${space.m};
      letter-spacing: 1px;
      font-size: ${size_reg};
      font-family: ${button};
      font-weight: ${weight_bold};
      text-decoration: none;
      &:hover{
        background-position: left bottom;
        text-decoration: none;
        color: inherit;
      }
    `)
  }};

`;
