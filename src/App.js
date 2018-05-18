import React from "react";
import GameStats from "./Commponents/GameStats";
import Fields from "./Commponents/Fields";
import AdvancedStats from "./Commponents/AdvancedStats";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      level: 1,
      leftToClick: 1,
      lives: 1,
      levelReached: 1,
      levelTime: 0

    }
    this.setLevel = this.setLevel.bind(this);
    this.setLeftToClick = this.setLeftToClick.bind(this);
    this.setLives = this.setLives.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.setReachedLevel = this.setReachedLevel.bind(this);
    this.clearLevelTimer = this.clearLevelTimer.bind(this);
    this.resetLevelTime = this.resetLevelTime.bind(this);
    
  }

  levelUp = () => {
    this.setState({
      level: this.state.level + 1
    })
  }

  setLevel = (level) => {
    this.setState({
      level,
      leftToClick: level + 1
    })
  }

  setLeftToClick = (leftToClick) => {
    this.setState({
      leftToClick
    })
  }

  setLives = (lives) => {
    this.setState({
      lives
    })
  }

  setReachedLevel = (level) => {
    this.setState({
      levelReached: level
    })
  }

  increaseLevelTime = () => {
    this.setState({
      levelTime: this.state.levelTime + 0.1
    })
  }

  startLevelTimer = () => {
    this.levelTimer = setInterval(this.increaseLevelTime, 100);
  }

  clearLevelTimer = () => {
    clearInterval(this.levelTimer);
  }

  resetLevelTime=()=>{
    this.setState({
      levelTime:0
    })
  }

  componentDidMount() {
    this.setState({
      leftToClick: this.state.level + 1
    })
  }

  render() {
    return (
      <React.Fragment >
        <GameStats data={this.state} />

        <div className="row" >
          <Fields setLevel={this.setLevel}
            setLeftToClick={this.setLeftToClick}
            setLives={this.setLives}
            levelUp={this.levelUp}
            setReachedLevel={this.setReachedLevel}
            startLevelTimer={this.startLevelTimer}
            clearLevelTimer={this.clearLevelTimer}
            resetLevelTime={this.resetLevelTime}

            data={this.state}
          />

          <AdvancedStats />
        </div>

      </React.Fragment>
    );
  }
}

export default App;