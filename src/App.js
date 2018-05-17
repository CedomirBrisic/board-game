import React from "react";
import GameStats from "./Commponents/GameStats";
import Fields from "./Commponents/Fields";
import AdvancedStats from "./Commponents/AdvancedStats";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      level: 2,
      leftToClick: 1,
      lives: 1
    }

    this.setLevel = this.setLevel.bind(this);
    this.setLeftToClick = this.setLeftToClick.bind(this);
    this.setLives = this.setLives.bind(this);
    this.levelUp = this.levelUp.bind(this);
  }

  levelUp = () => {
    const level = this.state.level + 1;
    this.setState({
      level
    })
  }

  setLevel = (level) => {
    this.setState({
      level
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

  componentDidMount() {
    this.setState({
      leftToClick: this.state.level + 1
    })
  }

  render() {
    return (
      <React.Fragment>
        <GameStats data={this.state} />

        <div className="row">
          <Fields setLevel={this.setLevel}
            setLeftToClick={this.setLeftToClick}
            setLives={this.setLives}
            levelUp={this.levelUp}
            data={this.state} />

          <AdvancedStats />
        </div>

      </React.Fragment>
    );
  }
}

export default App;
