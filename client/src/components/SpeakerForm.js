import React from 'react';
import { Button, Input } from 'reactstrap';
import UserForm, { getUserData } from './UserForm';
import ga from 'react-ga';
import { Link } from 'react-router-dom';
import { getHref } from '../utils';

class SpeakerForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault();

    const { user, updateUserData, history } = this.props;

    if (user) {
      try {
        await updateUserData(getUserData(e.target.elements));
        history.push(`/speaker/${user._id}`);
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
        <Link to={`/speaker/${getHref(user)}`}>Cancel</Link>
      </div>
    </form>
  }
}

export default SpeakerForm;