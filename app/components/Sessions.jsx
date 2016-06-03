import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import Proposal from 'components/Proposal';

import photo from 'images/speakers/speaker.jpg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Sessions = () => {
  return (
    <section id="sessions" className={cx('section', 'align-center')} style={ {paddingTop: '25px'} }>
      <div className={cx("container")}>
        <span data-icon className={cx('icon', 'section-icon', 'icon-badges-votes-08')}></span>
        <h3>Proposals</h3>
        <p className={cx("text-alt")} style={ {marginBottom: '80px'} }>featured <span className={cx("highlight")}>proposals</span></p>

        <div className={cx("row")}>

          <Proposal
          id="123"
          name="some lecture"
          description="Illo repellat dolores laudantium quos, velit, reprehenderit veniam accusamus neque laboriosam tenetur aut quaerat, doloribus autem, facere molestiae? Quisquam ducimus, nesciunt mollitia."
          speakerName="Lidan"
          speakerPosition="Developer"
          speakerPhoto={photo}
          />

          <Proposal
          id="123"
          name="some lecture"
          description="Illo repellat dolores laudantium quos, velit, reprehenderit veniam accusamus neque laboriosam tenetur aut quaerat, doloribus autem, facere molestiae? Quisquam ducimus, nesciunt mollitia."
          speakerName="Ori"
          speakerPosition="Developer"
          speakerPhoto={photo}
          />

          <Proposal
          id="123"
          name="some lecture"
          description="Illo repellat dolores laudantium quos, velit, reprehenderit veniam accusamus neque laboriosam tenetur aut quaerat, doloribus autem, facere molestiae? Quisquam ducimus, nesciunt mollitia."
          speakerName="Ran"
          speakerPosition="Developer"
          speakerPhoto={photo}
          />

        </div>
      </div>
    </section>
  );
};

export default Sessions;
