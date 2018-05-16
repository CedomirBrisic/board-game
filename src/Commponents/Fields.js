import React from "react";
// import { connect } from "react-redux";
// import fieldsAction from "../actions/fieldsAction";
import fieldsData from "../data/fieldsData";
import calculatePossibleFields from "../utilities/possibleFields";
import SingleField from "./SingleField";
import generateLevel from "../utilities/generatingLevel";
import setFieldsData from "../utilities/setFieldsData";

class Fields extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fieldsData: fieldsData,
            selectedFieldsData: [],
            possibleFieldsData: [],
            isInitialClick: true,
            numberOfClicks: 0
        };

        this.initialClick = this.initialClick.bind(this);

    };

    possibleFieldsCoordinates = (selectedFieldData) => {
        const fieldsData = this.state.fieldsData;
        const possibleFields = calculatePossibleFields(selectedFieldData)

        possibleFields.forEach((possibleField) => {

            fieldsData[possibleField.id - 1] = possibleField;

            this.setState({

                possibleFieldsData: possibleFields,

            })
        })
    }

   

    //Applies when field is clicked for the first time on each level
    initialClick = (event) => {

        const id = parseInt(event.target.getAttribute("data-id"),10);
        const x = parseInt(event.target.getAttribute("data-x"),10);
        const y = parseInt(event.target.getAttribute("data-y"),10);

        const selectedFieldData = {
            "id": id,
            "x": x,
            "y": y,
            "status": "selected-field"
        };

        const selectedFieldsData = this.state.selectedFieldsData;
        selectedFieldsData.push(selectedFieldData);

        let fieldsData = this.state.fieldsData;
        fieldsData[id - 1] = selectedFieldData;

        let numberOfClicks = this.state.numberOfClicks;
        numberOfClicks++;

        const generatedFields = generateLevel(selectedFieldData, this.props.level);
        fieldsData = setFieldsData(fieldsData, generatedFields)
        
        this.setState({
            fieldsData,
            selectedFieldsData,
            isInitialClick: false,
            numberOfClicks

        })
    }
    notInitialClick = () => {
        let numberOfClicks = this.state.numberOfClicks;
        numberOfClicks++;

        this.setState({
            numberOfClicks
        })
    };

    isInitialClick = () => {
        if (this.state.isInitialClick) {
            return this.state.fieldsData.map((fieldData, index) => {
                return <SingleField
                    fieldData={fieldData}
                    key={index}
                    click={this.initialClick}
                />;
            })
        } else {
            return this.state.fieldsData.map((fieldData, index) => {
                return <SingleField
                    fieldData={fieldData}
                    key={index}
                    click={this.notInitialClick}
                />;
            })
        }
    }

    render() {
        return (
            <div className="col-10 col-lg-6 offset-1 ">
                <div className="fields row">
                    {this.isInitialClick()}
                </div>
            </div>
        )
    }
}

export default Fields;