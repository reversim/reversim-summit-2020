import React from "react";
import Map from "./Map";
import { Button, Container } from "reactstrap";
import squares from "../images/SVG/squares.svg";
import venuePic from "../images/bitan10.jpeg";

const Location = () => (
  <section className="mt-16 mb-20">
    <Container>
      <div className="d-flex">
        <img src={squares} alt="location" style={{ width: 122, height: 122 }} />
        <div className="flex-grow-1 ml-2">
          <div className="d-flex">
            <div className="mb-0 text-purple2 font-size-xxl">Venue</div>
            <div className="hl bg-purple2" />
          </div>
          <div className=" text-black font-size-lg font-weight-bold">
            {"Ganey HaTaarucha, TLV"}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="map-wrapper">
            <Map/>
          </div>
          <div className="venue-img">
            <img
              src={venuePic}
              alt="venue"
              style={{ width: '100%', marginTop:-300 }}
              className="b-strong border-purple2"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Location;
