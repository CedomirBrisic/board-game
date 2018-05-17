import React from "react";
import Modal from 'react-bootstrap4-modal';
import initialFieldsData from "../data/fieldsData";
import calculatePossibleFields from "../utilities/possibleFields";
import SingleField from "./SingleField";
import ModalNextLevel from "./Modals/ModalNextLevel";
import generateLevel from "../utilities/generatingLevel";
import setFields from "../utilities/setFieldsData";
import filterPossibleFields from "../utilities/filterPossibleFields";

class Fields extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isInitialClick: true,
            fieldsData: [],
            nextLevelModal: false,
        };
        
        this.closeNextLevelModal = this.closeNextLevelModal.bind(this);
    };

    componentDidMount() {
        this.setState({
            fieldsData: initialFieldsData
        })
    }

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

        const generatedFields = generateLevel(selectedFieldData, this.props.data.level);
        fieldsData = setFields(fieldsData, generatedFields);

        const possibleFields = calculatePossibleFields(selectedFieldData)
        fieldsData = filterPossibleFields(fieldsData, possibleFields)

        this.setState({
            fieldsData,
            isInitialClick: false,
        })
        this.props.setLeftToClick(this.props.data.leftToClick - 1)

    }

    notInitialClick = (event) => {
        const id = parseInt(event.target.getAttribute("data-id"), 10);
        const x = parseInt(event.target.getAttribute("data-x"), 10);
        const y = parseInt(event.target.getAttribute("data-y"), 10);
        const status = event.target.getAttribute("data-status");

        if (status === "possible-field") {

            const selectedFieldData = {
                "id": id,
                "x": x,
                "y": y,
                "status": "selected-field"
            };


            let fieldsData = this.state.fieldsData;
            fieldsData.forEach((field) => {
                if (field.status === "possible-field") {
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
            this.props.setLeftToClick(this.props.data.leftToClick - 1)

            if (this.props.data.leftToClick === 1) {
                this.props.setLevel(this.props.data.level + 1);

                this.setState({
                    nextLevelModal: true
                })
            }
        } else {
            this.props.setLives(this.props.data.lives - this.props.data.leftToClick);
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.level !== this.props.data.level) {
            this.props.setLevel(nextProps.data.level)
            this.props.setLeftToClick(nextProps.data.level + 1)
            this.props.setLives(nextProps.data.lives + 1)

            const fieldsData = this.state.fieldsData;
            fieldsData.forEach((field) => {
                field.status = "plain";
            })

            this.setState({
                fieldsData,
                isInitialClick: true
            })
        }
    }
    closeNextLevelModal = () =>{
        this.setState({
            nextLevelModal:false
        })
    }
    

    render() {
        return (
            <div className="col-10 col-lg-6 offset-1 ">
                <ModalNextLevel isVisible={this.state.nextLevelModal} 
                    levelUp={this.props.levelUp}
                    closeNextLevelModal={this.closeNextLevelModal}
                />
                <div className="fields row">
                    {this.isInitialClick()}
                </div>
            </div>
        )
    }
}

export default Fields;