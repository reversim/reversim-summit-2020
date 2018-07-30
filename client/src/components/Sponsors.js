import React from 'react';
import pick from 'lodash/pick';
import s from './Sponsors.css';
import {Button, Input, Row, Col, Container} from 'reactstrap';
import Page from './Page';
import ReactMarkdown from 'react-markdown';
import {REVERSIM_SUMMIT} from '../utils';
import cn from 'classnames';

const Sponsor = ({
  sponsor: {
    name = '',
    logoHover,
    url,
    description = '',
    featuredJobInfo,
    featuredJobLink,
    excludeWebsite,
  },
  onEdit,
  onDelete,
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
    <div key={name}>
      <div className="text-center mb-4">
        <a href={url} target="_blank">
          <img src={logoHover} className={s.sponsorImg} alt={name} />
        </a>
      </div>
      <Row noGutters={true}>
        <Col sm={{size: 8, offset: 2}} className="separator pb-5 mb-5">
          <h4>
            {name}
            {onEdit && (
              <span>
                <Button size="sm" color="primary" className="ml-2" onClick={onEdit}>
                  <i className="fa fa-pencil" />
                </Button>
                <Button size="sm" color="danger" className="ml-2" onClick={onDelete}>
                  <i className="fa fa-trash" />
                </Button>
              </span>
            )}
          </h4>
          <ReactMarkdown source={descriptionWithLink} />
          {showJob && <h5>Featured job</h5>}
          {showJob && <ReactMarkdown source={featuredJob} />}
        </Col>
      </Row>
    </div>
  );
};

class SponsorWithEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isLoading: false,
    };
  }

  onEdit = () => {
    this.setState({isEditing: true});
  };

  onDelete = async () => {
    await this.props.deleteSponsor(this.props.sponsor._id);
  };

  onSubmit = async sponsor => {
    this.setState({isLoading: true});
    await this.props.updateSponsor(this.props.sponsor._id, {...this.props.sponsor, ...sponsor});
    this.setState({isEditing: false, isLoading: false});
  };

  onCancel = () => {
    this.setState({isEditing: false});
  };

  render() {
    const {isEditing} = this.state;
    const {sponsor, canEdit} = this.props;
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
    hovered: false,
  };
  render() {
    const {name, logo, url, logoHover} = this.props;
    return (
      <a
        href={url}
        target="_blank"
        className="d-block text-center"
        style={{width: '20%'}}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}>
        <div className="p-relative d-inline-block">
          <img src={logo} className={s.sponsorImg} alt={name} />
          <img
            src={logoHover}
            className={cn(s.sponsorImg, 'p-absolute')}
            alt={name}
            style={{top: 0, left: 0, opacity: this.state.hovered ? 1 : 0}}
          />
        </div>
      </a>
    );
  }
}

export const SponsorsSection = ({sponsors}) => (
  <section className="mb-20">
    <Container>
      <h1 style={{position: 'relative', zIndex: 1}}>Sponsors</h1>
      <div className="bg-emph px-6 py-9" style={{marginTop: -40}}>
        <div className="d-flex flex-wrap justify-content-between">
          {sponsors.map(s => <SponsorMini key={s._id} {...s} />)}
        </div>
        {/* <WantToBe /> */}
      </div>
    </Container>
  </section>
);

const WantToBe = () => (
  <div className="my-4 p-3 bg-gray-200 line-height-17 text-center">
    <h4>Want to be a sponsor?</h4> Contact our amazing Gilli at{' '}
    <a href="mailto:gilli@reversim.com">gilli@reversim.com</a> and let's have fun together!
  </div>
);

class SponsorsPage extends React.Component {
  render() {
    const {createSponsor, updateSponsor, deleteSponsor, user, sponsors} = this.props;
    return (
      <Page title="Sponsors" {...this.props}>
        <h1 className="text-center mt-5">Our sponsors</h1>
        {/* <WantToBe /> */}
        <Container>
          <p className="text-center mb-5">
            Here are the companies who made <b>{REVERSIM_SUMMIT}</b> possible:
          </p>
          {user &&
            user.isReversimTeamMember && (
              <div className="border p-3 mb-8">
                <h3>Add sponsor</h3>
                <SponsorForm onSubmit={createSponsor} />
              </div>
            )}
          {sponsors.map(sponsor => (
            <SponsorWithEdit
              key={sponsor._id}
              sponsor={sponsor}
              canEdit={user && user.isReversimTeamMember}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          ))}
          {/* <WantToBe /> */}
        </Container>
      </Page>
    );
  }
}

class SponsorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.sponsor ? {...this.props.sponsor} : {};
  }

  getData = event => {
    if (event) event.preventDefault();
    return pick(this.state, [
      'name',
      'logo',
      'url',
      'description',
      'featuredJobInfo',
      'featuredJobLink',
      'excludeWebsite',
    ]);
  };

  render() {
    const {onSubmit, onCancel, sponsor, isLoading} = this.props;
    const _id = sponsor ? sponsor._id : '';
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
              onChange={e => this.setState({name: e.target.value})}
            />
            <Button className="p-relative mb-3" size="sm">
              <input
                type="file"
                onChange={e => {
                  const f = e.target.files[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = e2 => {
                    this.setState({logo: e2.target.result, imgDirty: true});
                  };
                  reader.readAsDataURL(f);
                }}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />Choose logo
            </Button>
            <Input
              className="mb-3"
              size="sm"
              placeholder="Link to website"
              value={this.state.url}
              onChange={e => this.setState({url: e.target.value})}
            />
            <Input
              className="mb-3"
              size="sm"
              type="textarea"
              placeholder="Description"
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
            />
            <Input
              className="mb-3"
              size="sm"
              type="textarea"
              placeholder="Featured job info"
              value={this.state.featuredJobInfo}
              onChange={e => this.setState({featuredJobInfo: e.target.value})}
            />
            <Input
              className="mb-3"
              size="sm"
              placeholder="Link to featured job"
              value={this.state.featuredJobLink}
              onChange={e => this.setState({featuredJobLink: e.target.value})}
            />
            <div className="d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id={`excludeWebsite_${_id}`}
                defaultChecked={this.state.excludeWebsite}
                onChange={e => this.setState({excludeWebsite: e.target.checked})}
              />
              <label htmlFor={`excludeWebsite_${_id}`} className="mb-0">
                Don't automatically add website and job links
              </label>
            </div>
            {!onCancel && (
              <Button
                className="d-block mx-auto"
                color="primary"
                style={{width: 150}}
                disabled={isLoading}>
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
                  }}>
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
