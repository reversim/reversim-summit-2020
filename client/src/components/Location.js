import React from 'react';
import Map from './Map';
import {Button, Container} from 'reactstrap';

const Location = () => (
  <section className="mb-20 location-section">
    <Container>
      <h1 className="mb-0" style={{zIndex: 1, position: 'relative'}}>
        Venue
      </h1>
      <div className="bg-emph py-9 px-4 d-inline-block h1-up">
        <h3 className="mb-0">HaCameri theater,<br/>
          Sderot Sha'ul HaMelech 19
        </h3>
      </div>
      <div style={{marginTop: -20}} className="ml-4">
        <Map />
      </div>
      <div className="d-flex align-items-center mt-9">
        <div className="border border-cyan mr-4 flex-1" />
        {/*todo neta- put real link*/}
        <a href="http://www.cameri.co.il/" target="_blank" rel="noopener noreferrer">
          <Button>More info from HaCameri</Button>
        </a>
      </div>
    </Container>
  </section>
);

export default Location;
