import React from "react";
import cn from "classnames";

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingDays: 0,
      remainingHours: 0,
      remainingMinutes: 0,
      remainingSeconds: 0
    };
    this.countDown(props.timeRemainingInSeconds);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.countDown(nextProps.timeRemainingInSeconds);
  }

  updateRemainMinutesAndSeconds(timeRemainingInSeconds) {
    let remainingDays = Math.floor(timeRemainingInSeconds / (60 * 60 * 24));
    timeRemainingInSeconds -= remainingDays * (60 * 60 * 24);
    let remainingHours = Math.floor(timeRemainingInSeconds / 3600);
    timeRemainingInSeconds -= remainingHours * 3600;
    let remainingMinutes = Math.floor(timeRemainingInSeconds / 60);
    let remainingSeconds = Math.floor(timeRemainingInSeconds % 60);
    this.setState({
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds
    });
  }

  countDown(timeRemainingInSeconds) {
    if (timeRemainingInSeconds > 0) {
      this.updateRemainMinutesAndSeconds(timeRemainingInSeconds);
      timeRemainingInSeconds = timeRemainingInSeconds - 1;
      this.setTimeoutId = setTimeout(
        this.countDown.bind(this, timeRemainingInSeconds, false),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
  }

  render() {
    return (
      <div className="timer">
        <div>
          <div className="lead number-display d-flex justify-content-between font-size-lg">
            <div className="d-flex flex-column mr-4 align-items-center">
              <div className="countdown-number">{this.state.remainingDays}</div>
              <div className="countdown-time-txt">days</div>
            </div>
            <div className="d-flex flex-column mr-4 align-items-center">
              <div className="countdown-number">{this.state.remainingHours}</div>
              <div className="countdown-time-txt">hours</div>
            </div>
            <div className="d-flex flex-column mr-4 align-items-center">
              <div className="countdown-number">
                {this.state.remainingMinutes > 9
                  ? this.state.remainingMinutes
                  : "0" + this.state.remainingMinutes}
              </div>
              <div className="countdown-time-txt">minutes</div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <div className="countdown-number">
                {this.state.remainingSeconds > 9
                  ? this.state.remainingSeconds
                  : "0" + this.state.remainingSeconds}
              </div>
              <div className="countdown-time-txt">seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
