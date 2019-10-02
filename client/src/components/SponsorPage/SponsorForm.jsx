/* eslint-disable prettier/prettier */

/*global cloudinary */

import React from "react";
import pick from "lodash/pick";
import { Button as StrapButton, Input as StrapInput} from "reactstrap";
import { loadScript } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { Input } from '../GlobalStyledComponents/ReversimStyledComps';

// styled-components section

const CheckboxContainer = styled.div`
  ${ ({ theme: { space } }) => `
    display: flex;
    align-items: center;
    margin-bottom: ${space.l};
  `}
`;

// React components section

class SponsorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.props.sponsor ? { ...this.props.sponsor } : {};
      this.state.techStory = this.state.techStory || {
        technologies: "",
        text: ""
      };
  
      if (this.props.sponsor && this.props.sponsor.isPremium) {
        let linkedin = this.props.sponsor.socials.find(social => social.medium === "linkedin");
        this.state.linkedin = linkedin ? linkedin.link : "";
  
        let github = this.props.sponsor.socials.find(social => social.medium === "github");
        this.state.github = github ? github.link : "";
  
        let facebook = this.props.sponsor.socials.find(social => social.medium === "facebook");
        this.state.facebook = facebook ? facebook.link : "";
  
        let twitter = this.props.sponsor.socials.find(social => social.medium === "twitter");
        this.state.twitter = twitter ? twitter.link : "";
  
        let medium = this.props.sponsor.socials.find(social => social.medium === "medium");
        this.state.medium = medium ? medium.link : "";
  
        this.state.techStory.technologies = (
          this.state.techStory.technologies || []
        ).join("\n");
      }
    }
  
    getData = event => {
      if (event) event.preventDefault();
      if (this.state.isPremium) {
        return pick(this.state, [
          "isPremium",
          "name",
          "logo",
          "url",
          "about",
          "locationLink",
          "locationShortAddress",
          "oneLiner",
          "linkedin",
          "github",
          "facebook",
          "twitter",
          "medium",
          "techStory",
          "reversimAndUs",
          "openPositions",
          "images",
          "socials"
        ]);
      } else {
        return pick(this.state, [
          "isPremium",
          "name",
          "logo",
          "url",
          "about",
          "jobUrl"
        ]);
      }
    };
  
  
    openCloudinaryUploader() {
      let uploader = cloudinary.createUploadWidget({
        cloudName: 'dtltonc5g',
        uploadPreset: 'ss7dt1yg'}, (error, result) => {
          this.cloudinaryCallback(error, result);
        });
      uploader.open();
    }
  
    cloudinaryCallback(error, result) {
      if (error) {
        console.log(error);
        return;
      }
      if (result && result.event === "success") {
        let url = result.info.secure_url;
        console.log("New image upload: " + url);
        let images = this.state.images.concat(url);
        this.setState({images});
      }
    }
    render() {
      const { onSubmit, onCancel, sponsor, isLoading } = this.props;
      loadScript("https://widget.cloudinary.com/v2.0/global/all.js")
  
      const _id = sponsor ? sponsor._id : "";
      return (
        <form onSubmit={e => onSubmit(this.getData(e))}>
          <CheckboxContainer>
            <input
              type="checkbox"
              id={`isPremium_${_id}`}
              defaultChecked={this.state.isPremium}
              onChange={e =>
                this.setState({
                  isPremium: e.target.checked,
                  socials: [],
                  images: []
                })
              }
            />
            <label htmlFor={`isPremium_${_id}`} className="mb-0">
              Is this a premium sponsor
            </label>
          </CheckboxContainer>
          <Input
           
            required
            placeholder="Name"
            value={this.state.name || ""}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <StrapButton className="p-relative mb-3" size="sm">
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
            />
            Choose logo
          </StrapButton>
          <StrapInput
            className="mb-3"
            size="sm"
            placeholder="Link to website"
            value={this.state.url || ""}
            onChange={e => this.setState({ url: e.target.value })}
          />
          <StrapInput
            className="mb-3"
            size="sm"
            placeholder="Link to job page"
            value={this.state.jobUrl || ""}
            onChange={e => this.setState({ jobUrl: e.target.value })}
          />
          <StrapInput
            className="mb-3"
            size="sm"
            type="textarea"
            placeholder="About"
            value={this.state.about || ""}
            onChange={e => this.setState({ about: e.target.value })}
          />
          {this.state.isPremium && (
            <div>
              {(this.state.images || []).map((image, i) => (
                <div key={i}>
                  {image.endsWith("mp4") ? (
                    <video width="200" controls={true}>
                      <source src={image} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={image} style={{ width: "200px" }} />
                  )}
                  <FontAwesomeIcon
                    icon="trash"
                    className="cursor-pointer"
                    onClick={() => {
                      let images = this.state.images;
                      images.splice(i, 1);
                      this.setState({ images });
                    }}
                  />
                </div>
              ))}
              <StrapButton className="p-relative mb-3" size="sm" onClick={() => this.openCloudinaryUploader()}>
                Add photos
              </StrapButton>
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="location link from google maps"
                value={this.state.locationLink}
                onChange={e => this.setState({ locationLink: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="city. like- Herzliya & Haifa, IL"
                value={this.state.locationShortAddress}
                onChange={e =>
                  this.setState({ locationShortAddress: e.target.value })
                }
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="one line description"
                value={this.state.oneLiner}
                onChange={e => this.setState({ oneLiner: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="linkedIn"
                value={this.state.linkedin}
                onChange={e => this.setState({ linkedin: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="github"
                value={this.state.github}
                onChange={e => this.setState({ github: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="facebook"
                value={this.state.facebook}
                onChange={e => this.setState({ facebook: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="twitter"
                value={this.state.twitter}
                onChange={e => this.setState({ twitter: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="medium"
                value={this.state.medium}
                onChange={e => this.setState({ medium: e.target.value })}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                type="textarea"
                placeholder="technology story"
                value={this.state.techStory ? this.state.techStory.text : ""}
                onChange={e => {
                  let techStory = this.state.techStory;
                  techStory.text = e.target.value;
                  this.setState({ techStory });
                }}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                type="textarea"
                placeholder="technologies separated by new line. make sure to remove unnecessary spaces and stuff"
                // TODO NETA- clean up my mass
                value={this.state.techStory.technologies}
                onChange={e => {
                  let techStory = this.state.techStory;
                  techStory.technologies = e.target.value;
                  this.setState({ techStory });
                }}
              />
              <StrapInput
                className="mb-3"
                size="sm"
                placeholder="reversim and Us"
                type="textarea"
                value={this.state.reversimAndUs}
                onChange={e => this.setState({ reversimAndUs: e.target.value })}
              />
              <StrapButton
                onClick={() => {
                  let openPositions = this.state.openPositions || [];
                  openPositions.push({
                    title: "",
                    city: "",
                    description: "",
                    link: ""
                  });
                  this.setState({
                    openPositions: openPositions
                  });
                }}
              >
                add an open Position
              </StrapButton>
              {this.state.openPositions &&
                this.state.openPositions.map((openPosition, i) => (
                  <div key={i} className="mb-8">
                    <StrapInput
                      className="mb-2"
                      size="sm"
                      placeholder="job title"
                      value={openPosition.title}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].title = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <StrapInput
                      className="mb-2"
                      size="sm"
                      placeholder="city"
                      value={openPosition.city}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].city = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <StrapInput
                      className="mb-2"
                      size="sm"
                      type="textarea"
                      placeholder="description"
                      value={openPosition.description}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].description = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <StrapInput
                      className="mb-2"
                      size="sm"
                      placeholder="link"
                      value={openPosition.link}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].link = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <StrapButton
                      onClick={() => {
                        let openPositions = this.state.openPositions;
                        openPositions.splice(i, 1);
                        this.setState({ openPositions });
                      }}
                    >
                      cancel
                    </StrapButton>
                  </div>
                ))}
            </div>
          )}
          {!onCancel && (
            <StrapButton
              className="d-block mx-auto"
              color="primary"
              style={{ width: 150 }}
              disabled={isLoading}
            >
              Submit
            </StrapButton>
          )}
          {onCancel && (
            <div className="d-flex justify-content-around">
              <StrapButton
                outline
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  onCancel();
                }}
              >
                Cancel
              </StrapButton>
              <StrapButton color="primary" disabled={isLoading}>
                Submit
              </StrapButton>
            </div>
          )}
        </form>
      );
    }
  }

export default SponsorForm;