import React from "react";
import GaugeChart from "react-gauge-chart";
import "chart.js/auto";



const Healthcare_Chart = (props) => {
  const { skill, cost, index } = props.healthcare;
  const skillPercent = skill / 100;
  const costPercent = cost / 100;
  const indexPercent = index / 100;

  return (
    <div key="pie-chart" className="container">
      <div className="row align-items-center">
        <div className="col-1"></div>
        <div className="col-3">
          <GaugeChart
            percent={skillPercent}
            id="healthSkill"
            //arcsLength={[0.33, 0.33, 0.33]}
            colors={["red", "yellow", "green"]}
            nrOfLevels={30}
            arcWidth = {0.3}
            arcPadding={0.02}
            // arcPadding={0.05}
            textColor="#000000"
            // animate={true}
            animDelay={500}
            animateDuration={5000}
            needleColor={"#BFB0BF"}
            needleBaseColor={"#BFB0BF"}
          />
          Skill Rating
        </div>

        <div className="col-4">
          <GaugeChart
            id="healthIndex"
            //arcsLength={[0.33, 0.33, 0.33]}
            nrOfLevels={30}
            arcWidth = {0.3}
            arcPadding={0.02}
            colors={["red", "yellow", "green"]}
            percent={indexPercent}
            animDelay={500}
            animateDuration={5000}
            //arcPadding={0.02}
            textColor="#000000"
            needleColor={"#BFB0BF"}
            needleBaseColor={"#BFB0BF"}
          />
          <div>
            <h6 style={{ display: "inline" }}>Overall Healthcare Rating</h6>{" "}
            <a
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="About Overall Healthcare Rating: This figure is an estimation of the overall quality of the city's health care system, health care professionals, equipment, staff, doctors, cost, etc., based on surveys from visitors to the website Numbeo.com, a cost of living database."
            >
              <sup>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "inline" }}
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </sup>
            </a>
          </div>
        </div>

        <div className="col-3">
          <GaugeChart
            id="healthCost"
            // arcsLength={[0.33, 0.33, 0.33]}
            colors={["red", "yellow", "green"]}
            nrOfLevels={30}
            arcWidth = {0.3}
            arcPadding={0.02}
            percent={indexPercent}
            animDelay={500}
            animateDuration={5000}
            percent={costPercent}
            //arcPadding={0.02}
            textColor="#000000"
            needleColor={"#BFB0BF"}
            needleBaseColor={"#BFB0BF"}
          />
          Cost Rating
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
};

export default Healthcare_Chart;

