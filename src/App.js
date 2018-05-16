import React from "react";
import GameStats from "./Commponents/GameStats";
import Fields from "./Commponents/Fields";
import AdvancedStats from "./Commponents/AdvancedStats";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      level: 91
    }

    this.levelUp = this.levelUp.bind(this);
  }

  levelUp = () => {
    const levelUp = this.state.level + 1;
    this.setState({
      level: levelUp
    })
  }


  render() {
    return (
      <React.Fragment>
        <GameStats level={this.state.level} />

        <div className="row">
          <Fields levelUp={this.levelUp}
            level={this.state.level} />

          <AdvancedStats />
        </div>

      </React.Fragment>
    );
  }
}

export default App;
