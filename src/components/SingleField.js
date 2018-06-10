import React from "react";

const SingleField = (props) => {

    return (
        <div className={props.fieldData.status}

            data-id={props.fieldData.id}
            data-x={props.fieldData.x}
            data-y={props.fieldData.y}
            data-status={props.fieldData.status}

            onClick={props.click}
        >
        </div>
    )
}
export default SingleField;