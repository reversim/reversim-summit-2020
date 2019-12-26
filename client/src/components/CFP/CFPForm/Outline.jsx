import React, {Fragment, Component} from 'react';
import styled from 'styled-components';

import FormField, {SPACING} from '../../FormField';
import {
  ABSTRACT_MAX,
  ABSTRACT_MIN,
} from '../../../data/proposals';
import {getUserData} from '../UserForm';
import ga from 'react-ga';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  ResponsiveContainer,
  FormSubHeading,
  ListItem,
  ListBolt,
  Paragraph,
  Bold,
} from '../../GlobalStyledComponents/ReversimStyledComps';
import {Button, Input,} from 'reactstrap';

//styled-components components
const OutlineParagraph = styled(Paragraph)`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0;
    color: inherit;
  `}
`;

const OutlineSubHeading = styled(FormSubHeading)`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_bold};
  `}
`;

const AbstractList = styled.ul`
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
    <AbstractList>
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
    </AbstractList>
  </Fragment>
);

class Outline extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements; //NOTE: Problem here, as it is triggered by the <Button /> which is the target and also the element

    const {user, updateUserData, createProposal, history} = this.props;

    if (user) {
      const abstract = formElements.abstract.value;
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y =
          formElements.abstract.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        // NOTE: this returns a user to the abstract field in case the abstract is too long or too short
        return;
      }

      const categories = this.state.categories;
      if (!categories.length) {
        this.setState({missingCategories: true})
        const y =
          formElements.categories_hidden.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          750;
        window.scrollTo(0, y);
        // NOTE: this returns the user to the categories field in case there are none
        return;
      } 

      try {
        let newUser = getUserData(e.target.elements);
        newUser._id = user._id;
        await updateUserData(newUser);
        const result = await createProposal(this.getProposalData(formElements));
        history.push(`/session/${result._id}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  getProposalData = formElements => {
    const outline = formElements.outline.value;
    const legal = formElements.legal.checked;

    return {
      outline,
      legal,
    };
  };

  render(){
    const {
      outline,
      legal,
    } = this.props;

    return (
      <ResponsiveContainer>
        <FormField
          id="outline"
          label="Outline &amp; private notes"
          required={true}
          multiline={true}
          value={outline}
          placeholder=""
          subtitle={<OutlineFieldCaption />}
          className={SPACING}
        />
        <AgreementContainer>
          <CheckboxInput
            type="checkbox" 
            id="legal" 
            defaultChecked={legal} 
            required 
          />
          <CheckboxLable htmlFor="legal">
            I agree that all presented materials will be shared on the web by Reversim team,
            including the slides, video on youtube and mp3 on the podcast.
          </CheckboxLable>
        </AgreementContainer>
        <SubmitContainer>
          <SubmitInput type="submit"/>
          <SubmitButton color="primary" onClick={this.handleSubmit}>
            Submit
          </SubmitButton>
        </SubmitContainer>
      </ResponsiveContainer>
    );
  }
};

export default Outline;
