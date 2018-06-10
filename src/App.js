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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDefaultLevelButton = this.toggleDefaultLevelButton.bind(this);
    this.setStartLevel = this.setStartLevel.bind(this);
    this.closeSetStartLevelModal = this.closeSetStartLevelModal.bind(this);
    this.clearLevelTimer = this.clearLevelTimer.bind(this);
    this.resetLevelTime = this.resetLevelTime.bind(this);
  }

  setStartLevel = event => {
    const startLevel = parseInt(event.target.value, 10);
    event.preventDefault();
    this.props.setStartLevel(startLevel);
    this.props.setLevel(startLevel)
  };

  closeSetStartLevelModal = () => {
    this.props.setDefaultLevelModal(false);
    this.props.setLeftToClick(this.props.level.startLevel + 1)
    this.props.setStartLevel(this.props.level.startLevel)
    this.props.setLevelReached(this.props.level.startLevel)
    this.props.setLives(1)
  };

  increaseLevelTime = () => {
    this.props.setLevelTime(this.props.time.levelTime + 0.1)
  };

  startLevelTimer = () => {
    this.levelTimer = setInterval(this.increaseLevelTime, 100);
  };

  clearLevelTimer = () => {
    clearInterval(this.levelTimer);
  };

  resetLevelTime = () => {
    this.props.setLevelTime(0)
  };

  toggleSetStartLevelModal = () => {
    this.clearLevelTimer();
    this.resetLevelTime();
    this.props.setDefaultLevelModal(true);

  };

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

  toggleDefaultLevelButton = () => {
    this.props.buttons.isActiveDefaultLevelButton
      ? this.props.setDefaultLevelButton(false)
      : this.props.setDefaultLevelButton(true);
  };

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

  componentDidUpdate() {
    let state = JSON.stringify(this.props);
    localStorage.setItem("superAwesomeGameAppState", state);
  }

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


