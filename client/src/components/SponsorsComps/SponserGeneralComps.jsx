/* eslint-disable prettier/prettier */
import React from "react";

import s from "../Sponsors.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import styled from 'styled-components';
import {
  Container,
  BreakLine,
} from '../GlobalStyledComponents/ReversimStyledComps'
import {image} from '../../images';

library.add(faPencilAlt, faTrash);


export class SponsorMiniPremium extends React.Component {
  state = {
    hovered: false
  };
  render() {
    const { 
      name,
      logo,
      onEdit,
      onDelete,
      isOnWhite
    } = this.props;

    return (
      <div>
        {onEdit && (
          <span>
            <Button size="sm" color="primary" className="ml-2" onClick={onEdit}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            <Button
              size="sm"
              color="danger"
              className="ml-2"
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </span>
        )}
        <div className="d-flex flex-column align-items-center mb-10">
          <div
            className="p-relative text-center white-bg mb-2 d-flex justify-content-center align-items-center b-strong cursor-pointer"
            style={{ width: 248, height: 230, maxWidth: 248 }}
          >
            <Link to={`/sponsor/${name}`} className="unstyled-link">
              <img
                src={image(logo, 350, 150)}
                className={s.sponsorImg}
                alt={name}
                style={{ maxWidth: 240, maxHeight: 240 }}
              />
            </Link>
          </div>
          <Link to={`/sponsor/${name}`} className="unstyled-link">
            <Button className={cn('styled-button w-max-content', !isOnWhite && 'on-purple')}>
              Explore Opportunities
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};