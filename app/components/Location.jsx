import React from 'react';
import LocationMap from 'components/LocationMap';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Location = () => {
  return (
    <section id="location">
    		<div className={cx("contacts-wrapper")}>
          <LocationMap />

    			<div className={cx('container', 'contacts-on-map-container')}>
    				<div className={cx("contacts-on-map")}>
    					<h3>Location</h3>

    					<ul className={cx("list")}>
    						<li><i className={cx('fa', 'fa-map-marker')}></i>Weizmann Institute of Science, <br /><span style={{marginLeft: '51px'}} />Herzl St. 234, Rehovot
                <br />
                </li>
                <li><i className={cx('fa', 'fa-phone')}></i>(08) 934-2111</li>
                <li><i className={cx('fa', 'fa-envelope')}></i>Public Transport</li>
                <li><i className={cx('fa', 'fa-clock-o')}></i>Parking</li>
    					</ul>
    				</div>
    			</div>
    		</div>
    	</section>
  );
};

export default Location;
