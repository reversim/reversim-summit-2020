import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import Joi from '@hapi/joi';

import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {
  Paragraph,
  StepContainer,
  StepHeading,
  ListItem,
  ListBolt,
  FormField,
  ValidationWarning,
} from '../../GlobalStyledComponents/ReversimStyledComps';

//styled-components components

const ShortBioParagraph = styled(Paragraph)`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0;
    color: inherit;
  `}
`;

const ShortBioSubHeading = styled.h6`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_bold};
  `}
`;

const ShortBioList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0 ${space.xl} 0;
  `}
`;

const ShortBiography = styled(FormField)`
  ${({ theme: { space } }) => `
    margin-bottom: calc(4 * ${space.m});
  `}
`;


//React components
const Caption = () => (
  <Fragment>
    <ShortBioParagraph>Tell everybody a little bit about yourself. Useful sentences can be:</ShortBioParagraph>
    <ShortBioSubHeading>For example:</ShortBioSubHeading>
    <ShortBioList>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “A front-end developer for the last X years”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I work remotely, and interested in building remote teams and effective internal
        communication”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I enjoy developing and using open source code”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I participate in the Meetup X”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I have been influenced by the book ‘The Pragmatic Programmer’”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I have been playing with Deep Learning recently, took some online courses and eager to
        learn more!”
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        “I am an avid wikipedia contributor”
      </ListItem>
    </ShortBioList>
  </Fragment>
);

class ShortBio extends Component { 
  constructor(props){
    super(props);
    this.state = {      
      validationError: {
        field: '',
        message: '',
      },
    };
  };

  validationSchema = Joi.object({
    bio: Joi.string().min(30).max(300).required().label('Short Bio'),
  });

  isValidated = () => {
    const { bio } = this.props

    const toValidate = {
      bio,
    };

    const {error} = this.validationSchema.validate(toValidate);
    
    const validationError = error 
    ? {
      validationError: {
        field: error.details[0].path[0],
        message: error.details[0].message,
      },
    }
    : {
      validationError: {
        field: '',
        message: '',
      },
    };
    
    error && console.log('Error is: ', error.details[0]); // DELETE WHEN DONE

    const newState = _.assign({}, this.state, validationError);

    this.setState(newState);

    return error ? false : true;
  };

  render() {
    const {validationError} = this.state;
    const {bio, setValueDebounced} = this.props;
    return (
      <StepContainer>
        <StepHeading>Short Bio</StepHeading>
        <ShortBiography
          id="bio"
          value={bio}
          placeholder="We want to know you better."
          multiline={true}
          subtitle={<Caption />}
          onChange={e => setValueDebounced('bio', e.target.value)}
          onBlur={this.isValidated}
        />
        {validationError.field === "bio" && ValidationWarning(validationError.message)}
      </StepContainer>
    );
  }
};
export default ShortBio;
