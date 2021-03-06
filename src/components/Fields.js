import React from "react";
import { connect } from "react-redux";
import { setInitialClick, setLeftToClick } from "../actions/clickActions";
import { setNextLevelModal, setBustedLevelModal, setGameOverModal } from "../actions/modalActions";
import { setFieldsData } from "../actions/fieldsActions";
import { setLevel, setLevelReached } from "../actions/levelActions";
import { setLives } from "../actions/liveActions";
import initialFieldsData from "../data/fieldsData";
import calculatePossibleFields from "../utilities/possibleFields";
import SingleField from "./SingleField";
import NextLevelModal from "./modals/NextLevelModal";
import BustedLevelModal from "./modals/BustedLevelModal";
import GameOverModal from "./modals/GameOverModal";
import generateLevel from "../utilities/generatingLevel";
import setFields from "../utilities/setFieldsData";
import filterPossibleFields from "../utilities/filterPossibleFields";

/**
 * main component
 * @class Fields
 * @extends {React.Component}
 */
class Fields extends React.Component {
  constructor(props) {
    super(props);

    this.closeNextLevelModal = this.closeNextLevelModal.bind(this);
    this.closeBustedLevelModal = this.closeBustedLevelModal.bind(this);
    this.closeGameOverModal = this.closeGameOverModal.bind(this);
  }
  /**
     * anonymous side effect method, it sets initial-fields-data
     * @memberof Fields
     */
  resetFieldsData = () => {
    const fieldsData = this.props.fields.fieldsData;
    fieldsData.forEach(field => {
      field.status = "plain";
    });
    this.props.setInitialClick(true);
    this.props.setFieldsData(fieldsData);

  };
  /**
   * side effect method, it sets start level
   * @memberof Fields
   * @param {object} event - from <SingleField />, it picks up value that represents clicked-field
   */
  initialClick = event => {
    const id = parseInt(event.target.getAttribute("data-id"), 10);
    const x = parseInt(event.target.getAttribute("data-x"), 10);
    const y = parseInt(event.target.getAttribute("data-y"), 10);

    const selectedFieldData = {
      id: id,
      x: x,
      y: y,
      status: "selected-field"
    };

    let fieldsData = this.props.fields.fieldsData;
    fieldsData[id - 1] = selectedFieldData;

    const generatedFields = generateLevel(
      selectedFieldData,
      this.props.level.level
    );
    fieldsData = setFields(fieldsData, generatedFields);

    const possibleFields = calculatePossibleFields(selectedFieldData);
    fieldsData = filterPossibleFields(fieldsData, possibleFields);

    this.props.setInitialClick(false);
    this.props.setFieldsData(fieldsData);
    this.props.setLeftToClick(this.props.click.leftToClick - 1);
    this.props.startLevelTimer();
    this.props.toggleDefaultLevelButton();
  };
  /**
     * side effect method, it calculates how successful player selected field to click and regarding that it sets all necessary data,
     * also it opens <NextLevelModal />, <BustedLevelModal /> or <GameOverModal /> if needed
     * @memberof Fields
     * @param {object} event - from <SingleField />, it picks up value that represents clicked-field
     */
  notInitialClick = event => {
    const id = parseInt(event.target.getAttribute("data-id"), 10);
    const x = parseInt(event.target.getAttribute("data-x"), 10);
    const y = parseInt(event.target.getAttribute("data-y"), 10);
    const status = event.target.getAttribute("data-status");

    if (status === "possible-field") {
      const selectedFieldData = {
        id: id,
        x: x,
        y: y,
        status: "selected-field"
      };

      let fieldsData = this.props.fields.fieldsData;
      fieldsData.forEach(field => {
        if (field.status === "possible-field") {
          field.status = "generated-field";
        }
      });

      fieldsData[id - 1] = selectedFieldData;

      const possibleFields = calculatePossibleFields(selectedFieldData);
      fieldsData = filterPossibleFields(fieldsData, possibleFields);

      this.props.setInitialClick(false);
      this.props.setFieldsData(fieldsData);


      this.props.setLeftToClick(this.props.click.leftToClick - 1);

      if (this.props.click.leftToClick === 1) {
        this.props.setNextLevelModal(true);

        this.props.setLives(this.props.lives.lives + 1);
        this.props.setLevel(parseInt(this.props.level.level, 10) + 1);
        this.props.setLeftToClick(parseInt(this.props.level.level, 10) + 2);
        this.props.clearLevelTimer();
        this.props.resetLevelTime();
      }
    } else if (this.props.lives.lives - this.props.click.leftToClick < 1) {
      this.props.setLevelReached(this.props.level.startLevel);
      this.props.setLevel(parseInt(this.props.level.startLevel, 10));
      this.props.setLeftToClick(parseInt(this.props.level.startLevel, 10) + 1);
      this.props.setLives(1);
      this.props.clearLevelTimer();
      this.props.resetLevelTime();
      this.props.setGameOverModal(true);
      this.resetFieldsData();

    } else {
      this.props.setLives(this.props.lives.lives - this.props.click.leftToClick);
      this.props.clearLevelTimer();
      this.props.resetLevelTime();
    }
  };

  /**
   * anonymous method, it sets fields with appropriate function (initialClick/notInitialClick)
   * @memberof Fields
   * @returns <SingleField />'s
   */
  isInitialClick = () => {
    if (this.props.click.isInitialClick) {
      return this.props.fields.fieldsData.map((fieldData, index) => {
        return (
          <SingleField
            fieldData={fieldData}
            key={index}
            click={this.initialClick}
          />
        );
      });
    } else {
      return this.props.fields.fieldsData.map((fieldData, index) => {
        return (
          <SingleField
            fieldData={fieldData}
            key={index}
            click={this.notInitialClick}
          />
        );
      });
    }
  };

