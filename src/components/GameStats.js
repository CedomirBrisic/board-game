import React from "react";

const GameStats = (props) => {

    return (
        <ul className="game-stats row mt-5">
            <li className="col-lg-2 offset-1"><b>Game Stats:</b></li>
            <li className="col-lg-2 offset-1 offset-lg-0">Time: {props.levelTime.toFixed(2)} 's </li>
            <li className="col-lg-2 offset-1 offset-lg-0">Left to click: {props.leftToClick}</li>
            <li className="col-lg-2 offset-1 offset-lg-0">Lives: {props.lives}</li>
            <li className="col-lg-2 offset-1 offset-lg-0">Level: {props.level}</li>
        </ul>
    )
}

export default GameStats;