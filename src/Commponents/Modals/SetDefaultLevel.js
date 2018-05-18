import React from "react";
import Modal from 'react-bootstrap4-modal';

const SetDefaultLevel = (props) => {

    return (

        <Modal visible={props.isVisible}>
            <div className="modal-header p-4">
            </div>
            <form>
                <div className="modal-body text-center">
                    <h5>Please set defult starting level</h5>
                    <br />
                    <input type="range" value={props.startLevel} onChange={props.setStartLevel} min="1" max="100" step="1" />
                    <br />
                    <p>{props.startLevel}</p>
                </div>
                <div className="modal-footer">

                    <button type="submit" className="btn btn-primary"
                        onClick={props.closeSetStartLevelModal}>
                        OK
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default SetDefaultLevel;