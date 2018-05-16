import React from "react";

const AdvancedStats = () => {


    return (
        <div className="col-6 col-lg-4 offset-3 offset-lg-0">

            <button className="btn w-100 btn-primary mt-5" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Advanced Stats
  </button>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <h5> Top Score </h5>
                </div>
                <div className="card card-body">
                    <h5> Score Data </h5>
                </div>
            </div>
        </div>
    )
}

export default AdvancedStats;