import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import FormField, {SPACING} from '../../FormField';
import {
  ABSTRACT_MAX,
  ABSTRACT_MIN,
  PREDEFINED_TAGS,
  PROPOSAL_TYPES_ARR,
  CATEGORIES,
  MAX_CATEGORIES,
} from '../../../data/proposals';
import Tags, {MAX_TAGS} from '../../Tags';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import {findBestMatch} from 'string-similarity';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  FormSubHeading,
  Important,
  ListItem,
  ListBolt,
  InputLabel,
  Heading5,
  Paragraph,
} from '../../GlobalStyledComponents/ReversimStyledComps';
import cn from "classnames";
import {categories} from '../../Categories.css';
import {Button, Input, Modal, ModalBody, ModalFooter} from 'reactstrap';

//styled-components components
const AbstractSubHeading = styled(Heading5)`
  ${({ theme: { font, space } }) => `
    margin-top: calc(2 * ${space.m});
    color: inherit;
    font-weight: ${font.weight_bold};
  `}
`;

const AbstractParagraph = styled(Paragraph)`
  ${({ theme: { space } }) => `
    margin: ${space.m} 0;
    color: inherit;
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
      micro-service spaghetti, long latency, and inevitably - a broken CI/CD pipeline. Then, we
      decided to remove human factor out of the equation. In this session I will present our
      open-sourced package that analyzed our microservice architecture as a graph, measured the load
      on each server, improved server utilization by 73% and brought our CI-CD pipeline back from
      the dead.
    </AbstractParagraph>
    <AbstractSubHeading>Some helpful guidance questions:</AbstractSubHeading>
    <ul>
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
    </ul>
    <br />
    <span className={cn({'text-red': abstractErr}, 'font-weight-bold')}>
      {abstractLen}/{ABSTRACT_MAX}
    </span>{' '}
    (minimum {ABSTRACT_MIN} characters)

  </FormSubHeading>
);

const CategoryCheckbox = ({name, description, onChange, checked, disabled}) => (
  <div onClick={() => onChange(name)} className={cn({'text-primary': checked}, 'd-flex align-items-center mb-4', {'opacity-05': !disabled})}>
    <input
      className="mr-3"
      type="checkbox"
      checked={checked}
      disabled={disabled}
      readOnly={true}
    />
    <label className={cn({'text-primary': checked},'align-items-center d-flex', categories)}>
      <div className={'d-flex flex-column'}>
        <h5 className="mb-0">{name}</h5>
        <small className={cn({'text-primary': checked})}>
          {description}
        </small>
      </div>
    </label>
  </div>
);

const CategoryOther = ({onChange, onChangeInput, checked, disabled}) => (
  <div className={cn({'text-primary': checked}, 'd-flex align-items-center mb-4', {'opacity-05': disabled})}>
    <input
      className="mr-3"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <label className={cn({'text-primary': checked},'align-items-center d-flex', categories)}>
      <h5 className="mb-0 mr-1">Other: </h5>
      <Input
        bsSize="sm"
        disabled={disabled}
        placeholder="lockpicking, moonwalking, etc."
        onChange={onChangeInput}
      />
    </label>
  </div>
);

