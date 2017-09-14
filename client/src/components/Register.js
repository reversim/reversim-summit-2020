import React from 'react';
import Section from "./Section";
import registerImg from '../images/register-bg.png';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";

const Register = () => (
  <Section title="Register" bg={registerImg} isFullWidth={true}>
    <div className="py-5 text-center">
      <h4>Register to</h4>
      <h3 className="mb-5">Reversim Summit 2017</h3>
      <p className="mb-5">Registration opens in 2 days!</p>
      <Link to="/register"><Button outline size="lg" color="inverse">Register</Button></Link>
    </div>
  </Section>
);

export default Register;