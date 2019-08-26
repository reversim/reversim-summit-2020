import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  };
  @media (min-width: 768px) {
    max-width: 720px;
  };
  @media (min-width: 992px) {
    max-width: 960px;
  };
  @media (min-width: 1200px) {
    max-width: 1280px;
  };
`