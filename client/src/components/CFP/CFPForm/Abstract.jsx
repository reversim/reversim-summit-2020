import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Joi from '@hapi/joi';

import {
  ABSTRACT_MAX,
  ABSTRACT_MIN,
  PREDEFINED_TAGS,
  MAX_TAGS,
  CATEGORIES,
  MAX_CATEGORIES,
} from '../../../data/proposals';
import Tags from '../Tags';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import {findBestMatch} from 'string-similarity';

import { faChevronRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {
  FormField,
  StepContainer,
  StepHeading,
  FormSubHeading,
  Important,
  ListItem,
  ListBolt,
  InputLabel,
  Heading5,
  Paragraph,
  Bold,
  ValidationWarning,
} from '../../GlobalStyledComponents/ReversimStyledComps';

import {Button, Modal, ModalBody, ModalFooter} from 'reactstrap';

//styled-components components
const AbstractErr = styled.span`
  ${({ theme: { color, font }, abstractErr }) => `
    color: ${abstractErr ? color.important : color.text_3};
    font: ${font.weight_bold};
  `}
`;

const AbstractList = styled.ul`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0 ${space.xl} 0;
  `}
`;

const CheckboxContianer = styled.div`
  ${({ theme: { color, space }, checked, disabled }) => `
    display: flex;
    align-items: center;
    margin-bottom: calc(4 * ${space.m});
    color: ${checked ? color.text_3 : color.step_zilla_sub_heading};
    opacity: ${disabled ? 0.5 : 1 }
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

const CheckboxLableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLableHeading = styled(Heading5)`
  ${({ theme: { font } }) => `
    margin: 0;
    color: inherit;
    font-size: ${font.size_reg};
    font-weight: ${font.weight_bold};
  `}
`;

const AbstractSubHeading = styled.p`
  ${({ theme: { space, font } }) => `
    margin-top: calc(2 * ${space.m});
    font-weight: ${font.weight_bold};
  `}
`;

const AbstractParagraph = styled(Paragraph)`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0;
    color: inherit;
  `}
`;

const AbstractModalHeading = styled(AbstractSubHeading)`
  ${({ theme: { color, space, font } }) => `
    margin: 0;
    padding: ${space.l};
    background: ${color.background_modal};
    font-size: ${font.size_bg};
    font-family: ${font.main}
  `}
`;

const AbstractModalBody = styled(ModalBody)`
  ${({ theme: { color } }) => `
    background: ${color.background_modal};
  `}
`;

const AbstractModalFooter = styled(ModalFooter)`
  ${({ theme: { color } }) => `
    background: ${color.background_modal};
    border: none;
  `}
`;

const AbstractModalButton = styled(Button)`
  ${({ theme: { color, font, space } }) =>`
    height: 40px;
    margin: 0 ${space.m} ${space.xl} ${space.m};
    padding: 0 ${space.s};
    color: ${color.text_1};

    background: right bottom linear-gradient(to right, ${color.button_bkgr_2} 50%, ${color.button_bkgr_1} 50%);  
    background-size: 205% 100%;
    border: solid 2px ${color.box_shadow_3};
    border-radius: 0;
    box-shadow: -2px 2px ${color.box_shadow_1}, -4px 4px ${color.box_shadow_3};

    font-size: ${font.size_sml};
    font-family: ${font.button};
    font-weight: ${font.weight_bold};
    text-align: center;
    text-decoration: none;

    transition: all .5s ease-out;

    &:hover{
      background-position: left bottom;
      text-decoration: none;
      color: ${color.text_1};
    }    
  `};
`;

//React components
const AbstractFieldCaption = ({abstractLen, abstractErr}) => (
  <FormSubHeading>
    Markdown syntax is supported. You can edit your proposal at any given time during the CFP
    period.
    <AbstractSubHeading>Example:</AbstractSubHeading>
    <AbstractParagraph>
      Building an effective micro-service architecture is a non-trivial task. At example.com, we
      have accumulated more than 500 different micro-services over the years, ended up with a
      micro-service spaghetti, long latency, and inevitabspanly - a broken CI/CD pipeline. Then, we
      decided to remove human factor out of the equation. In this session I will present our
      open-sourced package that analyzed our microservice architecture as a graph, measured the load
      on each server, improved server utilization by 73% and brought our CI-CD pipeline back from
      the dead.
    </AbstractParagraph>
    <AbstractSubHeading>Some helpful guidance questions:</AbstractSubHeading>
    <AbstractList>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        Why this topic is important?
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        What pain points your talk aims to address?
      </ListItem>
      <ListItem>
        <ListBolt icon={faChevronRight} />
        What actionable benefits / knowledge will attendees gain by attending your talk?
      </ListItem>
    </AbstractList>
    <AbstractErr abstractErr={abstractErr}>
      {abstractLen}/{ABSTRACT_MAX}
    </AbstractErr>{' '}
    (minimum {ABSTRACT_MIN} characters)
  </FormSubHeading>
);

const CategoryCheckbox = ({name, description, onChange, checked, disabled, onBlur}) => (
  <CheckboxContianer
    onClick={() => onChange(name)}
    checked={checked}
    disabled={disabled} 
  >
    <CheckboxInput
      type="checkbox"
      checked={checked}
      disabled={disabled}
      readOnly={true}
      onBlur={onBlur}
    />
    <CheckboxLable>
      <CheckboxLableContainer>
        <CheckboxLableHeading>{name}</CheckboxLableHeading>
        <AbstractParagraph>
          {description}
        </AbstractParagraph>
      </CheckboxLableContainer>
    </CheckboxLable>
  </CheckboxContianer>
);

class Abstract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abstractLen: props.abstract ? props.abstract.length : 0,
      abstractErr: props.abstract ? this.getAbstractErr(props.abstract) : true,
      newTagPending: null,
      validationError: {
        field: '',
        message: '',
      },
    };

    this.abstractCheckLength = this.abstractCheckLength.bind(this);
    this.onChangeAbstract = this.onChangeAbstract.bind(this);
    this.validateNewTag = this.validateNewTag.bind(this);
    this.toggleTagModal = this.toggleTagModal.bind(this);
    this.addTag = this.addTag.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  validationSchema = Joi.object({
    abstract: Joi.string().min(280).max(800).required().label('Abstract'),
    tags: Joi.array().max(3).items(Joi.string(), Joi.string(), Joi.string()).label('Tags'),
    categories: Joi.array().min(1).max(2).items(Joi.string(), Joi.string()).required().label('Categories'),
  });

  isValidated = () => {
    const { abstract, tags, categories } = this.props;

    const toValidate = {
      abstract,
      tags,
      categories,
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

    const newState = _.assign({}, this.state, validationError);

    this.setState(newState);

    return error ? false : true;
  };

  getAbstractErr = val => val.length < ABSTRACT_MIN ? 'low' : val.length > ABSTRACT_MAX ? 'high' : null;

  abstractCheckLength = e => {
    const val = e.target.value;
    const abstractLen = val.length;
    const abstractErr = this.getAbstractErr(val);
    this.setState({
      abstractLen,
      abstractErr,
    });
  };

  onChangeAbstract = e => {
    this.abstractCheckLength(e);
    this.props.setValueDebounced('abstract', e.target.value);
  };

  validateNewTag = tag => {
    const {
      allTags,
      tags,
    } = this.props;

    if (tags.includes(tag)) {
      return;
    } else if (allTags && !allTags.includes(tag) && !PREDEFINED_TAGS.includes(tag)) {
      this.setState({newTagPending: tag});
    } else {
      this.addTag(tag);
    }
  };

  toggleTagModal = () => {
    this.setState({newTagPending: null});
  };

  addTag = tag => {
    console.log('MAX_TAGS: ', MAX_TAGS);
    this.props.tags.length < MAX_TAGS
      ? this.props.setValue('tags', tag)
      : console.log('too many tags');
  };

  onCategoryChange = checkedCategory => {
    const {
      categories,
      setValue,
      removeCategory,
    } = this.props;

    const isIncluded = categories.includes(checkedCategory);

    !isIncluded && categories.length < MAX_CATEGORIES && setValue('categories', checkedCategory);

    isIncluded && removeCategory(checkedCategory);
  };

  render(){

    const {
      abstract, tags, categories,
      allTags,
      removeProposalTag,
    } = this.props;

    const {
      abstractLen,
      abstractErr,
      newTagPending,
      validationError,
    } = this.state;

    let bestMatch;
    let predefinedTags;
    let tagObjs = tags.map(t => ({id: t, text: t}));

    const tagSuggestions = uniq(without(PREDEFINED_TAGS.concat(allTags), ...tags));
    predefinedTags = without(PREDEFINED_TAGS, ...tags);

    if (newTagPending) {
      bestMatch = findBestMatch(newTagPending, tagSuggestions).bestMatch.target;
    }

    return (
      <StepContainer>
        <StepHeading>Abstract</StepHeading>
        <FormField
          id="abstract"
          multiline={true}
          value={abstract}
          placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`}
          subtitle={<AbstractFieldCaption abstractLen={abstractLen} abstractErr={abstractErr} />}
          onChange={e => this.onChangeAbstract(e)}
          onBlur={this.isValidated}
        />
        {validationError.field === "abstract" && ValidationWarning(validationError.message)}

        <Tags
          tags={tagObjs}
          suggestions={tagSuggestions}
          predefinedSuggestions={predefinedTags}
          handleAddition={this.validateNewTag}
          handleDelete={removeProposalTag}
          readOnly={tags.length === MAX_TAGS}
          onBlur={this.isValidated}
        />
        {validationError.field === "tags" && ValidationWarning(validationError.message)}

        <Modal isOpen={!!newTagPending} toggle={this.toggleTagModal}>
          <AbstractModalHeading toggle={this.toggleTagModal}>'{newTagPending}' doesn't exist</AbstractModalHeading>
          <AbstractModalBody>
            <AbstractParagraph>
              Before adding a new tag, please check if there's already an existing tag like this
              one.
            </AbstractParagraph>
            {bestMatch && (
              <AbstractParagraph>
                Did you mean <Bold>{bestMatch}</Bold>?
              </AbstractParagraph>
            )}
          </AbstractModalBody>
          <AbstractModalFooter>
            {bestMatch && (
              <AbstractModalButton
                onClick={e => {
                  e.preventDefault();
                  this.addTag(bestMatch);
                  this.setState({newTagPending: null});
                }}>
                Add <Bold>{bestMatch}</Bold>
              </AbstractModalButton>
            )}
            <AbstractModalButton
              outline
              onClick={e => {
                e.preventDefault();
                this.addTag(newTagPending);
                this.setState({newTagPending: null});
              }}>
              Add <Bold>{newTagPending}</Bold>
            </AbstractModalButton>
          </AbstractModalFooter>
        </Modal>

        <InputLabel>Categories</InputLabel>
        <FormSubHeading>
          Choose 1 or 2 categories. This information will help us assign this session to one of the
          conference's tracks.
        </FormSubHeading>

        {CATEGORIES.map(category => {
          const checked = categories.includes(category.name);
          return (
            <CategoryCheckbox
              key={category.name}
              {...category}
              onChange={this.onCategoryChange}
              checked={checked}
              disabled={!checked && categories.length === MAX_CATEGORIES}
              onBlur={this.isValidated}
            />
          );
        })}
        {validationError.field === "categories" && ValidationWarning(validationError.message)}
      </StepContainer>
    )
  }
};

export default Abstract;
