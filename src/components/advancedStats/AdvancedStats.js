import React from "react";

// import ChartData from "./ChartData";

const AdvancedStats = (props) => {


    return (
        <div className="col-10 col-xl-4 offset-1 offset-xl-0">

            <button className="btn w-100 btn-info mt-5" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Advanced Stats
            </button>
            <div className="collapse w-100" id="collapseExample">

                {/* <ChartData data={props.data}/> */}

                <div className="card top-score card-body">
                    <h6> Top Score coming soon... </h6>
                </div>
            </div>
        </div>
    )
}

export default AdvancedStats;