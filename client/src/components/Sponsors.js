import React from "react";
import pick from "lodash/pick";
import s from "./Sponsors.css";
import { Button, Input, Row, Col, Container } from "reactstrap";
import Page from "./Page";
import ReactMarkdown from "react-markdown";
import { REVERSIM_SUMMIT } from "../utils";
import cn from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import premiumImage from "../images/sponsors-page-bg.png";
import diamond from "../images/SVG/diamond.svg";
import circle from "../images/SVG/circle.svg";
library.add(faPencilAlt, faTrash);

const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }
  return tempArray;
};

const PremiumSponsors = ({ sponsors, user, updateSponsor, deleteSponsor }) => {
  return (
    <div>
      <div className={"d-flex"}>
        <img src={diamond} className={s.diamond} alt="diamond" />
        <div className={cn("font-size-xxl text-white")}>
          Meet Our Premium Sponsors
        </div>
        <div className={cn(s.hr, "bg-white")} />
      </div>
      <div className={cn("d-flex flex-wrap", s.premiumSponsorsWrap)}>
        {sponsors.map(sponsor => (
          <PremiumSponsor
            key={sponsor._id}
            sponsor={sponsor}
            canEdit={user && user.isReversimTeamMember}
            // updateSponsor={updateSponsor}
            // deleteSponsor={deleteSponsor}
          />
        ))}
      </div>
    </div>
  );
};
const CommunitySponsors = ({
  sponsors,
  user,
  updateSponsor,
  deleteSponsor
}) => {
  return (
    <div className={cn("bg-white")}>
      <div className={"d-flex align-items-center"}>
        <svg className={s.circle}>
          <path d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z" />
        </svg>
        <div className={cn("font-size-xxl text-purple2")}>
          Meet Our Community Sponsors
        </div>
        <div className={cn(s.hr, "bg-purple2", s.mb10)} />
      </div>
      <div className={cn(s.sponsorWrap)}>
        {sponsors.map(sponsor => (
          <SponsorWithEdit
            key={sponsor._id}
            sponsor={sponsor}
            canEdit={user && user.isReversimTeamMember}
            updateSponsor={updateSponsor}
            deleteSponsor={deleteSponsor}
          />
        ))}
      </div>
    </div>
  );
};

const Sponsor = ({
  sponsor: {
    name = "",
    logoHover,
    url,
    description = "",
    featuredJobInfo,
    featuredJobLink,
    excludeWebsite
  },
  onEdit,
  onDelete
}) => {
  const showJob = featuredJobLink || featuredJobInfo;
  const showJobLink = featuredJobLink && !excludeWebsite;
  const descriptionWithLink = excludeWebsite
    ? description
    : `${description} [${name}'s website](${url}).`;
  const featuredJob = showJobLink
    ? `${featuredJobInfo} Interested? More info [here](${featuredJobLink}).`
    : featuredJobInfo;
  return (
    <div className={"d-flex m-4"}>
      <div className={cn("text-center b-strong border-purple2", s.sponsor)}>
        {/*<a href={url} target="_blank">*/}
        <img src={logoHover} className={s.sponsorImg} alt={name} />
        {/*</a>*/}
      </div>
      <div className={cn("border-purple2 p-2", s.communitySponsorText)}>
        <h4>
          {name}
          {onEdit && (
            <span>
              <Button
                size="sm"
                color="primary"
                className="ml-2"
                onClick={onEdit}
              >
                <FontAwesomeIcon icon="pencil-alt" />
              </Button>
              <Button
                size="sm"
                color="danger"
                className="ml-2"
                onClick={onDelete}
              >
                <FontAwesomeIcon icon="trash" />
              </Button>
            </span>
          )}
        </h4>
        <div className={s.communityText}>
          {descriptionWithLink.replace(/\n\n/g, "\n")}
        </div>
      </div>
      {/*{showJob && <h5>Featured job</h5>}*/}
      {/*{showJob && <ReactMarkdown source={featuredJob} />}*/}
    </div>
  );
};

class PremiumSponsor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isEditing: false,
      isLoading: false
    };
  }

  render() {
    // const {isEditingiting} = this.state;
    const { sponsor, canEdit } = this.props;
    return (
      <div className={cn("d-flex align-items-center", s.premiumSponsor)}>
        <div className={cn(s.sponsor, "bg-white")}>
          <img src={sponsor.logoHover} alt={sponsor.name} />
        </div>
        <Link to={`/sponsor/${sponsor.name}`} className="unstyled-link">
          <Button className={"styled-button on-purple"}>
            EXPLORE OPPORTUNITIES
          </Button>
        </Link>
      </div>
    );
  }
}

class SponsorWithEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isLoading: false
    };
  }

  onEdit = () => {
    this.setState({ isEditing: true });
  };

  onDelete = async () => {
    await this.props.deleteSponsor(this.props.sponsor._id);
  };

  onSubmit = async sponsor => {
    this.setState({ isLoading: true });
    await this.props.updateSponsor(this.props.sponsor._id, {
      ...this.props.sponsor,
      ...sponsor
    });
    this.setState({ isEditing: false, isLoading: false });
  };

  onCancel = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { isEditing } = this.state;
    const { sponsor, canEdit } = this.props;
    return isEditing ? (
      <SponsorForm
        sponsor={sponsor}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        isLoading={this.state.isLoading}
      />
    ) : (
      <Sponsor
        onEdit={canEdit && this.onEdit}
        onDelete={canEdit && this.onDelete}
        sponsor={sponsor}
      />
    );
  }
}

