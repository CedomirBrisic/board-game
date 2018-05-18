import React from "react";
import Modal from 'react-bootstrap4-modal';

const BustedLevelModal = (props) => {


    const chosenLevel = (event) => {
        const level = parseInt(event.target.getAttribute("data-level"), 10);
        props.setLevel(level);
        props.closeBustedLevelModal();
    }

    const generateLevels = () => {
        const levels = [];
        for (let i = 1; i <= props.levelReached; i++) {
            levels.push(<a className="dropdown-item" data-level={i} key={i}
                onClick={chosenLevel}>{i}</a>);
        }
        return levels
    }

    return (
        <Modal visible={props.isVisible}>
            <div className="modal-header">
                <h4 className="modal-title">BUSTED...</h4>
            </div>
            <div className="modal-body text-center">
                <h5>Rule #95 Kid,
                    <br /><br />
                    CONCENTRATE!
                </h5>
            </div>
            <div className="modal-footer">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle"
                        type="button" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Choose Level to start again
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {generateLevels()}

                    </div>
                </div>
            </div>
        </Modal>

    )
}


export default BustedLevelModal