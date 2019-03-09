import React from "react";
import Map from "./Map";
import { Button, Container } from "reactstrap";
import squares from "../images/SVG/squares.svg";
import venuePic from "../images/venue-pic.png";

const Location = () => (
  <section className="mb-20">
    <Container>
      <div className="mb-8 d-flex">
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
        <div className="ml-4">
          <div style={{float:'right', position:'relative'}}>
            <Map/>
          </div>
          <div>
            <img
              src={venuePic}
              alt="venue"
              style={{ width: 1000, marginTop:-300 }}
              className="b-strong border-purple2"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Location;
