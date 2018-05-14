import React, { Component } from "react";
import { fieldsData } from "../data/fieldsData";
import {calculatePossibleFields} from "../utilities/possibleFields";
import { SingleField } from "./SingleField";

class Fields extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fieldsData: fieldsData,
            selectedFieldsCoordinates: [],
            possibleFieldsData:[],
            level:1,
        };

    };

    possibleFieldsCoordinates = (id,x,y) => {

        const fieldsData = this.state.fieldsData;
        const possibleFields = calculatePossibleFields (id,x,y)

        possibleFields.forEach((possibleField) => {
            
            fieldsData[possibleField.id-1] = possibleField;
            
            this.setState({

                possibleFieldsData: possibleFields
            })
           
        })

        
    }

    levelUp = () => {
        const levelUp = this.state.level + 1;
        this.setState({
            level: levelUp
        })
    }
    
    //Applies when field is clicked
    selectingField = (event) => {
        
        const id = event.target.getAttribute("data-id");
        const x = event.target.getAttribute("data-x");
        const y = event.target.getAttribute("data-y");
        
        const selectedFieldData = {
            "id": id,
            "x": x,
            "y": y,
            "status":"selected-field"
        };
        
        const selectedFields = this.state.selectedFieldsCoordinates;
        selectedFields.push(selectedFieldData);
        
        const fieldsData = this.state.fieldsData;
        fieldsData[id-1] = selectedFieldData;
        
        this.setState({
            selectedFieldsCoordinates: selectedFields,
        })
        
        this.possibleFieldsCoordinates(id,x,y);
        this.levelUp();
        
    }  
        
        render() {

            console.log(this.state.level)
            return (
                <div className="col-10 col-lg-6 offset-1 ">
                <div className="fields row">
                    {this.state.fieldsData.map((fieldData, index) => {
                        return <SingleField
                            fieldData={fieldData}
                            key={index}
                            selectingField={this.selectingField}
                        />;
                    })}
                </div>
            </div>
        )
    }
}

export { Fields }