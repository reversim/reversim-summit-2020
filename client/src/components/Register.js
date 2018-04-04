import React from 'react';
import Section from "./Section";
import registerImg from '../images/register-bg.png';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";
import { REVERSIM_SUMMIT } from '../utils';

const Register = () => (
  <Section title="Register" bg={registerImg} isFullWidth={true}>
    <div className="py-5 text-center">
      <h4>Register to</h4>
      <h3 className="mb-5">{REVERSIM_SUMMIT}</h3>
      <p className="mb-5">Registration is now open!</p> {/* TODO flag */}
      <Link to="/register"><Button outline size="lg" color="inverse">Register</Button></Link>
    </div>
  </Section>
);

export default Register;