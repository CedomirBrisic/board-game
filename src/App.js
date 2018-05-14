import React, { Component } from "react";
import { GameStats } from "./Commponents/GameStats";
import { Fields } from "./Commponents/Fields";
import { AdvancedStats } from "./Commponents/AdvancedStats";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GameStats />

        <div className="row">
          <Fields />
          <AdvancedStats />
        </div>

      </React.Fragment>
    );
  }
}

export default App;
