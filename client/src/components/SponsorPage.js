import React from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import SponsorPageRoute from './SponsorPageRoute';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';


const SponsorPage = ({sponsor, color, isFull, ...props}) => {
  console.log('sponsor', sponsor)
  // const {} = sponsor;
  return (
    <Page title={sponsor.name} {...props}>
      <Container>
        <div>Big Thanks to our sponsor</div>
        <div>{sponsor.name}</div>
      </Container>
    </Page>
  );
};

export default SponsorPageRoute(SponsorPage);
