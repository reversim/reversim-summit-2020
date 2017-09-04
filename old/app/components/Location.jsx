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
					<div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }} onClick={onOverlayClick}></div>
          <LocationMap />

    			<div className={cx('container', 'contacts-on-map-container')}>
    				<div className={cx("contacts-on-map")}>
    					<h3>Location</h3>

    					<ul className={cx("list")}>
    						<li><i className={cx('fa', 'fa-map-marker')}></i>College of Management,
                <br />
                <span style={{marginLeft: '51px'}}>2 Elie Wiesel st., Rishon LeTsiyon</span>
                </li>
                {
                  /*<li><i className={cx('fa', 'fa-envelope')}></i>Public Transport</li>*/
                  /*<li><i className={cx('fa', 'fa-clock-o')}></i>Parking</li>*/
                }
                <li><i className={cx('fa', 'fa-info')}></i>More info will be published soon</li>
    					</ul>
    				</div>
    			</div>
    		</div>
    	</section>
  );
};

function onOverlayClick(e) {
	e.target.style.pointerEvents = 'none';
}

export default Location;
