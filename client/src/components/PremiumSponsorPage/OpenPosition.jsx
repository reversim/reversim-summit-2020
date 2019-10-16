import React from 'react';
import styled from 'styled-components';

import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

import { Button } from "reactstrap";

library.add(faMapMarkerAlt);

// OpenPosition is rendered in SponsorPage
class OpenPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isEditing: false,
      isLoading: false
    };
  }

  render() {
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit, openPosition } = this.props;
    return (
      <div className="mr-5 mb-4 flex-1 d-flex flex-column">
        <div className={"bg-purple2 p-6"}>
          <div className="text-white">
            <div className="font-size-lg font-weight-bold">
              {openPosition.title}
            </div>
            <div>{openPosition.city}</div>
          </div>
        </div>
        <div className="bg-white b-strong border-purple2 p-6 d-flex flex-column flex-grow-1 justify-content-between">
          <div className="pb-3 premium-position">
            {openPosition.description}
          </div>
          <a href={openPosition.link} className="align-self-end">
            <Button className="styled-button w-max-content">APPLY</Button>
          </a>
        </div>
      </div>
    );
  }
}
  
export default OpenPosition;
