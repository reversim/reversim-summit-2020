import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import ga from 'react-ga';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
const cx = classNames.bind(styles);

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded || false
    }
  }

  expand(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    let { expanded, icon, startTime, endTime, title, description, speakers, fromProposal } = this.props;

    if (fromProposal) {
      icon = <img src={fromProposal.speaker_ids[0].picture} alt={fromProposal.speaker_ids[0].name} className={cx("img-responsive")} />;
      title = title !== undefined ?  `${title}: ${fromProposal.title}` : fromProposal.title;
      description = fromProposal.abstract;
      startTime = startTime || moment(fromProposal.startTime).format("HH:mm");
      endTime = endTime || moment(fromProposal.endTime).format("HH:mm");
      speakers = fromProposal.speaker_ids.map(s => s.name)
    }

    let descriptionBlock;
    if (description) {
      descriptionBlock = <div className={cx({'panel-collapse': true, 'collapse': true, 'in': this.state.expanded, 'schedule-item-body': true})}>
        <ReactMarkdown source={description || ''} className={cx("markdown-block")} />
        <p>
          <strong className={cx('highlight', 'speaker-name')}>{(speakers || []).join(', ')}</strong>
          <Link to={`/session/${fromProposal.id}`} className={cx('small', 'pull-right')}>More Info</Link>  
        </p>
      </div>
    }

    return (
      <div className={cx('panel', 'schedule-item')}>
        <div className={cx("lecture-icon-wrapper")}>
          {icon}
        </div>
        <a data-toggle="collapse" data-parent="#schedule2_day1_auditorium1_timeline" href="#" onClick={this.expand.bind(this)} className={cx({"schedule-item-toggle": true, "collapsed": !this.state.expanded})}>
          <strong className={cx('time', 'highlight')}><span className={cx('icon', 'icon-office-24')}></span>{startTime}{endTime !== undefined ? ` - ${endTime}` : undefined}</strong>
          <h6 className={cx("title")}>{title}<i className={cx('icon', 'icon-arrows-06')}></i></h6>
        </a>

        {descriptionBlock}

      </div>
    );
  }
}

class Auditorium extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active, children } = this.props;

    return (
      <div className={cx({'tab-pane': true, 'fade': true, 'in': true, 'active': active})}>
        <div className={cx("panel-group")} id="schedule2_day1_auditorium1_timeline">
          {children}
        </div>
      </div>
    )
  }
}

class AuditoriumNavItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, active, onClick } = this.props;

    return (
      <li className={cx({ 'active': active })}><a href="#" onClick={onClick}>{name}</a></li>
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
      <ul className={cx('nav', 'nav-schedule')}>
        {children}
      </ul>
    );
  }
}

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

class Agenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 1,
      auditorium: 1
    }
  }

  changeDay(index) {
    return (event) => {
      event.preventDefault();

      this.setState({
        day: index,
        auditorium: 1
      });
    }
  }

  changeAuditorium(index) {
    return (event) => {
      event.preventDefault();

      this.setState({
        auditorium: index
      });
    }
  }

  isDayActive(index) {
    return this.state.day === index;
  }

  isAuditoriumActive(index) {
    return this.state.auditorium === index;
  }

  getProposal(id) {
    if (this.props.acceptedProposals === undefined) return null;

    return _.find(this.props.acceptedProposals, p => p.id === id);
  }

  render() {
    const auditoriums =
      <AuditoriumNav>
        <AuditoriumNavItem name='Class 1' onClick={this.changeAuditorium.bind(this)(1)} active={this.isAuditoriumActive(1)} />
        <AuditoriumNavItem name='Class 2' onClick={this.changeAuditorium.bind(this)(2)} active={this.isAuditoriumActive(2)} />
        <AuditoriumNavItem name='Class 3' onClick={this.changeAuditorium.bind(this)(3)} active={this.isAuditoriumActive(3)} />
      </AuditoriumNav>

    const registrationSlot =
      <Session
        icon={<span className={cx('fa', 'fa-coffee')} />}
        startTime='8:00'
        title='Registration'
        expanded={false} />

    const lunchSlot =
      <Session
        icon={<span className={cx('fa', 'fa-cutlery')} />}
        startTime='12:40'
        endTime='13:40'
        title='Lunch'
        expanded={false} />

    const specialShowSlot =
      <Session
        icon={<span className={cx('fa', 'fa-star')} />}
        startTime='18:00'
        endTime='19:00'
        title='Special Show'
        expanded={false} />


    const hallOfShameSlot =
      <Session
        icon={<span className={cx('fa', 'fa-thumbs-up')} />}
        startTime='18:00'
        endTime='19:00'
        title='Hall of Shame'
        expanded={false} />

    const day1Keynote =
      <Session
        icon={<span className={cx('fa', 'fa-cutlery')} />}
        startTime='10:00'
        endTime='10:50'
        title='Welcome + Keynote'
        fromProposal={this.getProposal('e00bb311-882d-6766-6411-1cc3930289d9')}
        expanded={false} />

    const day2Keynote =
      <Session
        icon={<span className={cx('fa', 'fa-cutlery')} />}
        startTime='10:00'
        endTime='10:50'
        title='Welcome + Keynote'
        fromProposal={this.getProposal('03430616-cc38-4381-ef47-f2ba4b9867c3')}
        expanded={false} />

    return (
      <div className={cx('row', 'schedule')}>

        <ul className={cx('nav', 'nav-schedule')}>
          <li className={cx({"active": this.isDayActive(1)})}><a href="#" onClick={this.changeDay.bind(this)(1)}><h5 className={cx("highlight")}>Day 1</h5><p className={cx("text-alt")}>19/09/2016</p></a></li>
          <li className={cx({"active": this.isDayActive(2)})}><a href="#" onClick={this.changeDay.bind(this)(2)}><h5 className={cx("highlight")}>Day 2</h5><p className={cx("text-alt")}>20/09/2016</p></a></li>
        </ul>

        <div className={cx("tab-content")}>

          <Day active={this.isDayActive(1)} auditoriumNav={auditoriums}>
            <Auditorium active={this.isAuditoriumActive(1)}>
              {registrationSlot}

              {day1Keynote}

              <Session
                fromProposal={this.getProposal('da9ee1e1-e427-66c6-a659-2034cf715e25')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('7861a35f-d40e-6b2c-bcc4-674cdb96a3c6')}
                expanded={false} />

              {lunchSlot}

              <Session
                icon={<span className={cx('fa', 'fa-bolt')} />}
                startTime='13:40'
                endTime='14:20'
                title='Lightning Talks'
                expanded={false} />

              <Session
                fromProposal={this.getProposal('e332ff16-5b9c-c95c-8f94-edd561046654')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-github')} />}
                startTime='15:10'
                endTime='15:50'
                title='Open Source Israel'
                expanded={false} />

              <Session
                fromProposal={this.getProposal('106eada0-a4f5-229a-cad5-f0e1b2af4e94')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('9eecf51c-25c0-fbef-a514-abe734acd933')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-beer')} />}
                startTime='17:40'
                endTime='18:00'
                title='Beer Break'
                expanded={false} />

              {specialShowSlot}
            </Auditorium>

            <Auditorium active={this.isAuditoriumActive(2)}>
              {registrationSlot}

              {day1Keynote}

              <Session
                fromProposal={this.getProposal('38c6e7f0-3c48-1f82-e9c2-2a9a529fb498')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('a6be3746-f4a3-93e6-a9dd-39c2b6486c07')}
                expanded={false} />

              {lunchSlot}

              <Session
                fromProposal={this.getProposal('fac30d98-a041-a099-6514-e8599ebad53f')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('a3060d0f-5721-a9a1-9075-0bceaf672a69')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('d42405d7-9413-dd17-809b-48d47b64eef5')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-beer')} />}
                startTime='17:40'
                endTime='18:00'
                title='Beer Break'
                expanded={false} />

              {specialShowSlot}
            </Auditorium>

            <Auditorium active={this.isAuditoriumActive(3)}>
              {registrationSlot}

              {day1Keynote}

              <Session
                fromProposal={this.getProposal('5b94f5f9-f823-19fa-c32d-592d8e1b995e')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('b4616643-299e-6b95-dec1-3956dc1b9e3d')}
                expanded={false} />

              {lunchSlot}

              <Session
                icon={<span className={cx('fa', 'fa-bolt')} />}
                startTime='13:40'
                endTime='14:20'
                title='Lightning Talks'
                expanded={false} />

              <Session
                fromProposal={this.getProposal('d4a1524a-e442-843c-8347-55bc4059e316')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('4c8947e4-881b-ee63-698a-090944af5ffb')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('17a8dae8-3955-68bf-14f5-48a5371b30cf')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('e1230b05-1e24-4f66-cdf2-adc50f73c55e')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-beer')} />}
                startTime='17:40'
                endTime='18:00'
                title='Beer Break'
                expanded={false} />

              {specialShowSlot}
            </Auditorium>
          </Day>

          <Day active={this.isDayActive(2)} auditoriumNav={auditoriums}>
            <Auditorium active={this.isAuditoriumActive(1)}>
              {registrationSlot}

              {day2Keynote}

              <Session
                fromProposal={this.getProposal('dca9c1fd-b847-6839-c80f-77981ebe157b')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('00a9fa70-cd08-191e-a13f-091a74732178')}
                expanded={false} />

              {lunchSlot}

              <Session
                icon={<span className={cx('fa', 'fa-bolt')} />}
                startTime='13:40'
                endTime='14:20'
                title='Lightning Talks'
                expanded={false} />

              <Session
                fromProposal={this.getProposal('49e134d7-71a7-2a6c-a736-acc7886d628b')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-github')} />}
                startTime='15:10'
                endTime='15:50'
                title='Open Source Israel'
                expanded={false} />

              <Session
                fromProposal={this.getProposal('fe55ef2c-0beb-e5c1-f3b5-eac89fcb2ea7')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('b2fcd845-f7c7-e10f-d061-c74a5fbf7129')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-beer')} />}
                startTime='17:40'
                endTime='18:00'
                title='Beer Break'
                expanded={false} />

              {hallOfShameSlot}
            </Auditorium>

            <Auditorium active={this.isAuditoriumActive(2)}>
              {registrationSlot}

              {day2Keynote}

              <Session
                fromProposal={this.getProposal('9faf7ca7-e749-2d32-f19f-8f8f5928efed')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('79ab3edd-860e-ccac-15d2-9e9d84958b7d')}
                expanded={false} />

              {lunchSlot}

              <Session
                fromProposal={this.getProposal('17c7ad9d-8e74-3dbd-b98d-bf08711ba067')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('ceb637ef-bce8-d099-411f-37f0b69a4e9a')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('9253832a-4869-4d15-2faf-33d5ea74cea9')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-beer')} />}
                startTime='17:40'
                endTime='18:00'
                title='Beer Break'
                expanded={false} />

              {hallOfShameSlot}
            </Auditorium>

            <Auditorium active={this.isAuditoriumActive(3)}>
              {registrationSlot}

              {day2Keynote}

              <Session
                fromProposal={this.getProposal('4d01de61-dc1c-beb0-194b-3823ff446ef1')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('b49d88c3-a346-8580-f32f-c0f0995e829f')}
                expanded={false} />

              {lunchSlot}

              <Session
                icon={<span className={cx('fa', 'fa-bolt')} />}
                startTime='13:40'
                endTime='14:20'
                title='Lightning Talks'
                expanded={false} />

              <Session
                fromProposal={this.getProposal('ddffb679-7379-875d-be34-5229baca2104')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('366e5777-d273-dde2-94f8-3248a3cdacbb')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('de7ad17c-eb2d-906c-5e69-5fe43f481f95')}
                expanded={false} />

              <Session
                fromProposal={this.getProposal('82d5147e-3d89-967d-2d13-b4bf2bf78da3')}
                expanded={false} />

              <Session
                icon={<span className={cx('fa', 'fa-beer')} />}
                startTime='17:40'
                endTime='18:00'
                title='Beer Break'
                expanded={false} />

              {hallOfShameSlot}
            </Auditorium>
          </Day>

        </div>

      </div>
    );
  }
}

export default Agenda;
