/* eslint-disable prettier/prettier */

/*global cloudinary */

import React from "react";
import pick from "lodash/pick";
import { loadScript } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from 'styled-components';
import { Input, TextArea, FormButton, FileInput } from '../GlobalStyledComponents/ReversimStyledComps';

// styled-components section

const CheckboxContainer = styled.div`
  ${ ({ theme: { space } }) => `
    display: flex;
    align-items: center;
    margin-bottom: ${space.l};
  `}
`;

const TrashIcon =styled(FontAwesomeIcon)`
  ${ ({ theme: { space } }) => `
    cursor: pointer;
    margin: 0 ${space.m};
  `}
`
const OpenPositionContainer = styled.div`
  ${ ({ theme: { space } }) => `
    margin-buttom: ${space.xxl};
  `}
`;

const SubmitOrCancelContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UploadImg = styled.img`
  width: 200px;
`;

const SubmitButton = styled(FormButton)`
  width: 150px;
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
      const {
        onSubmit,
        onCancel,
        sponsor,
        isLoading,
      } = this.props;

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
            <label htmlFor={`isPremium_${_id}`}>
              Is this a premium sponsor
            </label>
          </CheckboxContainer>
          <Input
            required
            placeholder="Name"
            value={this.state.name || ""}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <FormButton>
            <FileInput
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
            />
            Choose logo
          </FormButton>
          <Input
            placeholder="Link to website"
            value={this.state.url || ""}
            onChange={e => this.setState({ url: e.target.value })}
          />
          <Input
            placeholder="Link to job page"
            value={this.state.jobUrl || ""}
            onChange={e => this.setState({ jobUrl: e.target.value })}
          />
          <TextArea
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
                    <UploadImg src={image} />
                  )}
                  <TrashIcon
                    icon="trash"
                    onClick={() => {
                      let images = this.state.images;
                      images.splice(i, 1);
                      this.setState({ images });
                    }}
                  />
                </div>
              ))}
              <FormButton
              onClick={() => this.openCloudinaryUploader()}
              >
                Add photos
              </FormButton>
              <Input
                placeholder="location link from google maps"
                value={this.state.locationLink}
                onChange={e => this.setState({ locationLink: e.target.value })}
              />
              <Input
                placeholder="city. like- Herzliya & Haifa, IL"
                value={this.state.locationShortAddress}
                onChange={e =>
                  this.setState({ locationShortAddress: e.target.value })
                }
              />
              <Input
                placeholder="one line description"
                value={this.state.oneLiner}
                onChange={e => this.setState({ oneLiner: e.target.value })}
              />
              <Input
                placeholder="linkedIn"
                value={this.state.linkedin}
                onChange={e => this.setState({ linkedin: e.target.value })}
              />
              <Input
                placeholder="github"
                value={this.state.github}
                onChange={e => this.setState({ github: e.target.value })}
              />
              <Input
                placeholder="facebook"
                value={this.state.facebook}
                onChange={e => this.setState({ facebook: e.target.value })}
              />
              <Input
                placeholder="twitter"
                value={this.state.twitter}
                onChange={e => this.setState({ twitter: e.target.value })}
              />
              <Input
                placeholder="medium"
                value={this.state.medium}
                onChange={e => this.setState({ medium: e.target.value })}
              />
              <TextArea
                type="textarea"
                placeholder="technology story"
                value={this.state.techStory ? this.state.techStory.text : ""}
                onChange={e => {
                  let techStory = this.state.techStory;
                  techStory.text = e.target.value;
                  this.setState({ techStory });
                }}
              />
              <TextArea
                type="textarea"
                placeholder="technologies separated by new line. make sure to remove unnecessary spaces and stuff"
                value={this.state.techStory.technologies}
                onChange={e => {
                  let techStory = this.state.techStory;
                  techStory.technologies = e.target.value;
                  this.setState({ techStory });
                }}
              />
              <TextArea
                placeholder="reversim and Us"
                type="textarea"
                value={this.state.reversimAndUs}
                onChange={e => this.setState({ reversimAndUs: e.target.value })}
              />
              <FormButton
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
              </FormButton>
              {this.state.openPositions &&
                this.state.openPositions.map((openPosition, i) => (
                  <OpenPositionContainer key={i}>
                    <Input
                      placeholder="job title"
                      value={openPosition.title}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].title = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <Input
                      placeholder="city"
                      value={openPosition.city}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].city = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <TextArea
                      type="textarea"
                      placeholder="description"
                      value={openPosition.description}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].description = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <Input
                      placeholder="link"
                      value={openPosition.link}
                      onChange={e => {
                        let openPositions = this.state.openPositions;
                        openPositions[i].link = e.target.value;
                        this.setState({ openPositions });
                      }}
                    />
                    <FormButton
                      onClick={() => {
                        let openPositions = this.state.openPositions;
                        openPositions.splice(i, 1);
                        this.setState({ openPositions });
                      }}
                    >
                      cancel
                    </FormButton>
                  </OpenPositionContainer>
                ))}
            </div>
          )}
          {!onCancel && (
            <SubmitButton
              disabled={isLoading}
            >
              Submit
            </SubmitButton>
          )}
          {onCancel && (
            <SubmitOrCancelContainer>
              <FormButton
                outline
                onClick={e => {
                  e.preventDefault();
                  onCancel();
                }}
              >
                Cancel
              </FormButton>
              <SubmitButton disabled={isLoading}>
                Submit
              </SubmitButton>
            </SubmitOrCancelContainer>
          )}
        </form>
      );
    }
  }

export default SponsorForm;