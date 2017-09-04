import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Speaker from 'components/Speaker';
import defaultSpeakerPic from 'images/default_speaker.png';
import _ from 'lodash';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Speakers = ({ speakers }) => {
  if (!speakers || speakers.length == 0) return (<span></span>);

  const speakers_elements = speakers.map((person, i) => {
    return (
      <div className={cx('col-md-4')} style={ {marginBottom: '60px'} }  key={i}>
        <Speaker
        name={person.name}
        imageUrl={person.picture || defaultSpeakerPic}
        oneLiner={person.oneLiner}
        bio={person.bio}
        linkedin={person.linkedin}
        twitter={person.twitter}
        github={person.github}
        stackOverflow={person.stackOverflow} />
      </div>
    );
  })

  return (
    <section id="speakers" className={cx('section', 'align-center')}>
      <div className={cx("container")}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-multimedia-12')}></span>
        <h3>Speakers</h3>
        <br />
        <br />
        {_.chunk(speakers_elements, 3).map((person, i) => <div key={i} className={cx("row")}>{person}</div>)}

      </div>
    </section>
  );
};

export default Speakers;
