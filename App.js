import React from "react";
import SetDefaultLevel from "./Commponents/Modals/SetDefaultLevel";
import GameStats from "./Commponents/GameStats";
import Fields from "./Commponents/Fields";
import AdvancedStats from "./Commponents/AdvancedStats";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startLevel: 1,
      level: 1,
      leftToClick: 1,
      lives: 1,
      levelReached: 1,
      levelTime: 0,
      setDefaultLevelModal: true,
      isActiveDefaultLevelButton: true
    };
    this.setLevel = this.setLevel.bind(this);
    this.setLeftToClick = this.setLeftToClick.bind(this);
    this.setLives = this.setLives.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.setReachedLevel = this.setReachedLevel.bind(this);
    this.clearLevelTimer = this.clearLevelTimer.bind(this);
    this.resetLevelTime = this.resetLevelTime.bind(this);
    this.setStartLevel = this.setStartLevel.bind(this);
    this.closeSetStartLevelModal = this.closeSetStartLevelModal.bind(this);
    this.toggleDefaultLevelButton = this.toggleDefaultLevelButton.bind(this);
  }
  setStartLevel = event => {
    this.setState({
      startLevel: event.target.value
    });
  };

  closeSetStartLevelModal = event => {
    event.preventDefault();
    this.setState({
      level: this.state.startLevel,
      leftToClick: parseInt(this.state.startLevel, 10) + 1,
      levelReached: event.target.value,
      setDefaultLevelModal: false
    });
  };

  levelUp = () => {
    this.setState({
      level: this.state.level + 1
    });
  };

  setLevel = level => {
    this.setState({
      level,
      leftToClick: level + 1
    });
  };

  setLeftToClick = leftToClick => {
    this.setState({
      leftToClick
    });
  };

  setLives = lives => {
    this.setState({
      lives
    });
  };

  setReachedLevel = level => {
    this.setState({
      levelReached: level
    });
  };

  increaseLevelTime = () => {
    this.setState({
      levelTime: this.state.levelTime + 0.1
    });
  };

  startLevelTimer = () => {
    this.levelTimer = setInterval(this.increaseLevelTime, 100);
  };

  clearLevelTimer = () => {
    clearInterval(this.levelTimer);
  };

  resetLevelTime = () => {
    this.setState({
      levelTime: 0
    });
  };

  toggleSetStartLevelModal = () => {
    this.clearLevelTimer();
    this.resetLevelTime();

    this.setState({
      setDefaultLevelModal: true
    });
  };

  componentDidMount() {
    this.setState({
      leftToClick: this.state.level + 1
    });
  }

  isActiveDefaultLevelButton = () => {
    return this.state.isActiveDefaultLevelButton ? (
      <button
        type="button"
        className="btn-default"
        onClick={this.toggleSetStartLevelModal}
      >
        Change default starting level
      </button>
    ) : (
      <button
        type="button"
        className="btn-default"
        onClick={this.toggleSetStartLevelModal}
        disabled
      >
        Change default starting level
      </button>
    );
  };

  toggleDefaultLevelButton = () => {
    this.state.isActiveDefaultLevelButton
      ? this.setState({ isActiveDefaultLevelButton: false })
      : this.setState({ isActiveDefaultLevelButton: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.isActiveDefaultLevelButton()}
        <SetDefaultLevel
          isVisible={this.state.setDefaultLevelModal}
          setStartLevel={this.setStartLevel}
          closeSetStartLevelModal={this.closeSetStartLevelModal}
          startLevel={this.state.startLevel}
        />
        <GameStats data={this.state} />

        <div className="row">
          <Fields
            setLevel={this.setLevel}
            setLeftToClick={this.setLeftToClick}
            setLives={this.setLives}
            levelUp={this.levelUp}
            setReachedLevel={this.setReachedLevel}
            startLevelTimer={this.startLevelTimer}
            clearLevelTimer={this.clearLevelTimer}
            resetLevelTime={this.resetLevelTime}
            toggleDefaultLevelButton={this.toggleDefaultLevelButton}
            data={this.state}
          />

          <AdvancedStats />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
