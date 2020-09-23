import React, {useEffect} from 'react';
import Page from './Page';
import {Container} from 'reactstrap';

const SpeakersPage = props => {
  useEffect(() => {
    var e = document.createElement('script');
    window.bz_widget_env = 'https://events.bizzabo.com';
    e.type = 'text/javascript';
    e.async = !0;
    e.src = 'https://organizer.bizzabo.com/widgets/sections/sections.js';
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(e, t);
  }, []);

  return (
    <Page title="Speakers" {...props}>
      <div className="white-bg">
        <Container>
          <div
            className="bizzabo-sections-widget d-flex align-items-center text-purple2"
            style={{padding: '80px 0 60px'}}
            data-unique-name="245217"
            data-events-url="https://events.bizzabo.com"
            data-tab-id="1608390"></div>
        </Container>
      </div>
    </Page>
  );
};

export default SpeakersPage;

/**
 * style={{background: `url('${x}') no-repeat`, backgroundSize: 'cover'}}
 **/
