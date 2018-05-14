import React, { Component } from "react";

class GameStats extends React.Component {


    render() {
        return (
            <ul className="game-stats mt-5">
                <li className="col-lg-2 offset-1"><b>Game Stats:</b></li>
                <li className="col-lg-2 offset-1 offset-lg-0">Time: xxx seconds </li>
                <li className="col-lg-2 offset-1 offset-lg-0">Left to click: xxx</li>
                <li className="col-lg-2 offset-1 offset-lg-0">Lives: xxx</li>
                <li className="col-lg-2 offset-1 offset-lg-0">Level: xxx</li>
            </ul>
                    )
                }
}

export {GameStats}