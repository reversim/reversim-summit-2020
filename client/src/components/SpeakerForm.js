import React from 'react';
import { Button, Input } from 'reactstrap';
import FormField from './FormField';
import ga from 'react-ga';
import { Link } from 'react-router-dom';

const SPACING = "mb-4";

class SpeakerForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    const {
      user,
      updateUserData,
      onSubmit,
    } = this.props;

    if (user) {
      const fullname = formElements.fullname.value;
      const oneLiner = formElements.oneLiner.value;
      const bio = formElements.bio.value;
      const trackRecord = formElements.trackRecord.value;
      const linkedin = formElements.linkedin.value;
      const twitter = formElements.twitter.value;
      const github = formElements.github.value;
      const phone = formElements.phone.value;

      try {
        await updateUserData({
          name        : fullname,
          bio         : bio,
          trackRecord : trackRecord,
          linkedin    : linkedin,
          twitter     : twitter,
          github      : github,
          oneLiner    : oneLiner,
          phone       : phone
        });
        onSubmit();
      } catch(ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true
        });
      }
    }
  };

  render() {
    const { user } = this.props;
    return <form onSubmit={this.handleSubmit}>
      <h3>Public information</h3>
      <div className="text-gray font-size-sm mb-6">The following information will be presented in the website</div>
      <FormField id="fullname" label="Full name" required={true} placeholder="Your name" value={user.name} className={SPACING} />
      <FormField id="oneLiner" label="One Liner" value={user.oneLiner} maxLength={100} className={SPACING} subtitle={<span>Maximum 100 characters<br/><b>Example</b>: COBOL developer at Acme Corp</span>}/>
      <FormField id="linkedin" label="Linkedin Profile" value={user.linkedin} inputType="url" className={SPACING} />
      <FormField id="github" label="GitHub username" value={user.github} placeholder="mrdoob" className={SPACING} />
      <FormField id="twitter" label="Twitter @name" value={user.twitter} placeholder="@Reversim" className={SPACING} />
      <FormField id="bio" label="Short Bio" value={user.bio} placeholder="" required={true} multiline={true} className="mb-8" subtitle={<span>Tell everybody a little bit about yourself. Useful sentences can be:<br/><br/>
        “A front-end developer for the last X years”<br/>
        “I work remotely, and interested in building remote teams and effective internal communication”<br/>
        “I enjoy developing and using open source code”<br/>
        “I participate in the Meetup X”<br/>
        “I have been influenced by the book ‘The Pragmatic Programmer’”<br/>
        “I have been playing with Deep Learning recently, took some online courses and eager to learn more!”<br/>
        “I am an avid wikipedia contributor”</span>}/>
      <h3>Private information</h3>
      <div className="text-gray font-size-sm mb-6">The following information will be available <b>only to the organizing committee</b></div>
      <FormField id="email" label="Email" text={user.email} required={true} className={SPACING} />
      <FormField id="phone" label="Phone number" required={true} placeholder="05x-xxxxxxx" value={user.phone} className={SPACING} />
      <FormField id="trackRecord" label="Track record as speaker" value={user.trackRecord} placeholder="" required={true} multiline={true} className={SPACING} subtitle={<span>Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)<br/><br/><b>Example:</b>
        <ul><li>&bull; ExampleCon 2017, Sweden (Keynote speaker): “Modern Fortran development with ActiveX” (45 minutes). Video: , <a tabIndex="-1" target="_blank" href="https://www.youtube.com/watch?v=Nf_Y4MbUCLY" rel="noopener noreferrer">https://www.youtube.com/watch?v=Nf_Y4MbUCLY</a> slides: http://example.com/slide1</li>
          <li>&bull; EsoteriCon 2016, Tel Aviv: “How I sold my Piet program to MOMA for $20M” (20 minutes), Video: <a tabIndex="-1" target="_blank" href="https://youtu.be/DGXx56WqqJw" rel="noopener noreferrer">https://youtu.be/DGXx56WqqJw</a>, slides: http://example.com/slide2</li>
          <li>&bull; Israeli LOLCODE meetup (February 2015), Tel Aviv, “Is LOLCODE Turing complete?” (5 minutes),  Video: <a tabIndex="-1" target="_blank" href="https://www.youtube.com/watch?v=Wpx6XnankZ8" rel="noopener noreferrer">https://www.youtube.com/watch?v=Wpx6XnankZ8</a>, slides: http://example.com/slide3</li></ul></span>}/>
      <Input type="submit" className="d-none"/>
      <div className="d-flex justify-content-center align-items-center">
        <Button color="primary" className="mr-4" style={{ width: 120 }}>Submit</Button>
        <Link to={`/speaker/${user._id}`}>Cancel</Link>
      </div>
    </form>
  }
}

export default SpeakerForm;