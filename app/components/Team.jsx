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
const Team = ({ team }) => {
  if (!team || team.length == 0) return (<span></span>);

  const teamMembers = team.map((member, i) => {
    return (
      <div className={cx('col-md-4')} style={ {marginBottom: '60px'} }  key={i}>
        <Speaker
        name={member.name}
        imageUrl={member.picture || defaultSpeakerPic}
        oneLiner={member.oneLiner}
        bio={member.bio}
        linkedin={member.linkedin}
        twitter={member.twitter}
        stackOverflow={member.stackOverflow} />
      </div>
    );
  })

  return (
    <section id="speakers" className={cx('section', 'align-center')}>
      <div className={cx("container")}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-faces-users-04')}></span>
      <h3>Team</h3>
        <p className={cx("text-alt")}>Who's behind the Reversim Summit?</p>
        <br />
        <br />
        {_.chunk(teamMembers, 3).map((member, i) => <div key={i} className={cx("row")}>{member}</div>)}

      </div>
    </section>
  );
};

export default Team;
