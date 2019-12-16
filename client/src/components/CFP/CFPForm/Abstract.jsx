import React, {Fragment, Component} from 'react';
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

import cn from "classnames";
import {categories} from '../../Categories.css';
import {Button, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const AbstractFieldCaption = ({abstractLen, abstractErr}) => (
  <span>
    Markdown syntax is supported. You can edit your proposal at any given time during the CFP
    period.<br />
    <br />
    <b>Example:</b>
    <br />Building an effective micro-service architecture is a non-trivial task. At example.com, we
    have accumulated more than 500 different micro-services over the years, ended up with a
    micro-service spaghetti, long latency, and inevitably - a broken CI/CD pipeline. Then, we
    decided to remove human factor out of the equation. In this session I will present our
    open-sourced package that analyzed our microservice architecture as a graph, measured the load
    on each server, improved server utilization by 73% and brought our CI-CD pipeline back from the
    dead.<br />
    <br />
    <br />
    Some helpful guidance questions:
    <ul>
      <li>
        Why this topic is important?
      </li>
      <li>
        What pain points your talk aims to address?
      </li>
      <li>
        What actionable benefits / knowledge will attendees gain by attending your talk?
      </li>
    </ul>
    <br />
    <span className={cn({'text-red': abstractErr}, 'font-weight-bold')}>
      {abstractLen}/{ABSTRACT_MAX}
    </span>{' '}
    (minimum {ABSTRACT_MIN} characters)
  </span>
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
  }

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

  getOtherCategoryInState = categories => {
    return categories.find(cat => !CATEGORIES.find(cat2 => cat2.name === cat));
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
          <ModalHeader toggle={this.toggleTagModal}>'{newTagPending}' doesn't exist</ModalHeader>
          <ModalBody>
            <p>
              Before adding a new tag, please check if there's already an existing tag like this
              one.
            </p>
            {bestMatch && (
              <p>
                Did you mean <b>{bestMatch}</b>?
              </p>
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

        <label>Categories</label>
        <small className="d-block mb-2">
          Choose 1 or 2 categories. This information will help us assign this session to one of the
          conference's tracks.
        </small>
        <input required={true} type="hidden" id="categories_hidden" />
        <div hidden={!this.props.missingCategories} className={'text-red mb-2'}>*choose at least one category</div>
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
