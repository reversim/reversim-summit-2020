import React, {Component} from 'react';
import s from './Team.css';
import cn from 'classnames';
import {Modal, Row, Col, ModalHeader, ModalBody} from 'reactstrap';
import Section from "./Section";

class Team extends Component {

  state = {
    showTeamMember: false
  };

  onTeamMemberClick = id => {
    this.setState({
      showTeamMember: this.state.showTeamMember === id ? false : id
    });
  };

  toggle = id => () => {
    this.onTeamMemberClick(id);
  };

  teamMember = ({ _id, name, oneLiner, picture, bio }) => {
    const toggle = this.toggle(_id);
    return <Col sm="6" md="4" lg="3" key={name} className={cn(s.teamMember, "text-center mb-5 cursor-pointer")} onClick={() => this.onTeamMemberClick(_id)}>
      <div className={cn(s.teamImg, "mx-auto mb-3")} style={{ backgroundImage: `url('${picture}')` }}/>
      <h4>{name}</h4>
      <p>{oneLiner}</p>
      <Modal isOpen={this.state.showTeamMember === _id} toggle={toggle} className={s.teamMember}>
        <ModalHeader className={s.modalHeader} toggle={toggle}></ModalHeader>
        <ModalBody className="text-center mb-8">
          <div className={cn(s.teamImg, "mx-auto mb-3")} style={{ backgroundImage: `url('${picture}')` }}/>
          <h4>{name}</h4>
          <p>{oneLiner}</p>
          {bio}
        </ModalBody>
      </Modal>
    </Col>
  };

  render() {
    const {team} = this.props;
    return (
      <Section title="Team">
        <Row className="mt-5">
          {team.map(this.teamMember)}
        </Row>
      </Section>
    );
  }

}

export default Team;