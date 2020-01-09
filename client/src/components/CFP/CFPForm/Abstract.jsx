import React, {Component} from 'react';
import styled from 'styled-components';
import {
  ABSTRACT_MAX,
  ABSTRACT_MIN,
  PREDEFINED_TAGS,
  CATEGORIES,
  MAX_CATEGORIES,
} from '../../../data/proposals';
import Tags, {MAX_TAGS} from '../Tags';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import {findBestMatch} from 'string-similarity';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
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

const OtherInput = styled.input`
  ${({ theme: { color, space, font } }) => `
    width: 100%;
    height: calc(2 * ${font.size_reg});
    padding: ${space.s} ${space.m};
    margin-left: ${space.m};

    font-size: ${font.size_reg};
    font-weight: 300;
    line-height: 1.5;
    
    color: ${color.input_1};
    border-radius: 3px;
    border-radius: 0.25rem;
    border: 2px solid ${color.input_border_1};
    
    box-shadow: inset 0 1px 1px ${color.input_box_shadow_1};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover{
      cursor: pointer;
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
  ${({ theme: { color, space } }) => `
    margin: 0;
    padding: ${space.l};
    background: ${color.background_modal};
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
    ${({theme: { color, font, space, }}) => `
    box-shadow: inset 0px 0px 10px 2px ${color.font_awsome_box_shadow_3};
    background: ${color.background_linear_gradient_1};
    font-family: ${font.form_button};
    font-size: ${font.size_reg};
    font-weight: ${font.weight_medium};
    color: ${color.text_1};
    letter-spacing: 1px;
    outline: none;
    border: 0;
    border-radius: 3px;
    transition: all 200ms;
    height: 40px;

    position: relative;

    margin: ${space.l} 0;
    padding: calc(0.25 * ${font.size_reg}) calc(0.5 * ${font.size_reg});
    line-height: 1.5;

    display: inline-block;
    text-transform: none;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    overflow: visible;

    &:hover{
      background: ${color.background_linear_gradient_2};
      box-shadow: inset 0px 0px 10px 2px ${color.form_button_box_shadow_1}, 0px 0px 10px 0px ${color.form_button_box_shadow_2};
      color: ${color.text_1};
      border-color: ${color.form_button_border_hover};
      text-decoration: none;
    }

    &:active{
      background: ${color.background_linear_gradient_2};
    }
  `}
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

const CategoryCheckbox = ({name, description, onChange, checked, disabled}) => (
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

const CategoryOther = ({onChange, onChangeInput, checked, disabled}) => (
  <CheckboxContianer>
    <CheckboxInput
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <CheckboxLable>
      <CheckboxLableHeading>Other: </CheckboxLableHeading>
      <OtherInput
        disabled={disabled}
        placeholder="lockpicking, moonwalking, etc."
        onChange={onChangeInput}
      />
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
    };

    this.abstractCheckLength = this.abstractCheckLength.bind(this);
    this.onChangeAbstract = this.onChangeAbstract.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.toggleTagModal = this.toggleTagModal.bind(this);
    this.addTag = this.addTag.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCategoryInputChange = this.onCategoryInputChange.bind(this);
  }

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
    this.props.setValue('proposal', 'abstract', e.target.value);
  };

  onAddTag = tag => {
    const {allTags, tags} = this.props;
    // NOTE: allTags is defined by the server
    // NOTE: tags is CFPForm.state.propsal.tag: [];

    if (tags.indexOf(tag) > -1) {
      return;
    } else if (allTags && allTags.indexOf(tag) === -1 && PREDEFINED_TAGS.indexOf(tag) === -1) {
      this.setState({newTagPending: tag});
    } else {
      this.addTag(tag);
    }
  };

  toggleTagModal = () => {
    this.setState({newTagPending: null});
  };

  addTag = tag => {
    this.props.setProposalTag(tag);
  };

  onCategoryChange = name => {
    if (!name) return;

    this.props.update(state => {
      //the below will be set to this.state because .update evaluates to state => this.setState(state)

      if (CATEGORIES.find(cat => cat.name === name)) {
        // if name is in CATEGORIES (a predefined array)

        if (state.categories.includes(name)) {
          // if name is in state.categories (stated is the parameter passed not this.state)

          return {categories: without(state.categories, name)};
          // return an object similar to state.categories without name
          // this will be the value passed to this.props.update

        } else {
          return {categories: uniq(state.categories.concat(name)), missingCategories: false};
          // return an object with categories similar to state.categories with name and without duplicates and missingCategories: false
          // this will be the value passed to this.props.update
        }

      } else {
        // name is not predefined
        const otherCategory = this.getOtherCategoryInState(state.categories);
        if (otherCategory) {
          if (otherCategory !== name) {
            return {categories: without(state.categories, otherCategory).concat(name)};
            // return an array similar to state.categories without otherCategory and concat name to the array

          } else {
            return {categories: without(state.categories, otherCategory)};
            // return an array similar to state.categories without otherCategory
          }

        } else {
          return {categories: uniq(state.categories.concat(name)), missingCategories: false};
          // return an object with categories similar to state.categories and with name added to them but without duplicates. 
          // In that object, missingCategories is false
        }
      }
    });
  };

  getOtherCategoryInState = categories => {
    return categories.find(cat => !CATEGORIES.find(cat2 => cat2.name === cat));
    // !CATEGORIES.find(cat2 => cat2.name === cat) returns false if any cat2 has cat2.name === cat
    // and then the function will return undefined
  };

  onCategoryInputChange = e => {
    const value = e.target.value;
    this.setState({otherCategory: value}, () => {
      this.props.update(state => {
        let newCategories = state.categories;
        const otherCategory = this.getOtherCategoryInState(newCategories);
        if (otherCategory !== null) {
          newCategories = without(newCategories, otherCategory);
        }
        if (value) {
          newCategories = newCategories.concat(value);
        }
        return {categories: newCategories};
      });
    });
  };

  render(){

    const {
      categories,
      tags,
      abstract,
      allTags,
      removeProposalTag,
    } = this.props;

    const {
      abstractLen,
      abstractErr,
      newTagPending,
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
          required={true}
          multiline={true}
          value={abstract}
          placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`}
          subtitle={<AbstractFieldCaption abstractLen={abstractLen} abstractErr={abstractErr} />}
          onChange={e => this.onChangeAbstract(e)}
        />
        <Tags
          tags={tagObjs}
          suggestions={tagSuggestions}
          predefinedSuggestions={predefinedTags}
          handleAddition={this.onAddTag}
          handleDelete={removeProposalTag}
          readOnly={tags.length === MAX_TAGS}
        />

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
        <input required={true} type="hidden" id="categories_hidden" />
        <Important hidden={!this.props.missingCategories}>*choose at least one category</Important>
        {CATEGORIES.map(category => {
          //NOTE: CATEGORIES comes from /client/src/data/proposals.js
          const checked = categories.includes(category.name);
          return (
            <CategoryCheckbox
              key={category.name}
              {...category}
              onChange={this.onCategoryChange}
              checked={checked}
              disabled={!checked && categories.length === MAX_CATEGORIES}
            />
          );
        })}
        <CategoryOther
          checked={!!this.getOtherCategoryInState(categories)}
          onChange={() => this.onCategoryChange(this.state.otherCategory)}
          onChangeInput={this.onCategoryInputChange}
          disabled={
            !this.getOtherCategoryInState(categories) && categories.length === MAX_CATEGORIES
          }
        />
      </StepContainer>

    )
  }
};

export default Abstract;
