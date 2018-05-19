import React from "react";
import initialFieldsData from "../data/fieldsData";
import calculatePossibleFields from "../utilities/possibleFields";
import SingleField from "./SingleField";
import NextLevelModal from "./Modals/NextLevelModal";
import BustedLevelModal from "./Modals/BustedLevelModal";
import GameOverModal from "./Modals/GameOverModal";
import generateLevel from "../utilities/generatingLevel";
import setFields from "../utilities/setFieldsData";
import filterPossibleFields from "../utilities/filterPossibleFields";

class Fields extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isInitialClick: true,
            fieldsData: initialFieldsData,
            nextLevelModal: false,
            bustedLevelModal: false,
            gameOverModal: false,
        };

        this.closeNextLevelModal = this.closeNextLevelModal.bind(this);
        this.closeBustedLevelModal = this.closeBustedLevelModal.bind(this);
        this.closeGameOverModal = this.closeGameOverModal.bind(this);
    };

    componentDidMount() {

        const isInitial = localStorage.getItem("superAwesomeGameAppState");

        this.setState({
            fieldsData: initialFieldsData,
            isInitialClick: true,
        })

        if (isInitial !== null && !isInitial.setDefaultLevelModal) {
            this.setState({
                bustedLevelModal: true
            })
        }

    }

    resetFieldsData = () => {
        const fieldsData = this.state.fieldsData;
        fieldsData.forEach((field) => {
            field.status = "plain";
        })

        this.setState({
            fieldsData,
            isInitialClick: true
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
        this.props.startLevelTimer();
        this.props.toggleDefaultLevelButton();

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

                this.setState({
                    nextLevelModal: true
                })
                this.props.clearLevelTimer();
            }
        } else {
            this.props.setLives(this.props.data.lives - this.props.data.leftToClick);
        }
    }

    componentWillReceiveProps = (nextProps) => {

        if (nextProps.data.level > this.props.data.levelReached
            && nextProps.data.startLevel === this.props.data.startLevel) {
            this.props.setReachedLevel(nextProps.data.level);
        }
        if (nextProps.data.startLevel !== this.props.data.startLevel) {
            this.resetFieldsData();
        }
        if (nextProps.data.lives < 1) {
            this.setState({
                gameOverModal: true
            })
            this.props.clearLevelTimer();

        } else if (nextProps.data.lives < this.props.data.lives
            && nextProps.data.startLevel === this.props.data.startLevel) {
            this.setState({
                bustedLevelModal: true
            })
            this.props.clearLevelTimer();
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

    closeNextLevelModal = () => {
        this.props.setLives(this.props.data.lives + 1);
        this.props.setLevel(parseInt(this.props.data.level, 10) + 1);

        this.setState({
            nextLevelModal: false,
        })

        this.resetFieldsData();
        this.props.resetLevelTime();
        this.props.toggleDefaultLevelButton();
    }

    closeBustedLevelModal = () => {

        this.setState({
            bustedLevelModal: false,
        })

        this.resetFieldsData();
        this.props.resetLevelTime();
        this.props.toggleDefaultLevelButton();
    }

    closeGameOverModal = () => {

        this.setState({
            gameOverModal: false,
        })

        this.resetFieldsData();
        this.props.setLevel(parseInt(this.props.data.startLevel, 10));
        this.props.setLives(1);
        this.props.setReachedLevel(this.props.data.startLevel);
        this.props.resetLevelTime();
        this.props.toggleDefaultLevelButton();
    }

    render() {

        return (
            <div className="col-11 col-xl-6 offset-1 ">
                <NextLevelModal isVisible={this.state.nextLevelModal}
                    levelUp={this.props.levelUp}
                    closeNextLevelModal={this.closeNextLevelModal}
                />
                <BustedLevelModal isVisible={this.state.bustedLevelModal}
                    startLevel={this.props.data.startLevel}
                    levelReached={this.props.data.levelReached}
                    lives={this.props.data.lives}
                    startLevel={this.props.data.startLevel}
                    setLevel={this.props.setLevel}
                    closeBustedLevelModal={this.closeBustedLevelModal}
                />
                <GameOverModal isVisible={this.state.gameOverModal}
                    closeGameOverModal={this.closeGameOverModal} />
                <div className="fields row">
                    {this.isInitialClick()}
                </div>
            </div>
        )
    }
}

export default Fields;