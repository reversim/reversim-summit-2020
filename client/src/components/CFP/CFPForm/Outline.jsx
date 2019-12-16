import React, {Fragment, Component} from 'react';
import FormField, {SPACING} from '../../FormField';
import {
  ABSTRACT_MAX,
  ABSTRACT_MIN,
} from '../../../data/proposals';
import {getUserData} from '../UserForm';
import ga from 'react-ga';
import cn from "classnames";
import {Button, Input,} from 'reactstrap';

const OutlineFieldCaption = () => (
<div>
  <p>
  This part is only visible to the moderation team.
  The outline should include the main subjects you intend to cover with a timing estimation and
  total timing. A general overview is fine, we don’t expect a per-slide description for now.
  </p>
  <p>For example:</p>
  <ul>
  <li>&bull; 2m Introduction: Who am I and my professional background</li>
  <li>&bull; 5m Architectural overview: how we built 500 different micro-services over 5 years, and
  why we ended up supporting 15 different programming languages.</li>
  <li>&bull; 5m The latency math behind a micro-service call-chain, and why we had to over-provision
  containers to avoid a 1s response time because accumulated latency is not a normal distribution</li>
  <li>&bull; 15m Our solution: Measuring everything and using a managed machine-learning platform to
  optimize our response time and server utilization</li>
  <li>&bull; 5m: The open source power! How can you use our code to optimize your production system</li>
  <li>&bull; 5m Q&A</li>
  <li>Total time: 37m</li>
  </ul>
  <br />
  <br />
</div>
);

class Outline extends Component {
  // constructor(props){
  //   super(props);
  // };

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const {user, updateUserData, createProposal, history} = this.props;

    if (user) {
      const abstract = formElements.abstract.value;
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const y =
          formElements.abstract.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          150;
        window.scrollTo(0, y);
        formElements.abstract.focus();
        return;
      }

      const categories = this.state.categories;
      if (!categories.length) {
        this.setState({missingCategories: true})
        const y =
          formElements.categories_hidden.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          750;
        window.scrollTo(0, y);
        return;
      }

      try {
        let newUser = getUserData(e.target.elements);
        newUser._id = user._id;
        await updateUserData(newUser);
        const result = await createProposal(this.getProposalData(formElements));
        history.push(`/session/${result._id}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  getProposalData = formElements => {
    const outline = formElements.outline.value;
    const legal = formElements.legal.checked;

    return {
      outline,
      legal,
    };
  };

  render (){
  
    const {
      outline,
      legal,
    } = this.props;

    return (
      <Fragment>
        <FormField
          id="outline"
          label="Outline &amp; private notes"
          required={true}
          multiline={true}
          value={outline}
          placeholder=""
          subtitle={<OutlineFieldCaption />}
          className={SPACING}
        />
        <div className={cn(SPACING, 'd-flex')}>
          <input type="checkbox" id="legal" defaultChecked={legal} required className="mr-3 mt-1" />
          <label htmlFor="legal">
            I agree that all presented materials will be shared on the web by Reversim team,
            including the slides, video on youtube and mp3 on the podcast.
          </label>
        </div>
        <div className="text-center">
            <Input type="submit" className="d-none" />
            <Button color="primary" className="mr-4" style={{width: 120}}>
              Submit
            </Button>
          </div> 
      </Fragment>
    );
}
};

export default Outline;
