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
    this.setState({
      timeRemainingInSeconds
    });
    if (timeRemainingInSeconds > 0) {
      this.updateRemainMinutesAndSeconds(timeRemainingInSeconds);
      timeRemainingInSeconds = timeRemainingInSeconds - 1;
      this.setTimeoutId = setTimeout(
        this.countDown.bind(this, timeRemainingInSeconds, false),
        1000
      );
    }
  }

  // compareServerTimeAndComponentTimeAndUpdateServer(
  //   serverSideTimeRemainingInSeconds
  // ) {
  //   let componentTimeRemainingInSeconds = localStorage.getItem(
  //     "timeRemainingInSeconds"
  //   );
  //   if (
  //     componentTimeRemainingInSeconds &&
  //     componentTimeRemainingInSeconds < serverSideTimeRemainingInSeconds
  //   ) {
  //     let differenceInMinutes = Math.floor(
  //       (serverSideTimeRemainingInSeconds - componentTimeRemainingInSeconds) /
  //         60
  //     );
  //     if (differenceInMinutes > 0) {
  //       this.props.onEveryMinute(differenceInMinutes);
  //     }
  //     return componentTimeRemainingInSeconds;
  //   }
  //   return serverSideTimeRemainingInSeconds;
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log('NETA nextProps', nextProps)
  //   if (this.props.timeRemainingInSeconds !== nextProps.timeRemainingInSeconds) {
  //     let timeRemainingInSeconds = this.compareServerTimeAndComponentTimeAndUpdateServer(
  //       nextProps.timeRemainingInSeconds
  //     );
  //     this.countDown(timeRemainingInSeconds, true);
  //   }
  // }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
  }

  render() {
    return (
      <div className="timer">
        <div>
          <div className="lead number-display d-flex font-size-lg">
            <div className="d-flex flex-column mr-4">
              <div>{this.state.remainingDays}</div>
              <div className="font-size-sm">days</div>
            </div>
            <div className="d-flex flex-column mr-4">
              <div>{this.state.remainingHours}</div>
              <div className="font-size-sm">hours</div>
            </div>
            <div className="d-flex flex-column mr-4">
              <div>
                {this.state.remainingMinutes > 9
                  ? this.state.remainingMinutes
                  : "0" + this.state.remainingMinutes}
              </div>
              <div className="font-size-sm">minutes</div>
            </div>
            <div className="d-flex flex-column">
              <div>
                {this.state.remainingSeconds > 9
                  ? this.state.remainingSeconds
                  : "0" + this.state.remainingSeconds}
              </div>
              <div className="font-size-sm">seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
