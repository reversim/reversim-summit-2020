import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';
import {img} from './Speaker2.css';
import hoop from '../images/SVG/hoop.svg';
import x from '../images/SVG/x.svg';

const COLLAPSED_BIO_MAX_CHARS = 80;

class TeamMember extends React.Component {
  constructor(props) {
    super(props);
    const {bio} = this.props;
    const isTooLong = bio.length > COLLAPSED_BIO_MAX_CHARS;
    this.state = {
      isExpanded: false,
      isTooLong,
    };
  }

  toggle = () => {
    this.setState(({isExpanded}) => ({isExpanded: !isExpanded }));
  };

  render() {
    const {picture, name, oneLiner, bio} = this.props;
    const {isExpanded, isTooLong} = this.state;
    const textStyle = (isExpanded && isTooLong)
        ? {zIndex: 1, height: 'auto', minHeight: 240}
        : {height: 240};

    return (
      <div className="about__team-member mb-12 d-flex">
        <div style={{backgroundImage: `url('${picture}')`}} alt={name} className={img} />
        <div className="flex-grow-1 line-height-12">
          <div
            className={`p-4 bg-white b-strong p-relative overflow-hidden ${!isExpanded ? "text-fade" : ""}`}
            onClick={this.toggle}
            style={textStyle}>
            <div ref={this.ref}>
              <h4 className="line-height-1 mb-1">{name}</h4>
              <p className="font-weight-regular line-height-12 font-size-md">{oneLiner}</p>
              <p className="line-height-15 mb-0">
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const AboutPage = props => {
  return (
    <Page title="About" {...props}>
      <div  className="navbar-padding pb-15 bg-purple2 text-white font-size-lm x-bg"
            style={{backgroundImage: `url('${x}')`}}>
        <Container>
          <div className="d-flex align-items-center pt-15 ">
            <img src={hoop} alt="" height="100" style={{marginRight: -16}} />
            <h3 className="font-size-xxl mr-4 font-weight-regular">About</h3>
            <div className="flex-grow-1 border-bottom border-white" />
          </div>
          <div className="d-flex font-weight-regular about__intro-text">
            <div className="pt-10 mr-9 flex-1">
              <p className="line-height-15 font-size-lg">Reversim Summit</p>
              <p className="line-height-15">
                Reversim summit is our intention to create a conference for developers by
                developers. Like in the podcast, we bring you the content we are interested in, and
                we hope you will be too.
              </p>
              <p className="line-height-15">
                This is the 7th(!) Reversim Summit. The summits of 2013 and 2014 (TLV Campus), 2015
                (Technion), 2016 (Weizmann Institute of Science), 2017 (College of Management) and
                2018 (Tel Aviv University) also featured community content. Watch previous years'
                sessions to get the general feel of the Revesim Summit spirit.
              </p>
            </div>
            <div
              className="pt-10 mr-12 flex-1">
              <p className="mb-3 font-size-lg">Reversim podcast</p>
              <p className="line-height-15">
                Reversim (רברס עם פלטפורמה) is a Hebrew podcast by Ori Lahav and Ran Tavory which
                brings together software developers and product, with over 300 recorded episodes and
                a few thousands listeners.
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container style={{marginTop: 80}}>
        <div className="d-flex align-items-center text-purple2" style={{marginBottom: 80}}>
          <h3 className="font-size-xxl mr-4 font-weight-regular">Meet the team</h3>
          <div className="flex-grow-1 border-bottom border-purple2" />
        </div>
        <div className="about__team">
          {props.team.map(id => (
              <TeamMember {...props.users[id]} />
          ))}
        </div>
      </Container>
    </Page>
  );
};

export default AboutPage;

/**
 * style={{background: `url('${x}') no-repeat`, backgroundSize: 'cover'}}
 **/