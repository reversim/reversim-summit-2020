import React, {Fragment} from 'react';
import without from 'lodash/without';
import uniq from 'lodash/uniq';
import halls from '../data/halls';
import {getSessionTypeShortStr, getTagStr} from '../utils';

function withFilters(WrappedComp, type) {
  const hallsKey = `excluded-halls-${type}`;
  const daysKey = `excluded-days-${type}`;
  const sessionTypesKey = `excluded-sessiontypes-${type}`;
  const tagsKey = `excluded-tags-${type}`;

  const Filter = ({val, list, onChange, getText, filterType}) => (
    <Fragment>
      <input
        type="checkbox"
        id={`filter-${filterType}-${type}-${val}`}
        checked={!list.includes(val)}
        onChange={e => onChange(val, e.target.checked)}
      />
      <label htmlFor={`filter-${filterType}-${type}-${val}`}>{getText(val)}</label>
    </Fragment>
  );

  const HallFilter = ({index, onChange, excludedHalls}) => (
    <Filter
      val={index}
      onChange={onChange}
      list={excludedHalls}
      filterType="hall"
      getText={index => halls[index]}
    />
  );

  const DayFilter = ({index, onChange, excludedDays}) => (
    <Filter
      val={index}
      onChange={onChange}
      list={excludedDays}
      filterType="day"
      getText={index => `Day ${index + 1}`}
    />
  );

  const SessionTypeFilter = ({sessionType, onChange, excludedSessionTypes}) => (
    <Filter
      val={sessionType}
      onChange={onChange}
      list={excludedSessionTypes}
      filterType="sessiontype"
      getText={getSessionTypeShortStr}
    />
  );

  const TagFilter = ({tag, onChange, excludedTags}) => (
    <Filter
      val={tag}
      onChange={onChange}
      list={excludedTags}
      filterType="tag"
      getText={getTagStr}
    />
  );

  const Comp = class extends React.Component {
    state = {
      excludedHalls: [],
      excludedDays: [],
      excludedSessionTypes: [],
      excludedTags: [],
    };

    setExcludedHall = (index, isIncluded) => {
      this.setExcluded('excludedHalls', hallsKey, index, isIncluded);
    };

    setExcludedDay = (index, isIncluded) => {
      this.setExcluded('excludedDays', daysKey, index, isIncluded);
    };

    setExcludedSessionTypes = (sessionType, isIncluded) => {
      this.setExcluded('excludedSessionTypes', sessionTypesKey, sessionType, isIncluded);
      if (sessionType === 'full') {
        this.setExcluded('excludedSessionTypes', sessionTypesKey, 'keynote', isIncluded);
      }
    };

    setExcludedTags = (tag, isIncluded) => {
      this.setExcluded('excludedTags', tagsKey, tag, isIncluded);
    };

    setExcluded = (prop, localStorageKey, val, isIncluded) => {
      this.setState(state => {
        const newVal = isIncluded ? without(state[prop], val) : uniq(state[prop].concat(val));

        localStorage.setItem(localStorageKey, JSON.stringify(newVal));
        return {[prop]: newVal};
      });
    };

    componentDidMount() {
      let excludedHalls;
      try {
        excludedHalls = JSON.parse(localStorage.getItem(hallsKey));
      } catch (ex) {}

      let excludedDays;
      try {
        excludedDays = JSON.parse(localStorage.getItem(daysKey));
      } catch (ex) {}

      if (excludedHalls || excludedDays) {
        const newState = {};
        excludedHalls && (newState.excludedHalls = excludedHalls);
        excludedDays && (newState.excludedDays = excludedDays);
        this.setState(newState);
      }
    }

    render() {
      return (
        <WrappedComp
          {...this.props}
          excludedDays={this.state.excludedDays}
          excludedHalls={this.state.excludedHalls}
          excludedSessionTypes={this.state.excludedSessionTypes}
          excludedTags={this.state.excludedTags}
          setExcludedDay={this.setExcludedDay}
          setExcludedHall={this.setExcludedHall}
          setExcludedSessionTypes={this.setExcludedSessionTypes}
          setExcludedTags={this.setExcludedTags}>
          {this.props.children}
        </WrappedComp>
      );
    }
  };

  return {
    Comp,
    DayFilter,
    HallFilter,
    SessionTypeFilter,
    TagFilter,
  };
}

export default withFilters;
