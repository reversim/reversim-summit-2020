import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Speaker from '../Components/Speaker';
import someSpeaker from 'images/speakers/speaker.jpg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Speakers = () => {
  return (
    <section id="speakers" className={cx('section', 'align-center')}>
      <div className={cx("container")}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-faces-users-04')}></span>
        <h3>Speakers</h3>
        <p className={cx("text-alt")}>Meet our <span className={cx("highlight")}>speakers</span></p>
        <br />
        <br />

      <Speaker name="Lidan" imageUrl={someSpeaker} position="Developer" bio="Bla bla bla" linkedin="#" twitter="#"></Speaker>
        <Speaker name="Ori" imageUrl={someSpeaker} position="Developer" bio="Bla bla bla" linkedin="#" twitter="#"></Speaker>
        <Speaker name="Ran" imageUrl={someSpeaker} position="Developer" bio="Bla bla bla" linkedin="#" twitter="#"></Speaker>

      </div>
    </section>
  );
};

export default Speakers;
