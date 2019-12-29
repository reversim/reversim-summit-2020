import React, {Fragment} from 'react';
import FormField, {SPACING} from '../../FormField';

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
} from '../../GlobalStyledComponents/ReversimStyledComps';


const VideoUrlFieldCaption = () => (
  <span>
    <ul>
      <ListItem>
        <Bold>Seasoned speakers</Bold>: A link to a video of a session given in a previous conference.</ListItem>
      <ListItem>
        <Bold>New speakers</Bold>: A short video introducing you and the planned session outline.
        <br/>Please see <InvertedColorLink href="https://www.youtube.com/watch?v=F09My4646hI">https://www.youtube.com/watch?v=F09My4646hI</InvertedColorLink> for guidance
      </ListItem>
    </ul>
    <Italic>
      <Bold>Note</Bold>: You may reuse this video link in the below "Track record" section.
    </Italic>
  </span>
);

const PrivateInfo = user => (
  <StepContainer>
    <StepHeading>Private information</StepHeading>
    <FormSubHeading>
      The following information will be available <Bold>only to the organizing committee</Bold>
    </FormSubHeading>
    <FormField id="email" label="Email" text={user.email} required={true} className={SPACING} />
    <FormField
      id="phone"
      label="Phone number"
      required={true}
      placeholder="05x-xxxxxxx"
      value={user.phone}
      className={SPACING}
    />
    <FormField
      id="video_url"
      label="Link to video"
      required={true}
      value={user.video_url}
      placeholder="e.g. http://youtu.be/xxxx"
      subtitle={<VideoUrlFieldCaption />}
      className={SPACING}
    />
    <FormField
      id="trackRecord"
      label="Track record as speaker, if available"
      value={user.trackRecord}
      placeholder=""
      required={true}
      multiline={true}
      className={SPACING}
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
    />
  </StepContainer>
);

export default PrivateInfo;
