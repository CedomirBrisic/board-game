import React from "react";

class ChartData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartParameters: [],
      longestSingleClickTime: 0,
      chartData: []
    };
  }

  getChartData = () => {
    const chartData = [];

    if (
      this.state.chartParameters[0] !== undefined &&
      this.state.chartParameters.length > 1
    ) {
      const firstY1 = 0;
      const firstY2 =
        this.state.chartParameters[1].singleClickTime /
        this.state.longestSingleClickTime;
      const firstChartDataItem = {
        x1: this.state.chartParameters[1].x1,
        x2: this.state.chartParameters[1].x2,
        y1: firstY1,
        y2: firstY2
      };
      chartData.push(firstChartDataItem);
    }
    if (this.state.chartParameters.length > 1) {
      for (let i = 2; i < this.state.chartParameters.length; i++) {
        const y1 =
          this.state.chartParameters[i-1].singleClickTime /
          this.state.longestSingleClickTime;
        const y2 =
          this.state.chartParameters[i].singleClickTime /
          this.state.longestSingleClickTime;

        const chartDataItem = {
          x1: this.state.chartParameters[i].x1,
          x2: this.state.chartParameters[i].x2,
          y1: y1,
          y2: y2
        };
        chartData.push(chartDataItem);
    }
}

this.setState({
    chartData
});
};

UNSAFE_componentWillReceiveProps = nextProps => {
    console.log("this:",this.props.data, "next:",nextProps.data)
    const level = this.props.data.level;
    const i = nextProps.data.singleClickTime.length - 1;

    const longestSingleClickTime = nextProps.data.longestSingleClickTime;
    const singleClickTime = nextProps.data.singleClickTime[i];

    const coefficientX = 100 / level;

    const x1 = coefficientX * (level - this.props.data.leftToClick);
    const x2 = coefficientX * (level+1 - this.props.data.leftToClick);

    const clickData = {
      x1,
      x2,
      singleClickTime
    };

    if (
      this.props.data.leftToClick !== nextProps.data.leftToClick &&
      this.props.data.leftToClick !== this.props.data.level + 1) {
        
        const chartParameters = this.state.chartParameters;
        chartParameters.push(clickData);
        
        this.setState({
            chartParameters,
            longestSingleClickTime
        });
        this.getChartData();
    }
    
    if (this.props.data.isActiveDefaultLevelButton === false
    && nextProps.data.isActiveDefaultLevelButton === true){
        this.setState({
            chartParameters: [],
            longestSingleClickTime: 0,
            chartData: []
        })
    }
  };

  render() {
    return (
      <div className="card card-body w-100 h-100">
        <h6>Score chart</h6>
        <svg>{this.state.chartData.map((chartData, index)=>{
           return <line key={index} x1={`${chartData.x1}%`} y1={`${(1 - chartData.y1)*100}%`} x2={`${chartData.x2}%`} y2={`${(1-chartData.y2)*100}%`}/>
        })}</svg>
      </div>
    );
  }
}

export default ChartData;
