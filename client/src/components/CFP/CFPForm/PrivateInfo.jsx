import React, {Component} from 'react';
import Joi from '@hapi/joi';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  StepContainer,
  StepHeading,
  FormSubHeading,
  Bold,
  Italic,
  InvertedColorLink,
  ListItem,
  ListBolt,
  FormField,
  ValidationWarning,
} from '../../GlobalStyledComponents/ReversimStyledComps';

const VideoUrlFieldCaption = () => (
  <span>
    <ul>
      <ListItem>
        <Bold>Seasoned speakers</Bold>: A link to a video of a session given in a previous conference.</ListItem>
      <ListItem>
        <Bold>New speakers</Bold>: A short video introducing you and the planned session outline.
        <br/>Please watch Adam explain about <InvertedColorLink href="https://www.youtube.com/watch?v=F09My4646hI" target="_blank">proper proposal submission</InvertedColorLink> for guidance.
      </ListItem>
    </ul>
    <Italic>
      <Bold>Note</Bold>: You may reuse this video link in the below "Track record" section.
    </Italic>
  </span>
);

class PrivateInfo extends Component {
  constructor(props){
    super(props);
    this.state = {      
      validationError: {
        field: '',
        message: '',
      },
    };
  };
  
  validationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    phone: Joi.string().pattern(/^[0-9\+]{9,13}$/,).required().label('Phone'),
    videoUrl: Joi.string().regex(/^(http(s)?:\/\/)(www\.).*$/, 'valid URL').label('Video URL'),
    trackRecord: Joi.string().max(600).required().label('Track Record'),
  });

  isValidated = () => {
    const {
      email,
      phone,
      trackRecord,
      videoUrl,
    } = this.props

    const toValidate = {
      email,
      phone,
      trackRecord,
      videoUrl,
    };

    const {error} = this.validationSchema.validate(toValidate);
    
    const validationError = error 
    ? {
      validationError: {
        field: error.details[0].path[0],
        message: error.details[0].message,
      },
    }
    : {};
    
    error && console.log('Error is: ', error.details[0]); // DELETE WHEN DONE

    const newState = _.assign({}, this.state, validationError);

    error && this.setState(newState);

    return error ? false : true;
  };

  render() {
    const {validationError} = this.state;

    const {
      email,
      phone,
      trackRecord,
      videoUrl,
      setValueDebounced,
    } = this.props;

    return (
      <StepContainer>
        <StepHeading>Private information</StepHeading>
        <FormSubHeading>
          The following information will be available <Bold>only to the organizing committee</Bold>
        </FormSubHeading>
        <FormField
          id="email"
          label="Email"
          required={true}
          placeholder="your.email@here.please"
          value={email}
          onChange={e => setValueDebounced('email', e.target.value)}
        />
        {validationError.field === "email" && ValidationWarning(validationError.message)}
        <FormField
          id="phone"
          label="Phone Number"
          required={true}
          placeholder="05x-xxxxxxx"
          value={phone}
          onChange={e => setValueDebounced('phone', e.target.value)}
        />
        {validationError.field === "phone" && ValidationWarning(validationError.message)}
        <FormField
          id="video_url"
          label="Link to Video"
          required={true}
          value={videoUrl}
          placeholder="e.g. http://youtu.be/xxxx"
          subtitle={<VideoUrlFieldCaption />}
          onChange={e => setValueDebounced('video_url', e.target.value)}
        />
        {validationError.field === "videoUrl" && ValidationWarning(validationError.message)}
        
        <FormField
          id="trackRecord"
          label="Track record as speaker, if available"
          value={trackRecord}
          placeholder=""
          required={true}
          multiline={true}
          subtitle={
            <span>
              Reversim Summit is looking for a balance between seasonal speakers and new speakers. <br/><br/>

              Seasonal speakers should include links to presentations, most preferable videos of them (plus
              slides)<br />
              <br />
              <Bold>Example:</Bold>
              <ul>
                <ListItem>
                  <ListBolt icon={faChevronRight} />
                  ExampleCon 2017, Sweden (Keynote speaker): “Modern Fortran development with ActiveX”
                  (45 minutes). Video: ,{' '}
                  <InvertedColorLink
                    tabIndex="-1"
                    target="_blank"
                    href="https://www.youtube.com/watch?v=Nf_Y4MbUCLY"
                    rel="noopener noreferrer">
                    https://www.youtube.com/watch?v=Nf_Y4MbUCLY
                  </InvertedColorLink>{' '}
                  slides: http://example.com/slide1
                </ListItem>
                <ListItem>
                  <ListBolt icon={faChevronRight} />
                  EsoteriCon 2016, Tel Aviv: “How I sold my Piet program to MOMA for $20M” (20 minutes),
                  Video:{' '}
                  <InvertedColorLink
                    tabIndex="-1"
                    target="_blank"
                    href="https://youtu.be/DGXx56WqqJw"
                    rel="noopener noreferrer">
                    https://youtu.be/DGXx56WqqJw
                  </InvertedColorLink>, slides: http://example.com/slide2
                </ListItem>
                <ListItem>
                  <ListBolt icon={faChevronRight} />
                  Israeli LOLCODE meetup (February 2015), Tel Aviv, “Is LOLCODE Turing complete?” (5
                  minutes), Video:{' '}
                  <InvertedColorLink
                    tabIndex="-1"
                    target="_blank"
                    href="https://www.youtube.com/watch?v=Wpx6XnankZ8"
                    rel="noopener noreferrer">
                    https://www.youtube.com/watch?v=Wpx6XnankZ8
                  </InvertedColorLink>, slides: http://example.com/slide3
                </ListItem>
              </ul>
            </span>
          }
          onChange={e => setValueDebounced('trackRecord', e.target.value)}
        />
        {validationError.field === "trackRecord" && ValidationWarning(validationError.message)}

      </StepContainer>
    );
  }
}
export default PrivateInfo;
