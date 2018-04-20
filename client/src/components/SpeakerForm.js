import React from 'react';
import { Button, Input } from 'reactstrap';
import UserForm, { getUserData } from './UserForm';
import ga from 'react-ga';
import { Link } from 'react-router-dom';

class SpeakerForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault();

    const { user, updateUserData } = this.props;

    if (user) {
      try {
        await updateUserData(getUserData(e.target.elements));
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
      <UserForm user={user} />
      <Input type="submit" className="d-none"/>
      <div className="d-flex justify-content-center align-items-center">
        <Button color="primary" className="mr-4" style={{ width: 120 }}>Submit</Button>
        <Link to={`/speaker/${user._id}`}>Cancel</Link>
      </div>
    </form>
  }
}

export default SpeakerForm;