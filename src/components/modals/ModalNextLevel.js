import React from "react";
import Modal from 'react-bootstrap4-modal';

const ModalNextLevel = (props) => {
    return (

        <Modal visible={props.isVisible}>
            <div className="modal-header">
                <h4 className="modal-title">CONGRATULATIONS...</h4>
            </div>
            <div className="modal-body text-center">
                <h5>You made it to the next level!!!</h5>
                <br/>
                <p> Ready when you are...</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={props.levelUp} onClick={props.closeNextLevelModal}>
                    I'm ready
          </button>
            </div>
        </Modal>
    )
}

export default ModalNextLevel;