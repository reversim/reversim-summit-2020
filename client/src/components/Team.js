import React, {Component} from 'react';
import s from './Team.css';
import cn from 'classnames';
import {Modal, Row, Col, ModalHeader, ModalBody} from 'reactstrap';
import Section from "./Section";

class Team extends Component {

  toggle = id => () => {
    this.props.onTeamMemberClick(id);
  };

  teamMember = ({ _id, name, oneLiner, picture, bio }) => {
    const toggle = this.toggle(_id);
    return <Col sm="6" md="4" lg="3" key={name} className={cn(s.teamMember, "text-center mb-5")} onClick={() => this.props.onTeamMemberClick(_id)}>
      <div className={cn(s.teamImg, "mx-auto mb-3")} style={{ backgroundImage: `url('${picture}')` }}/>
      <h4>{name}</h4>
      <p>{oneLiner}</p>
      <Modal isOpen={this.props.showTeamMember === _id} toggle={toggle}>
        <ModalHeader className={s.modalHeader} toggle={toggle}></ModalHeader>
        <ModalBody className="text-center">
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