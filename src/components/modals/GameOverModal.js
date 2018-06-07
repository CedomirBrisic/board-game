import React from "react";
import Modal from 'react-bootstrap4-modal';

const GameOverModal = (props) => {

    return (
        <Modal visible={props.isVisible}>
            <div className="modal-header">
                <h4 className="modal-title">GAME OVER</h4>
            </div>
            <div className="modal-body text-center">
                <br />
                <p> But you can try again...</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary"
                    onClick={props.closeGameOverModal}>
                    Try Again
          </button>
            </div>
        </Modal>
    )
}

export default GameOverModal