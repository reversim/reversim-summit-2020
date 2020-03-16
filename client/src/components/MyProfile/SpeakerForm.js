//SpeakerForm.js //DELETE WHEN DONE

import React from 'react';
import ga from 'react-ga';

import {Link} from 'react-router-dom';
import {Button, Input} from 'reactstrap';
import {getHref} from '../../utils';
import UserForm, {getUserData} from '../CFP/UserForm';

// styled-components components



// React components
class SpeakerForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();

    const {user, updateUserData, history} = this.props;

    if (user) {
      try {
        let newUser = getUserData(e.target.elements);
        newUser._id = user._id;
        await updateUserData(newUser);
        history.push(`/speaker/${user._id}`);
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };

  render() {
    const {user} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <UserForm user={user} />

        <div className="d-flex justify-content-center align-items-center">
          <Button color="primary" className="styled-button w-max-content btn btn-secondary mr-4">
            Submit
          </Button>
          <Link to={`/speaker/${getHref(user)}`}>Cancel</Link>
        </div>

      </form>
    );
  }
}

export default SpeakerForm;
