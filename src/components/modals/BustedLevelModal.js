import React from "react";
import Modal from 'react-bootstrap4-modal';

/**
 * stateless component
 * @param {object} props
 * @returns <BustedLevelModal />
 */
const BustedLevelModal = (props) => {
    /**
     * side effect function - sets level and closes Modal
     * @param  {object} event - it picks up value that represents level
     */
    const chosenLevel = (event) => {
        const level = parseInt(event.target.getAttribute("data-level"), 10);
        props.setLevel(level);
        props.setLeftToClick(level + 1)
        props.closeBustedLevelModal();
    }
    /**
     * anonymus function - shows possible levels to choose
     * @returns array of list items representing levels from start level to reached level
    */
    const generateChosenLevel = () => {
        const levels = [];
        for (let i = props.startLevel; i <= props.levelReached; i++) {
            levels.push(<a className="dropdown-item" data-level={i} key={i}
                onClick={chosenLevel}>{i}</a>);
        }
        return levels
    }

    return (
        <Modal visible={props.isVisible}>
            <div className="modal-header p-4">
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
                        {generateChosenLevel()}

                    </div>
                </div>
            </div>
        </Modal>

    )
}


export default BustedLevelModal