class Abstract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abstractLen: props.abstract ? props.abstract.length : 0,
      abstractErr: props.abstract ? this.getAbstractErr(props.abstract) : true,
      newTagPending: null,
    };
    
    this.onChangeAbstract = this.onChangeAbstract.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.onDeleteTag = this.onDeleteTag.bind(this);
    this.toggleTagModal = this.toggleTagModal.bind(this);
    this.addTag = this.addTag.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCategoryInputChange = this.onCategoryInputChange.bind(this);
  }

  onChangeAbstract = e => {
    const val = e.target.value;
    const abstractLen = val.length;
    const abstractErr = this.getAbstractErr(val);
    this.setState({
      abstractLen,
      abstractErr,
    });
  };

  getAbstractErr = val => val.length < ABSTRACT_MIN ? 'low' : val.length > ABSTRACT_MAX ? 'high' : null;

  onAddTag = tag => {
    const {allTags, tags} = this.props;
    if (tags.indexOf(tag) > -1) {
      return;
    } else if (allTags && allTags.indexOf(tag) === -1 && PREDEFINED_TAGS.indexOf(tag) === -1) {
      this.setState({newTagPending: tag});
    } else {
      this.addTag(tag);
    }
  };

  onDeleteTag = i => {
    const tags = [...this.props.tags.slice(0, i), ...this.props.tags.slice(i + 1)];
    this.props.update({tags: tags});
  };

  toggleTagModal = () => {
    this.setState({newTagPending: null});
  };

  addTag = tag => {
    const tags = this.props.tags.concat(tag);
    this.props.update({tags: tags});
  };

  onCategoryChange = name => {
    if (!name) return;
    this.props.update(state => {
      if (CATEGORIES.find(cat => cat.name === name)) {
        // if it's a predefined category
        if (state.categories.includes(name)) {
          return {categories: without(state.categories, name)};
        } else {
          return {categories: uniq(state.categories.concat(name)), missingCategories: false};
        }
      } else {
        // it's not predefined
        const otherCategory = this.getOtherCategoryInState(state.categories);
        if (otherCategory) {
          if (otherCategory !== name) {
            return {categories: without(state.categories, otherCategory).concat(name)};
          } else {
            return {categories: without(state.categories, otherCategory)};
          }
        } else {
          return {categories: uniq(state.categories.concat(name)), missingCategories: false};
        }
      }
    });
  };

  getOtherCategoryInState = categories => {
    return categories.find(cat => !CATEGORIES.find(cat2 => cat2.name === cat));
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
    } = this.props;
    
    const {
      abstractLen,
      abstractErr,
      newTagPending,
    } = this.state;
    
    let bestMatch,
    predefinedTags,
    tagObjs = tags.map(t => ({id: t, text: t}));

    const tagSuggestions = uniq(without(PREDEFINED_TAGS.concat(allTags), ...tags));
    predefinedTags = without(PREDEFINED_TAGS, ...tags);

    if (newTagPending) {
      bestMatch = findBestMatch(newTagPending, tagSuggestions).bestMatch.target;
    }

    return (
      <Fragment>
        <FormField
          id="abstract"
          label="Abstract"
          required={true}
          multiline={true}
          value={abstract}
          placeholder={`Between ${ABSTRACT_MIN}-${ABSTRACT_MAX} characters (the length of 2-5 tweets)`}
          subtitle={<AbstractFieldCaption abstractLen={abstractLen} abstractErr={abstractErr} />}
          onChange={this.onChangeAbstract}
          className={SPACING}
        />
        <Tags
          tags={tagObjs}
          suggestions={tagSuggestions}
          predefinedSuggestions={predefinedTags}
          handleAddition={this.onAddTag}
          handleDelete={this.onDeleteTag}
          readOnly={tags.length === MAX_TAGS}
          className={SPACING}
        />

        <Modal isOpen={!!newTagPending} toggle={this.toggleTagModal}>
          <AbstractSubHeading toggle={this.toggleTagModal}>'{newTagPending}' doesn't exist</AbstractSubHeading>
          <ModalBody>
            <AbstractParagraph>
              Before adding a new tag, please check if there's already an existing tag like this
              one.
            </AbstractParagraph>
            {bestMatch && (
              <AbstractParagraph>
                Did you mean <b>{bestMatch}</b>?
              </AbstractParagraph>
            )}
          </ModalBody>
          <ModalFooter>
            {bestMatch && (
              <Button
                size="sm"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  this.addTag(bestMatch);
                  this.setState({newTagPending: null});
                }}>
                Add <b>{bestMatch}</b>
              </Button>
            )}
            <Button
              outline
              color="primary"
              size="sm"
              onClick={e => {
                e.preventDefault();
                this.addTag(newTagPending);
                this.setState({newTagPending: null});
              }}>
              Add <b>{newTagPending}</b>
            </Button>
          </ModalFooter>
        </Modal>

        <InputLabel>Categories</InputLabel>
        <FormSubHeading>
          Choose 1 or 2 categories. This information will help us assign this session to one of the
          conference's tracks.
        </FormSubHeading>
        <input required={true} type="hidden" id="categories_hidden" />
        <Important hidden={!this.props.missingCategories}>*choose at least one category</Important>
        {CATEGORIES.map(category => {
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
      </Fragment>

    )
  }
};

export default Abstract;
