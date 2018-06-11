import React from "react";

/**
 * stateless component
 * @param {object} props
 * @returns <SingleField />
 */
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