  /**
   * anonymous side effect method, it closes  <NextLevelModal /> and resets level-fields-data
   * @memberof Fields
   */
  closeNextLevelModal = () => {
    this.props.setNextLevelModal(false);
    this.props.toggleDefaultLevelButton();
    this.resetFieldsData();
  };

  /**
   * anonymous side effect method, it closes  <BustedLevelModal /> and resets level-fields-data
   * @memberof Fields
   */
  closeBustedLevelModal = () => {
    this.props.setBustedLevelModal(false);
    this.props.toggleDefaultLevelButton();
    this.resetFieldsData();
  };

  /**
   * anonymous side effect method, it closes  <GameOverModal /> and resets level-fields-data
   * @memberof Fields
   */
  closeGameOverModal = () => {
    this.props.setGameOverModal(false);
    this.props.toggleDefaultLevelButton();
    this.resetFieldsData();
  };

  /**
   * React lifecycle method - sets initial level-data
   * @memberof Fields
   */
  componentDidMount = () => {
    let isInitial = JSON.parse(
      localStorage.getItem("superAwesomeGameAppState")
    );

    this.props.setInitialClick(true);
    this.props.setFieldsData(initialFieldsData);

    if (isInitial !== null) {
      this.props.setBustedLevelModal(true);
    }
  };

  /**
   * React lifecycle method - it calculates how successful player selected field to click and regarding that it sets all necessary data,
   * also it opens <BustedLevelModal /> or <GameOverModal /> if needed
   * @memberof Fields
   * @param {object} nextProps
   */
  componentWillReceiveProps = nextProps => {
    let possibleFieldsCount = 0;

    if (
      nextProps.level.level > this.props.level.levelReached &&
      nextProps.level.startLevel === this.props.level.startLevel
    ) {
      this.props.setLevelReached(nextProps.level.level);
    }

    if (nextProps.level.startLevel !== this.props.level.startLevel) {
      this.resetFieldsData();
    }

    if (
      nextProps.lives.lives < this.props.lives.lives &&
      nextProps.level.startLevel === this.props.level.startLevel &&
      nextProps.click.leftToClick === this.props.click.leftToClick
    ) {
      this.props.setBustedLevelModal(true);
      this.props.clearLevelTimer();
      this.props.resetLevelTime();
    }

    this.props.fields.fieldsData.forEach(field => {
      if (field.status === "possible-field") {
        possibleFieldsCount++;
      }
    });

    if (
      possibleFieldsCount === 0 &&
      !this.props.click.isInitialClick &&
      nextProps.click.leftToClick < this.props.click.leftToClick &&
      this.props.click.leftToClick > 0
    ) {
      if (this.props.lives.lives - nextProps.click.leftToClick < 1) {
        this.props.setGameOverModal(true);

        this.props.setLevelReached(this.props.level.startLevel);
        this.props.setLevel(parseInt(this.props.level.startLevel, 10));
        this.props.setLeftToClick(parseInt(this.props.level.startLevel, 10) + 1);
        this.props.setLives(1);
        this.props.clearLevelTimer();
        this.props.resetLevelTime();
      } else if (nextProps.lives.lives - nextProps.click.leftToClick > 0) {
        nextProps.setLives(this.props.lives.lives - nextProps.click.leftToClick);
      }
    }
  };

  /**
    * React lifecycle method - it renders defualt-level-button <SingleFields /> and <NextLevelModal /> or <BustedLevelModal /> or <GameOverModal />
    * @memberof Fields
    */
  render() {

    return (
      <div className="col-11 col-xl-6 offset-1 ">
        <NextLevelModal
          isVisible={this.props.modals.nextLevelModal}
          levelUp={this.props.levelUp}
          closeNextLevelModal={this.closeNextLevelModal}
        />
        <BustedLevelModal
          isVisible={this.props.modals.bustedLevelModal}
          startLevel={this.props.level.startLevel}
          levelReached={this.props.level.levelReached}
          setLevel={this.props.setLevel}
          setLeftToClick={this.props.setLeftToClick}
          closeBustedLevelModal={this.closeBustedLevelModal}
        />
        <GameOverModal
          isVisible={this.props.modals.gameOverModal}
          closeGameOverModal={this.closeGameOverModal}
        />

        <div className="fields row">{this.isInitialClick()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    click: state.click,
    modals: state.modals,
    fields: state.fields,
    level: state.level,
    lives: state.lives,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setInitialClick: (value) => {
      dispatch(setInitialClick(value));
    },
    setNextLevelModal: (value) => {
      dispatch(setNextLevelModal(value));
    },
    setBustedLevelModal: (value) => {
      dispatch(setBustedLevelModal(value));
    },
    setGameOverModal: (value) => {
      dispatch(setGameOverModal(value));
    },
    setFieldsData: (value) => {
      dispatch(setFieldsData(value));
    },
    setLeftToClick: (value) => {
      dispatch(setLeftToClick(value));
    },
    setLevel: (value) => {
      dispatch(setLevel(value));
    },
    setLevelReached: (value) => {
      dispatch(setLevelReached(value));
    },
    setLives: (value) => {
      dispatch(setLives(value));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Fields)
