import React from "react";
// import { connect } from "react-redux";
// import fieldsAction from "../actions/fieldsAction";
import fieldsData from "../data/fieldsData";
import calculatePossibleFields from "../utilities/possibleFields";
import SingleField from "./SingleField";
import generateLevel from "../utilities/generatingLevel";
import setFields from "../utilities/setFieldsData";
import filterPossibleFields from "../utilities/filterPossibleFields";

class Fields extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isInitialClick: true,
            fieldsData: fieldsData,
        };
    };


    initialClick = (event) => {

        const id = parseInt(event.target.getAttribute("data-id"), 10);
        const x = parseInt(event.target.getAttribute("data-x"), 10);
        const y = parseInt(event.target.getAttribute("data-y"), 10);

        const selectedFieldData = {
            "id": id,
            "x": x,
            "y": y,
            "status": "selected-field"
        };

        let fieldsData = this.state.fieldsData;
        fieldsData[id - 1] = selectedFieldData;

        const generatedFields = generateLevel(selectedFieldData, this.props.level);
        fieldsData = setFields(fieldsData, generatedFields);

        const possibleFields = calculatePossibleFields(selectedFieldData)
        fieldsData = filterPossibleFields(fieldsData, possibleFields)

        this.setState({
            fieldsData,
            isInitialClick: false,
        })
    }

    notInitialClick = (event) => {
        const id = parseInt(event.target.getAttribute("data-id"), 10);
        const x = parseInt(event.target.getAttribute("data-x"), 10);
        const y = parseInt(event.target.getAttribute("data-y"), 10);
        const status = event.target.getAttribute("data-status");

        if (status==="possible-field"){
        
            const selectedFieldData = {
                "id": id,
                "x": x,
                "y": y,
                "status": "selected-field"
            };
            

            let fieldsData = this.state.fieldsData;
            fieldsData.forEach((field)=>{
                if (field.status === "possible-field"){
                    field.status = "generated-field";
                }
            })
            fieldsData[id - 1] = selectedFieldData;
            
            const possibleFields = calculatePossibleFields(selectedFieldData)
            fieldsData = filterPossibleFields(fieldsData, possibleFields)
            
            this.setState({
                fieldsData,
                isInitialClick: false,
            })
        } else {
            alert("BUSTED!!!")
        }
    }
        
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
console.log(this.state.fieldsData)
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