class SponsorMini extends React.Component {
  state = {
    hovered: false
  };
  render() {
    const { name, logo, url, logoHover } = this.props;
    return (
      <a
        href={url}
        target="_blank"
        className="sponsor-mini d-block text-center"
        style={{ width: "20%" }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <div className="p-relative d-inline-block">
          <img
            src={logo}
            className={s.sponsorImg}
            alt={name}
            style={{ opacity: this.state.hovered ? 0 : 1 }}
          />
          <img
            src={logoHover}
            className={cn(s.sponsorImg, "p-absolute")}
            alt={name}
            style={{ top: 0, left: 0, opacity: this.state.hovered ? 1 : 0 }}
          />
        </div>
      </a>
    );
  }
}

export const SponsorsSection = ({ sponsors }) => {
  let dividedSponsors = chunkArray(sponsors, 5);
  return (
    <section className="mb-20">
      <Container>
        <h1 style={{ position: "relative", zIndex: 1 }}>Sponsors</h1>
        <div
          className="bg-emph px-md-6 px-3 pt-9 pb-5"
          style={{ marginTop: -40 }}
        >
          <div>
            {dividedSponsors.map((sponsorsRow, i) => {
              return (
                <div
                  key={i}
                  className="d-flex flex-wrap justify-content-between"
                >
                  {sponsorsRow.map(s => <SponsorMini key={s._id} {...s} />)}
                </div>
              );
            })}
          </div>
          {/* <WantToBe /> */}
        </div>
      </Container>
    </section>
  );
};

const WantToBe = () => (
  <div className="my-4 p-3 line-height-17 text-center">
    <h4>Want to be a sponsor?</h4> Contact our amazing Gilli at{" "}
    <a href="mailto:gilli@reversim.com">gilli@reversim.com</a> and let's have
    fun together!
  </div>
);

class SponsorsPage extends React.Component {
  render() {
    const {
      createSponsor,
      updateSponsor,
      deleteSponsor,
      user,
      sponsors
    } = this.props;

    return (
      <Page title="Sponsors" {...this.props}>
        <div
          className={cn(s.premiumCover, "bg-purple2 page-hero pb-8")}
          style={{ backgroundImage: `url('${premiumImage}')` }}
        >
          <Container>
            {user &&
              user.isReversimTeamMember && (
                <div className="border p-3 mb-8">
                  <h3>Add sponsor</h3>
                  <SponsorForm onSubmit={createSponsor} />
                </div>
              )}
            <PremiumSponsors
              sponsors={sponsors.filter(sponsor => sponsor.isPremium)}
              user={user}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          </Container>
        </div>
        <Container className="mt-4">
          <CommunitySponsors
            sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}
            user={user}
            updateSponsor={updateSponsor}
            deleteSponsor={deleteSponsor}
          />
          {/*<h3 className="text-center">The annual Reversim conference is here</h3>*/}
          {/*<h3 className="font-weight-bold  text-center">and we can't do it without you!</h3>*/}
        </Container>
      </Page>
    );
  }
}

class SponsorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.sponsor ? { ...this.props.sponsor } : {};
  }

  getData = event => {
    if (event) event.preventDefault();
    return pick(this.state, [
      "name",
      "logo",
      "url",
      "description",
      "featuredJobInfo",
      "featuredJobLink",
      "excludeWebsite"
    ]);
  };

  render() {
    const { onSubmit, onCancel, sponsor, isLoading } = this.props;
    const _id = sponsor ? sponsor._id : "";
    return (
      <Row>
        <Col className="border-right">
          <form onSubmit={e => onSubmit(this.getData(e))}>
            <Input
              className="mb-3"
              size="sm"
              required
              placeholder="Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <Button className="p-relative mb-3" size="sm">
              <input
                type="file"
                onChange={e => {
                  const f = e.target.files[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = e2 => {
                    this.setState({ logo: e2.target.result, imgDirty: true });
                  };
                  reader.readAsDataURL(f);
                }}
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0
                }}
              />Choose logo
            </Button>
            <Input
              className="mb-3"
              size="sm"
              placeholder="Link to website"
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })}
            />
            <Input
              className="mb-3"
              size="sm"
              type="textarea"
              placeholder="Description"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
            <Input
              className="mb-3"
              size="sm"
              type="textarea"
              placeholder="Featured job info"
              value={this.state.featuredJobInfo}
              onChange={e => this.setState({ featuredJobInfo: e.target.value })}
            />
            <Input
              className="mb-3"
              size="sm"
              placeholder="Link to featured job"
              value={this.state.featuredJobLink}
              onChange={e => this.setState({ featuredJobLink: e.target.value })}
            />
            <div className="d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id={`excludeWebsite_${_id}`}
                defaultChecked={this.state.excludeWebsite}
                onChange={e =>
                  this.setState({ excludeWebsite: e.target.checked })
                }
              />
              <label htmlFor={`excludeWebsite_${_id}`} className="mb-0">
                Don't automatically add website and job links
              </label>
            </div>
            {!onCancel && (
              <Button
                className="d-block mx-auto"
                color="primary"
                style={{ width: 150 }}
                disabled={isLoading}
              >
                Submit
              </Button>
            )}
            {onCancel && (
              <div className="d-flex justify-content-around">
                <Button
                  outline
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
                <Button color="primary" disabled={isLoading}>
                  Submit
                </Button>
              </div>
            )}
          </form>
        </Col>
        <Col>
          <Sponsor sponsor={this.getData()} />
        </Col>
      </Row>
    );
  }
}

export default SponsorsPage;
