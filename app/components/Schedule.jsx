import React, { Component, Children, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/main';
import ga from 'react-ga';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { canUseDom } from 'features';
import Speaker from 'components/Speaker';
import { push } from 'react-router-redux';
const cx = classNames.bind(styles);

const mdWidth = 992;

class Day extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active, children, auditoriumNav } = this.props;

    return (
      <div className={cx({'tab-pane': true, 'fade': true, 'in': true, 'active': active})}>
        {auditoriumNav}

        <div className={cx('tab-content', 'tab-content-schedule')}>
          {children}
        </div>
      </div>
    )
  }
}

class GroupedSession extends Component {
  constructor(props) {
    super(props);
  }

  togglePreview(session) {
    return (event) => {
      event.preventDefault();
      const { fromProposal, dispatch } = this.props;

      if (session) {
        if (canUseDom() && window.innerWidth < mdWidth) {
          dispatch(push(`/session/${session.id}`));
        } else {
          this.props.togglePreview(session);
        }
      }
    }
  }

  render() {
    let { title, fromProposals, togglePreview, activeSession } = this.props;

    let sessions = (fromProposals || []).map((session, i) => {
      return (
        <li key={i} className={cx('grouped-session')}><a href='#' className={cx({'active': session.id === activeSession})} onClick={this.togglePreview(session).bind(this)}>{session.title}</a></li>
      );
    })

    return (
        <div className={cx({'schedule-item': true, 'clickable-schedule-item': this.props.togglePreview !== undefined, 'active': activeSession})} onClick={this.togglePreview.bind(this)}>
          <div style={{marginBottom: 15}}>
            <span className={cx('h7')}>{title}</span> <em style={{display:'block'}} className={cx('hidden-md', 'hidden-lg', 'small')}>{ fromProposals.length > 0 && fromProposals[0].hall }</em>
          </div>
          <ul>
            {sessions}
          </ul>
        </div>
    );
  }
}

class Session extends Component {
  constructor(props) {
    super(props);
  }

  togglePreview(event) {
    event.preventDefault();
    const { fromProposal, dispatch } = this.props;

    if (fromProposal) {
      if (canUseDom() && window.innerWidth < mdWidth) {
        dispatch(push(`/session/${fromProposal.id}`));
      } else {
        this.props.togglePreview(fromProposal);
      }
    }
  }

  render() {
    let { title, speakers, fromProposal, togglePreview, activeSession } = this.props;

    if (fromProposal) {
      title = title !== undefined ?  `${title}: ${fromProposal.title}` : fromProposal.title;
      speakers = fromProposal.speaker_ids.map(s => s.name)
    }

    let speakerInfo;
    if (fromProposal && fromProposal.speaker_ids && fromProposal.speaker_ids.length > 0) {
      speakerInfo =
        <strong className={cx('highlight', 'speaker-name')}>{(speakers || []).join(', ')}</strong>
    }

    return (
        <div className={cx({'schedule-item': true, 'clickable-schedule-item': this.props.togglePreview !== undefined, 'active': activeSession})} onClick={this.togglePreview.bind(this)}>
          <div className={cx('h7')}>{title}</div>
          {speakerInfo}
          <em className={cx('hidden-md', 'hidden-lg', 'small')}>{ fromProposal && fromProposal.hall }</em>
        </div>
    );
  }
}

Session.propTypes = {
  fromProposal: PropTypes.object,
  togglePreview: PropTypes.func,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {

    };
}

const SessionWithDispatch = connect(mapStateToProps)(Session);

class AuditoriumNavItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;

    return (
      <div className={cx('col-xs-4', 'text-center', 'auditorium-nav')}>{name}</div>
    );
  }
}

class AuditoriumNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className={cx('container', 'nav', 'nav-schedule')}>
        <div className={cx('col-xs-1')}></div>
        <div className={cx('col-xs-11')}>
          {children}
        </div>
      </div>
    );
  }
}

class TimeSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewSession: undefined
    }
  }

  togglePreview(session) {
    this.setState({ previewSession: this.state.previewSession && this.state.previewSession.id === session.id ? undefined : session });
  }

  transformSingleSession(child, className) {
    let newChild = child;
    if ((child.type === Session && child.props.fromProposal) || (child.type === GroupedSession && child.props.fromProposals)) {
      let singleActiveSession = this.state.previewSession &&
          child.props.fromProposal &&
          child.props.fromProposal.id &&
          this.state.previewSession.id === child.props.fromProposal.id;

      let groupedActiveSession = this.state.previewSession &&
          child.props.fromProposals &&
          child.props.fromProposals.indexOf(this.state.previewSession) !== -1;

      newChild = React.cloneElement(child, { togglePreview: this.togglePreview.bind(this), activeSession: (singleActiveSession || groupedActiveSession) ? this.state.previewSession.id : undefined });
    }

    return <div className={className}>{newChild}</div>
  }

  transformSessionElements(children) {
    if (Children.count(children) === 1) {
      return Children.map(children, (child, i) => this.transformSingleSession(child, cx('col-xs-12', 'text-center')));
    } else if (Children.count(children) === 2) {
      return Children.map(children, (child, i) => this.transformSingleSession(child, cx('col-md-6', 'col-xs-12')));
    } else if (Children.count(children) === 3) {
      return Children.map(children, (child, i) => this.transformSingleSession(child, cx('col-md-4', 'col-xs-12', 'full-talk')));
    } else if (Children.count(children) === 4) {
      return Children.map(children, (child, i) => this.transformSingleSession(child, cx('col-md-3', 'col-xs-12')));
    } else {
      return children;
    }
  }

  render() {
    const { time } = this.props;

    let children = this.transformSessionElements(this.props.children);

    return (
      <div className={cx('container', 'time-slot')}>
        <div className={cx('col-xs-1', 'time')}>{time}</div>
        <div className={cx('col-xs-11', 'sessions')}>
          <div className={cx('row', 'full-talks-container')}>
            {children}
          </div>
          {
            this.state.previewSession ? (
              <div className={cx('schedule-preview-wrapper', 'row', 'hidden-xs')}>
                <div className={cx('col-xs-10', 'col-xs-offset-1', 'schedule-preview')}>
                  <div className={cx("col-md-8")} style={{paddingLeft: 0}}>
                    {this.state.previewSession.type === 'ossil' || this.state.previewSession.type === 'lightning' ? <h6>{this.state.previewSession.title}</h6> : undefined}
                    <ReactMarkdown source={this.state.previewSession.abstract} className={cx("markdown-block")} />
                      { this.state.previewSession.status === 'accepted' && this.state.previewSession.startTime !== undefined ? (
                        <strong style={{marginTop: 20, marginBottom: 50}}>{ moment(this.state.previewSession.startTime).format("dddd, MMM Do, HH:mm") + '  //  ' } { this.state.previewSession.hall !== undefined ? this.state.previewSession.hall : undefined }</strong>
                      ) : undefined }
                  </div>
                  <div className={cx("col-md-4")}>
                    { this.state.previewSession.speaker_ids && this.state.previewSession.speaker_ids.map((speaker, i) => {
                        return (<Speaker  key={i}
                                          name={speaker.name}
                                          imageUrl={speaker.picture || defaultSpeakerPic}
                                          oneLiner={speaker.oneLiner}
                                          linkedin={speaker.linkedin}
                                          bio={speaker.bio}
                                          twitter={speaker.twitter}
                                          stackOverflow={speaker.stackOverflow} />);
                    })  }
                  </div>
                </div>
              </div>
            ) : undefined
          }
      </div>
    </div>
    );
  }
}

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 1
    }
  }

  changeDay(index) {
    return (event) => {
      event.preventDefault();

      this.setState({
        day: index,
      });
    }
  }

  isDayActive(index) {
    return this.state.day === index;
  }

  getProposal(id) {
    if (this.props.acceptedProposals === undefined) return null;

    return _.find(this.props.acceptedProposals, p => p.id === id);
  }

  getProposals(ids) {
    if (this.props.acceptedProposals === undefined) return null;

    return this.props.acceptedProposals.filter(p => ids.indexOf(p.id) !== -1);
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={cx('row', 'schedule')}>

        <ul className={cx('nav', 'nav-schedule', 'days-nav')}>
          <li className={cx({"active": this.isDayActive(1)})}><a href="#" onClick={this.changeDay.bind(this)(1)}><h5 className={cx("highlight")}>Day 1</h5><p className={cx("text-alt")}>19/09/2016</p></a></li>
          <li className={cx({"active": this.isDayActive(2)})}><a href="#" onClick={this.changeDay.bind(this)(2)}><h5 className={cx("highlight")}>Day 2</h5><p className={cx("text-alt")}>20/09/2016</p></a></li>
        </ul>

        <div className={cx("tab-content")}>
          <AuditoriumNav>
            <AuditoriumNavItem name="Wix Auditorium" />
            <AuditoriumNavItem name="3D Theatre" />
            <AuditoriumNavItem name="Ebner Auditorium" />
          </AuditoriumNav>

          <Day active={this.isDayActive(1)}>
            <TimeSlot time='08:00'>
              <Session title='Registration' />
            </TimeSlot>

            <TimeSlot time='10:00'>
              <Session
                dispatch={dispatch}
                title='Welcome + Keynote'
                fromProposal={this.getProposal('e00bb311-882d-6766-6411-1cc3930289d9')} />
            </TimeSlot>

            <TimeSlot time='10:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='11:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('da9ee1e1-e427-66c6-a659-2034cf715e25')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('38c6e7f0-3c48-1f82-e9c2-2a9a529fb498')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('5b94f5f9-f823-19fa-c32d-592d8e1b995e')} />
            </TimeSlot>

            <TimeSlot time='11:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='12:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('7861a35f-d40e-6b2c-bcc4-674cdb96a3c6')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('a6be3746-f4a3-93e6-a9dd-39c2b6486c07')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('b4616643-299e-6b95-dec1-3956dc1b9e3d')} />
            </TimeSlot>

            <TimeSlot time='12:40'>
              <Session title='Lunch' />
            </TimeSlot>

            <TimeSlot time='13:40'>
              <GroupedSession
                dispatch={dispatch}
                title='Lightning Talks'
                fromProposals={this.getProposals([
                  '376b38bb-52fa-ead7-2b81-19b2a3281182',
                  '88ca8cc1-3d3f-492a-ddb8-c841fc3362ba',
                  '623d431b-0a8a-af0a-cc5c-7ab9a686e570',
                  '3c3ef8e4-8593-2b5c-0df1-9946d6dcb3b2',
                  '84fed3e0-843a-6549-d0fd-647f07d660b5',
                  'd4a93e38-e9d6-fa63-8fd3-35b09aff5c04'
                ])} />

              <Session
                title='' />

              <Session
                title='' />
            </TimeSlot>

            <TimeSlot time='14:20'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='14:30'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('e332ff16-5b9c-c95c-8f94-edd561046654')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('fac30d98-a041-a099-6514-e8599ebad53f')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('d4a1524a-e442-843c-8347-55bc4059e316')} />
            </TimeSlot>

            <TimeSlot time='15:00'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='15:10'>
              <GroupedSession
                dispatch={dispatch}
                title='Open Source Israel'
                fromProposals={this.getProposals([
                  'a7234211-4edc-d6fb-ee8d-181f210d63b2',
                  'afce4ef2-e1d5-b170-db6d-e69df4d327ed',
                  '0c6e6c08-50c1-1923-257f-ce420fbe3e2e',
                  '0f686920-ef11-f26a-b55b-532f703485f7'
                ])} />

              <Session
                title='' />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('4c8947e4-881b-ee63-698a-090944af5ffb')} />
            </TimeSlot>

            <TimeSlot time='15:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='16:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('106eada0-a4f5-229a-cad5-f0e1b2af4e94')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('a3060d0f-5721-a9a1-9075-0bceaf672a69')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('17a8dae8-3955-68bf-14f5-48a5371b30cf')} />
            </TimeSlot>

            <TimeSlot time='16:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='17:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('9eecf51c-25c0-fbef-a514-abe734acd933')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('d42405d7-9413-dd17-809b-48d47b64eef5')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('e1230b05-1e24-4f66-cdf2-adc50f73c55e')} />
            </TimeSlot>

            <TimeSlot time='17:40'>
              <Session title='Beer Break' />
            </TimeSlot>

            <TimeSlot time='18:00'>
              <Session title='Special Show' />
            </TimeSlot>

            <TimeSlot time='19:00'>
              <Session title='Goodbye' />
            </TimeSlot>
          </Day>

          <Day active={this.isDayActive(2)}>
            <TimeSlot time='08:00'>
              <Session title='Registration' />
            </TimeSlot>

            <TimeSlot time='10:00'>
              <Session
                dispatch={dispatch}
                title='Welcome + Keynote'
                fromProposal={this.getProposal('03430616-cc38-4381-ef47-f2ba4b9867c3')} />
            </TimeSlot>

            <TimeSlot time='10:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='11:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('dca9c1fd-b847-6839-c80f-77981ebe157b')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('9faf7ca7-e749-2d32-f19f-8f8f5928efed')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('4d01de61-dc1c-beb0-194b-3823ff446ef1')} />
            </TimeSlot>

            <TimeSlot time='11:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='12:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('00a9fa70-cd08-191e-a13f-091a74732178')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('79ab3edd-860e-ccac-15d2-9e9d84958b7d')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('b49d88c3-a346-8580-f32f-c0f0995e829f')} />
            </TimeSlot>

            <TimeSlot time='12:40'>
              <Session title='Lunch' />
            </TimeSlot>

            <TimeSlot time='13:40'>
              <GroupedSession
                dispatch={dispatch}
                title='Lightning Talks'
                fromProposals={this.getProposals([
                  '6889b59a-c832-a2d9-a77c-86e7fb4bbda8',
                  'b8cdb69a-a176-044a-88f6-bb67e8c36964',
                  '525504a6-d694-a0eb-f112-02b88e661ccc',
                  'c145ca50-ba54-2238-b256-d253a90fd547',
                  '9fc853de-8503-20da-ec68-98eee1cb046d',
                  '76be4439-4190-89cf-983c-715c1082cf7d'
                ])} />

              <Session
                title='' />

              <Session
                title='' />
            </TimeSlot>

            <TimeSlot time='14:20'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='14:30'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('49e134d7-71a7-2a6c-a736-acc7886d628b')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('17c7ad9d-8e74-3dbd-b98d-bf08711ba067')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('ddffb679-7379-875d-be34-5229baca2104')} />
            </TimeSlot>

            <TimeSlot time='15:00'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='15:10'>
              <GroupedSession
                dispatch={dispatch}
                title='Open Source Israel'
                fromProposals={this.getProposals([
                  'bc845832-7415-cdb9-3f58-6638e3f3e187',
                  '235320b6-6145-5bbb-3f49-8dc54066f496',
                  '750bb2f3-066f-1fc3-f0b9-76074bc217ea',
                  '9656687f-2329-7e80-6e09-fcca29a48be6'
                ])} />

              <Session
                title='' />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('366e5777-d273-dde2-94f8-3248a3cdacbb')} />
            </TimeSlot>

            <TimeSlot time='15:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='16:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('fe55ef2c-0beb-e5c1-f3b5-eac89fcb2ea7')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('ceb637ef-bce8-d099-411f-37f0b69a4e9a')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('de7ad17c-eb2d-906c-5e69-5fe43f481f95')} />
            </TimeSlot>

            <TimeSlot time='16:50'>
              <Session title='Break' />
            </TimeSlot>

            <TimeSlot time='17:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('b2fcd845-f7c7-e10f-d061-c74a5fbf7129')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('9253832a-4869-4d15-2faf-33d5ea74cea9')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('82d5147e-3d89-967d-2d13-b4bf2bf78da3')} />
            </TimeSlot>

            <TimeSlot time='17:40'>
              <Session title='Beer Break' />
            </TimeSlot>

            <TimeSlot time='18:00'>
              <Session title='Hall of Shame' />
            </TimeSlot>

            <TimeSlot time='19:00'>
              <Session title='Goodbye' />
            </TimeSlot>
          </Day>


        </div>

      </div>
    );
  }
}


Schedule.propTypes = {
  user: PropTypes.object,
  acceptedProposals: PropTypes.array
};

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Schedule);
