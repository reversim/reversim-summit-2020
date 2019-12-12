import React, {Fragment} from 'react';
import FormField, {SPACING} from '../../FormField';


const VideoUrlFieldCaption = () => (
  <span>
    <ul>
      <li>
        <b>Seasoned speakers</b>: A link to a video of a session given in a previous conference.</li>
      <li>
        <b>New speakers</b>: A short video introducing you and the planned session outline.
        <br/>Please see <a href="https://www.youtube.com/watch?v=F09My4646hI">https://www.youtube.com/watch?v=F09My4646hI</a> for guidance
      </li>
    </ul>
    <i>
      <b>Note</b>: You may reuse this video link in the below "Track record" section.
    </i>
  </span>
);

const StepThree = (user) => (
  <Fragment>
    <h4 className="mb-0">Private information</h4>
    <p className="font-size-sm text-gray-600">
      The following information will be available <b>only to the organizing committee</b>
    </p>
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
          <b>Example:</b>
          <ul>
            <li>
              ExampleCon 2017, Sweden (Keynote speaker): “Modern Fortran development with ActiveX”
              (45 minutes). Video: ,{' '}
              <a
                tabIndex="-1"
                target="_blank"
                href="https://www.youtube.com/watch?v=Nf_Y4MbUCLY"
                rel="noopener noreferrer">
                https://www.youtube.com/watch?v=Nf_Y4MbUCLY
              </a>{' '}
              slides: http://example.com/slide1
            </li>
            <li>
              EsoteriCon 2016, Tel Aviv: “How I sold my Piet program to MOMA for $20M” (20 minutes),
              Video:{' '}
              <a
                tabIndex="-1"
                target="_blank"
                href="https://youtu.be/DGXx56WqqJw"
                rel="noopener noreferrer">
                https://youtu.be/DGXx56WqqJw
              </a>, slides: http://example.com/slide2
            </li>
            <li>
              Israeli LOLCODE meetup (February 2015), Tel Aviv, “Is LOLCODE Turing complete?” (5
              minutes), Video:{' '}
              <a
                tabIndex="-1"
                target="_blank"
                href="https://www.youtube.com/watch?v=Wpx6XnankZ8"
                rel="noopener noreferrer">
                https://www.youtube.com/watch?v=Wpx6XnankZ8
              </a>, slides: http://example.com/slide3
            </li>
          </ul>
        </span>
      }
    />
  </Fragment>
)

export default StepThree;