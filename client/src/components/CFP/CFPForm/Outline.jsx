import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import Joi from '@hapi/joi';

import ga from 'react-ga';

import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {
  StepContainer,
  StepHeading,
  ListItem,
  ListBolt,
  Paragraph,
  Bold,
  FormField,
  ValidationWarning,
} from '../../GlobalStyledComponents/ReversimStyledComps';
import {Button} from 'reactstrap';

//styled-components components
const OutlineParagraph = styled(Paragraph)`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0;
    color: inherit;
  `}
`;

const OutlineSubHeading = styled.h6`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_bold};
  `}
`;

const OutlineList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0 ${space.xl} 0;
  `}
`;

const AgreementContainer = styled.div`
  ${({ theme: { space } }) => `
    display: flex;
    margin-bottom: calc(3 * ${space.m});
  `}
`;

const CheckboxInput = styled.input`
  ${({ theme: { color, space, font } }) => `
  opacity: 0;
  position: absolute;
  pointer-events: none;

  & + label {
    margin-bottom: 0;
  }

  & + label:before {
    content: '';
    display: inline-block;
    border: 2px solid ${color.box_shadow_1_dimmed};
    border-radius: 5px;
    width: 25px;
    height: 25px;
    margin-right: ${space.s};
    vertical-align: middle;
    color: ${color.text_3};
    line-height: 24px;
    text-align: center;
    font-size: ${font.size_bg};
    text-indent: 1px;
    min-width: 25px;
  }

  &:checked + label:before {
    content: '✓';
    border: 2px solid ${color.box_shadow_1};
  }
  `}
`;

const CheckboxLable = styled.label`
  ${({ theme: { color } }) => `
    display: flex;
    transition: color 0.5s;
    
    &:hover{
      color: ${color.text_3};
      cursor: pointer;
    };
  `}
`;

const SubmitContainer = styled.div`
  text-align: center;
`;

const SubmitInput = styled.input`
  display: none;
`;

const SubmitButton = styled(Button)`
  ${({ theme: { color, font, space } }) =>`
    min-width: 120px;
    margin: 0 ${space.m} ${space.xl} ${space.m};
    padding: ${space.s} ${space.l};
    color: ${color.text_1};

    background: right bottom linear-gradient(to right, ${color.button_bkgr_2} 50%, ${color.button_bkgr_1} 50%);  
    background-size: 205% 100%;
    border: solid 2px ${color.box_shadow_3};
    border-radius: 0;
    box-shadow: -2px 2px ${color.box_shadow_1}, -4px 4px ${color.box_shadow_3};

    font-size: ${font.size_bg};
    font-family: ${font.button};
    font-weight: ${font.weight_bold};
    text-align: center;
    text-decoration: none;

    transition: all .5s ease-out;

    &:hover{
      background-position: left bottom;
      text-decoration: none;
      color: inherit;
    }      
  `};
`;

//React components
const OutlineFieldCaption = () => (
  <Fragment>
    <OutlineParagraph>
      This part is only visible to the moderation team. The outline should include the main subjects
      you intend to cover with a timing estimation and total timing. A general overview is fine, we
      don’t expect a per-slide description for now.
    </OutlineParagraph>
    <OutlineSubHeading>For example:</OutlineSubHeading>
    <OutlineList>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        2m: Introduction: Who am I and my professional background
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        5m: Architectural overview: how we built 500 different micro-services over 5 years, and why
        we ended up supporting 15 different programming languages.
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        5m: The latency math behind a micro-service call-chain, and why we had to over-provision
        containers to avoid a 1s response time because accumulated latency is not a normal distribution
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        15m: Our solution: Measuring everything and using a managed machine-learning platform to
        optimize our response time and server utilization
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        5m: The open source power! How can you use our code to optimize your production system
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        5m: Q&A
      </ListItem>
      <ListItem>
        <Bold>Total time: 37m</Bold>
      </ListItem>
    </OutlineList>
  </Fragment>
);

class Outline extends Component {
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
    outline: Joi.string().required('Outline'),
    iAgree: Joi.boolean().allow(true).required().label('I agree'),
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
    : {};
    
    error && console.log('Error is: ', error.details[0]); // DELETE WHEN DONE

    const newState = _.assign({}, this.state, validationError);

    error && this.setState(newState);

    return error ? false : true;
  };

  render() {
    const {validationError} = this.state;
    const {
      outline,
      setValueDebounced,
      handleSubmit,
    } = this.props;

    return (
      <StepContainer>
        <StepHeading>Outline &amp; private notes</StepHeading>
        <FormField
          id="outline"
          value={outline}
          required={true}
          multiline={true}
          placeholder="Add your sessionn outline and notes here."
          subtitle={<OutlineFieldCaption />}
          onChange={e => setValueDebounced('outline', e.target.value)}
          onBlure={this.isValidated}
        />
        {validationError.field === "outline" && ValidationWarning(validationError.message)}
        <AgreementContainer>
          <CheckboxInput
            type="checkbox"
            id="legal"
            required
            onChange={e => setValueDebounced('iAgree', e.target.checked ? true : false)}
          />
          <CheckboxLable htmlFor="legal">
            I agree that all presented materials will be shared on the web by Reversim team,
            including the slides, video on youtube and mp3 on the podcast.
          </CheckboxLable>
          {validationError.field === "iAgree" && ValidationWarning(validationError.message)}
        </AgreementContainer>
        <SubmitContainer>
          <SubmitInput />
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </SubmitContainer>
      </StepContainer>
    );
  };
};
export default Outline;
