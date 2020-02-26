import React from "react";
import Page from "./Page";
import { Container, Row, Col } from "reactstrap";
import { img } from "./Speaker2.css";
import hoop from "../images/SVG/hoop.svg";
import x from "../images/SVG/x.svg";
import { image } from "../images";
import ReadMore from "./ReadMore";
import { getHref } from "../utils";
import { Link } from "react-router-dom";
import SpeakerSocialLinks from "./MyProfile/SpeakerSocialLinks";
// import SpeakersPage from "./SpeakersPage";

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggle = () => {
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
  };

  render() {
    const { picture, name, oneLiner, bio, speaker, id, isSmallScreen } = this.props;
    const { isExpanded } = this.state;
    let textStyle = isExpanded
      ? { zIndex: 1, height: "auto", minHeight: 240 }
      : { height: 240 };
    let textContainerStyle = isExpanded
      ? { minHeight: 280 }
      : { height: 280 };

    // textStyle = { zIndex: 10, height: "auto", minHeight: 240 }

    return (
      <div className="about__team-member mb-12 d-flex mobile-flex-column">
        <div className="d-flex flex-column">
          <Link
            key={id}
            to={`/speaker/${getHref(speaker)}`}
            className="unstyled-link"
          >
            <div
              className="b-strong speakers__speaker-picture"
              style={{ backgroundImage: `url(${image(picture, 240, 240)})`}}
            />
          </Link>
          <div className="d-flex flex-column bg-purple2 text-white p-2" style={{width:240, minHeight:40}}>
            <SpeakerSocialLinks {...speaker} className="ml-0" iconClassName="text-white"/>
          </div>
        </div>
        <div className="flex-grow-1 line-height-12 b-strong" style={textContainerStyle}>
          <div
            className="p-4 bg-white p-relative"
            // onClick={this.toggle}
            style={textStyle}
          >
            <div ref={this.ref}>
              <Link
                key={id}
                to={`/speaker/${getHref(speaker)}`}
                className="unstyled-link"
              >
                <h4 className="line-height-1 mb-1">{name}</h4>
              </Link>
              <p className="font-weight-regular line-height-12 font-size-md mb-0">
                {oneLiner}
              </p>
              <div className="line-height-15 mb-0">
                <ReadMore
                  lines={7 - Math.ceil(oneLiner.length / 29)}
                  truncateText="…"
                  more="Read more"
                  less="Show less"
                  children={bio}
                  onToggle={this.toggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SpeakersPage = props => {
  return (
    <Page title="About" {...props}>
      <div
        className="navbar-margin pb-15 bg-purple2 text-white font-size-lm x-bg"
        style={{ backgroundImage: `url('${x}')` }}
      >
        <Container>
          {/*<div className="d-flex align-items-center pt-15 ">*/}
          {/*  <img src={hoop} alt="" height="100" style={{ marginRight: -16 }} />*/}
          {/*  <h3 className="font-size-xxl mr-4 font-weight-regular">Meet the speakers</h3>*/}
          {/*  <div className="flex-grow-1 border-bottom border-white" />*/}
          {/*</div>*/}
        </Container>
      </div>
      <div className="white-bg">
        <Container>
          <div
            className="d-flex align-items-center text-purple2"
            style={{ padding: "80px 0 60px" }}
          >
            <h3 className="font-size-xxl mr-4 font-weight-regular">
              Meet the speakers
            </h3>
            <div className="flex-grow-1 border-bottom border-purple2" />
          </div>
          <div className="about__team">
            {props.shuffledAcceptedSpeakers.map(id => (
              <Speaker
                key={id}
                {...props.users[id]}
                speaker={props.users[id]}
                {...props}
              />
            ))}
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default SpeakersPage;

/**
 * style={{background: `url('${x}') no-repeat`, backgroundSize: 'cover'}}
 **/
