import React from "react";
import { connect } from "react-redux";
import { setDefaultLevelModal } from "./actions/modalActions";
import { setDefaultLevelButton } from "./actions/buttonActions";
import { setLeftToClick } from "./actions/clickActions";
import { setLevel, setStartLevel, setLevelReached } from "./actions/levelActions";
import { setLives } from "./actions/liveActions";
import { setLevelTime } from "./actions/timeActions";
import SetDefaultLevel from "./components/modals/SetDefaultLevel";
import GameStats from "./components/GameStats";
import Fields from "./components/Fields";
import AdvancedStats from "./components/advancedStats/AdvancedStats";
import "./App.css";

/**
 * main component
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDefaultLevelButton = this.toggleDefaultLevelButton.bind(this);
    this.setStartLevel = this.setStartLevel.bind(this);
    this.closeSetStartLevelModal = this.closeSetStartLevelModal.bind(this);
    this.clearLevelTimer = this.clearLevelTimer.bind(this);
    this.resetLevelTime = this.resetLevelTime.bind(this);
  }

  /**
   * side effect method, it sets default start level
   * @memberof App
   * @param {object} event - from SetDefaultLevel Component, it picks up value that represents default start level
   */
  setStartLevel = (event) => {
    const startLevel = parseInt(event.target.value, 10);
    event.preventDefault();
    this.props.setStartLevel(startLevel);
    this.props.setLevel(startLevel)
  };

  /**
     * anonymous side effect method, it sets start level
     * @memberof App
     */
  closeSetStartLevelModal = () => {
    this.props.setDefaultLevelModal(false);
    this.props.setStartLevel(this.props.level.startLevel)
    this.props.setLeftToClick(this.props.level.startLevel + 1)
    this.props.setLevelReached(this.props.level.startLevel)
    this.props.setLives(1)
  };

  /**
   * anonymous side effect method, it increases level-time for 0.1s
   * @memberof App
   */
  increaseLevelTime = () => {
    this.props.setLevelTime(this.props.time.levelTime + 0.1)
  };

  /**
   * anonymous side effect method, it triggers "increaseLevelTime" at every 0.1s
   * @memberof App
   */
  startLevelTimer = () => {
    this.levelTimer = setInterval(this.increaseLevelTime, 100);
  };

  /**
   * anonymous side effect method, it stops timer for level-time
   * @memberof App
   */
  clearLevelTimer = () => {
    clearInterval(this.levelTimer);
  };

  /**
   * anonymous side effect method, it resets level-time to 0
   * @memberof App
   */
  resetLevelTime = () => {
    this.props.setLevelTime(0)
  };

  /**
   * anonymous side effect method, it opens "Default Level Modal" and resets level-time
   * @memberof App
   */
  toggleSetStartLevelModal = () => {
    this.clearLevelTimer();
    this.resetLevelTime();
    this.props.setDefaultLevelModal(true);
  };

  /**
   * anonymous method, enables/disables button
   * @memberof App
   * @returns button for opening "Default Level Modal"
   */
  isActiveDefaultLevelButton = () => {
    return this.props.buttons.isActiveDefaultLevelButton ? (
      <button
        type="button"
        className="btn-default"
        onClick={this.toggleSetStartLevelModal}
      >
        Restart game
      </button>
    ) : (
        <button
          type="button"
          className="btn-default"
          onClick={this.toggleSetStartLevelModal}
          disabled
        >
          Restart game
      </button>
      );
  };

  /**
   * anonymous side effect method, it opens "Default Level Modal" and resets level-time
   * @memberof App
   */
  toggleDefaultLevelButton = () => {
    this.props.buttons.isActiveDefaultLevelButton
      ? this.props.setDefaultLevelButton(false)
      : this.props.setDefaultLevelButton(true);
  };

  /**
   * React lifecycle method - gets initial data from local storage and sets application's initial data
   * @memberof App
   */
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("superAwesomeGameAppState"));

    if (data !== null) {
      this.props.setDefaultLevelModal(data.modals.defaultLevelModal)
      this.props.setDefaultLevelButton(false)
      this.props.setLevel(data.level.level)
      this.props.setStartLevel(data.level.startLevel)
      this.props.setLevelReached(data.level.levelReached)
      this.props.setLeftToClick(data.level.level + 1)
      this.props.setLives(data.lives.lives)
      this.props.setLevelTime(0)
    }
  }

  /**
     * React lifecycle method - sets application's data to local storage
     * @memberof App
     */
  componentDidUpdate() {
    let state = JSON.stringify(this.props);
    localStorage.setItem("superAwesomeGameAppState", state);
  }
  /**
     * React lifecycle method - it renders defualt-level-button and <SetDefaultLevel />, <GameStats />, <Fields />, <AdvancedStats /> components
     * @memberof App
     */
  render() {
    return (
      <React.Fragment>
        {this.isActiveDefaultLevelButton()}

        <SetDefaultLevel
          isVisible={this.props.modals.defaultLevelModal}
          setStartLevel={this.setStartLevel}
          closeSetStartLevelModal={this.closeSetStartLevelModal}
          startLevel={this.props.level.startLevel}
        />

        <GameStats leftToClick={this.props.click.leftToClick}
          level={this.props.level.level}
          lives={this.props.lives.lives}
          levelTime={this.props.time.levelTime}
        />

        <div className="row">
          <Fields
            startLevelTimer={this.startLevelTimer}
            clearLevelTimer={this.clearLevelTimer}
            resetLevelTime={this.resetLevelTime}
            toggleDefaultLevelButton={this.toggleDefaultLevelButton}
          />

          <AdvancedStats />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modals: state.modals,
    buttons: state.buttons,
    click: state.click,
    level: state.level,
    lives: state.lives,
    time: state.time
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setDefaultLevelModal: (value) => {
      dispatch(setDefaultLevelModal(value));
    },
    setDefaultLevelButton: (value) => {
      dispatch(setDefaultLevelButton(value));
    },
    setLeftToClick: (value) => {
      dispatch(setLeftToClick(value));
    },
    setStartLevel: (value) => {
      dispatch(setStartLevel(value));
    },
    setLevel: (value) => {
      dispatch(setLevel(value));
    },
    setLevelReached: (value) => {
      dispatch(setLevelReached(value));
    },
    setLives: (value) => {
      dispatch(setLives(value));
    },
    setLevelTime: (value) => {
      dispatch(setLevelTime(value));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)


