// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeIsStart: 0,
  timeIsReStart: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerInMinutes = () => {
    const {timerInMinutes} = this.state

    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerInMinutes = () =>
    this.setState(prevState => ({
      timerInMinutes: prevState.timerInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerInMinutes, timerElapsedInSeconds} = this.state
    // eslint-disable-next-line no-unused-vars
    const isButtonsIsDisable = timerElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-section">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-container">
          <button
            className="limit-controller-button"
            disabled={isButtonsIsDisable}
            onClick={this.onDecreaseTimerInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsIsDisable}
            onClick={this.onIncreaseTimerInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerElapsedInSeconds, timerInMinutes} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timerElapsedInSeconds, timerInMinutes} = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'Pause' : 'Play'

    return (
      <div>
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onClickReset}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerInMinutes, timerElapsedInSeconds} = this.state
    const totalRemainingSeconds = timerInMinutes * 60 - timerElapsedInSeconds

    const minute = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minute > 9 ? minute : `0${minute}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-section">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-section">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
