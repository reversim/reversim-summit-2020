import React, {useEffect} from "react";
import Page from "./Page";
import { Container } from "reactstrap";
import s from "./Agenda.css";
import agendaBg from "../images/agenda-page-bg.png";
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
      <div
        className="navbar-margin bg-purple2 pb-4 pt-20"
        style={{
          backgroundImage: `url('${agendaBg}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '80% 30px',
        }}>
        <Container>
          <div className="d-flex">
            <img src={diamond} alt="diamond" className={s.diamond} />
            <div className="mb-4 text-white font-size-xxl">Agenda</div>
          </div>
        </Container>
      </div>
      <Container>
        <div
          className="d-flex align-items-center text-purple2"
          style={{padding: '80px 0 60px'}}
          name="bizzabo-web-agenda"
          data-unique-name="245217"
          data-events-url="https://events.bizzabo.com"></div>
      </Container>
    </Page>
  );
}

export default AgendaPage;
