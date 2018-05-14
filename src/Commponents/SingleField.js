import React, { Component } from "react";


class SingleField extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

        return(
            <div className={this.props.fieldData.status}
            data-id={this.props.fieldData.id}
            data-x={this.props.fieldData.x}
            data-y={this.props.fieldData.y}
            onClick={this.props.selectingField}
            >
        </div>
    )
}
}
export {SingleField}