import React from 'react';
import Section from "./Section";
import s from './Sponsors.css';
import { Button, Row, Col, Container } from 'reactstrap';
import Page from "./Page";
import { REVERSIM_SUMMIT } from '../utils';
import FormField from './FormField';

const Sponsor = ({ sponsor: { _id, name, logo, url, description, featuredJobInfo, featuredJobLink, excludeWebsite}, onEdit}) => {
  return (
    <div key={name}>
      <div className="text-center mb-4">
        <a href={url} target="_blank"><img src={logo} className={s.sponsorImg} alt={name}/></a>
        { onEdit && <Button onClick={onEdit}><i className="fa fa-pencil"/></Button>}
      </div>
      <Row noGutters={true}>
        <Col sm={{ size: 8, offset: 2}} className="separator pb-5 mb-5">
          <h4>{name}</h4>
          <p>{description} {!excludeWebsite && <span><a href={url}>{name}'s website</a>.</span>}</p>
          {featuredJobLink && <h5>Featured job</h5> }
          {featuredJobLink && <p>{featuredJobInfo} {!excludeWebsite && <span>Interested? More info <a href={featuredJobLink}>here</a>.</span>}</p> }
        </Col>
      </Row>
    </div>
  )
};

class SponsorWithEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  onEdit = () => {
    this.setState({ isEditing: true });
  }

  onSubmit = async (sponsor) => {
    await this.props.updateSponsor(this.props.sponsor._id, {...this.props.sponsor, ...sponsor});
    this.setState({ isEditing: false });
  }

  render() {
    const { isEditing } = this.state;
    const { sponsor, canEdit } = this.props;
    return isEditing ? <SponsorForm sponsor={sponsor} onSubmit={this.onSubmit}/> : <Sponsor onEdit={canEdit && this.onEdit} sponsor={sponsor} />
  }
}

const SponsorMini = ({ name, logo, url }) => (
  <Col key={name} className="mr-sm-5 mb-5" xs="12" md="auto">
    <a href={url} target="_blank"><img src={logo} className={s.sponsorImg} alt={name}/></a>
  </Col>
);

export const SponsorsSection = ({ sponsors }) => (
  <Section title="Sponsors">
    <Row className="justify-content-center">
      {sponsors.map(SponsorMini)}
      <WantToBe/>
    </Row>
  </Section>
);

const WantToBe = () => (
  <div className="my-4 p-3 bg-gray-200 line-height-17 text-center"><h4>Want to be a sponsor?</h4> Contact our amazing Gilli at <a href="mailto:gilli@reversim.com">gilli@reversim.com</a> and let's have fun together!</div>
);

function getSponsorData(e) {
  e.preventDefault();
  const formElements = e.target.elements;
  return {
    name: formElements.name.value,
    url: formElements.url.value,
    description: formElements.description.value,
    featuredJobInfo: formElements.featuredJobInfo.value,
    featuredJobLink: formElements.featuredJobLink.value,
    excludeWebsite: formElements.excludeWebsite.checked
  }
}

const Sponsors = (props) => (
  <Page title="Sponsors" {...props}>
    <h1 className="text-center mt-5">Our sponsors</h1>
    <WantToBe/>
    <Container>
      <p className="text-center mb-5">Here are the companies who made <b>{REVERSIM_SUMMIT}</b> possible:</p>
      {props.user && props.user.isReversimTeamMember && <div>
        <SponsorForm onSubmit={props.createSponsor} />
      </div>}
      {props.sponsors.map(sponsor => <SponsorWithEdit key={sponsor._id} sponsor={sponsor} canEdit={props.user && props.user.isReversimTeamMember} updateSponsor={props.updateSponsor} />)}
      <WantToBe/>
    </Container>
  </Page>
);

class SponsorForm extends React.Component {
  state = {
    imgData: this.props.sponsor ? this.props.sponsor.logo : null,
  }
  render() {
    const { sponsor = {}, onSubmit } = this.props;
    return (
      <form onSubmit={e => onSubmit({ ...getSponsorData(e), logo: this.state.imgData })}>
          <FormField id="name" required placeholder="Name" value={sponsor.name}/>
          {this.state.imgData && <img src={this.state.imgData} />}
          <input type="file" id="logo" onChange={e => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = e2 => { this.setState({ imgData: e2.target.result })};
            reader.readAsDataURL(f);
          }} />
          <FormField id="url" required placeholder="Link to website" value={sponsor.url} />
          <FormField id="description" required multiline placeholder="Description" value={sponsor.description} />
          <FormField id="featuredJobInfo" required multiline placeholder="Featured job info" value={sponsor.featuredJobInfo} />
          <FormField id="featuredJobLink" required placeholder="Link to featured job" value={sponsor.featuredJobLink} />
          <div className="d-flex">
            <input type="checkbox" id="excludeWebsite" defaultChecked={sponsor.excludeWebsite} />
          </div>
          <Button>Submit</Button>
        </form>
    )
  }
}

export default Sponsors;