import React, {useEffect} from "react";
import Page from "./Page";
import { Container } from "reactstrap";
import diamond from "../images/SVG/diamond.svg";

const AgendaPage = props => {
  useEffect(() => {
    var bz = document.createElement('script');
    bz.type = 'text/javascript';
    bz.async = true;
    bz.src = 'https://organizer.bizzabo.com/widgets/agenda/agenda.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(bz, s);
  }, []);

  return (
    <Page title="Agenda" {...props}>
      <div className="white-bg" style={{ paddingTop: '40px' }}>
        <Container>
          <div
            className="d-flex align-items-center text-purple2"
            style={{padding: '80px 0 60px'}}
            name="bizzabo-web-agenda"
            data-unique-name="245217"
            data-events-url="https://events.bizzabo.com"></div>
        </Container>
      </div>
    </Page>
  );
}

export default AgendaPage;
