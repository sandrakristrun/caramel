import React, { Component } from "react";
import { connect } from "react-redux";
import { getCityByName } from "../store/singleCity";
import Transportation_Chart from "./Charts/Transportation_Chart";
import GaugeChart from "react-gauge-chart";
import "chart.js/auto";
import Healthcare_Chart from "./Charts/Healthcare_Chart";

/**
 * COMPONENT
 */
class CompareCity extends Component {
  render() {
    console.log(this.props);
    const city = this.props.city || {};
    const transportation = city.transportation || {};

    return (
      <div className="container text-center">
        <div className="row justify-content-center compare-city-name mb-2">
          <h3>{city.name}</h3>
        </div>

        <div className="row justify-content-center mb-2">
          <img className="city-image" src={city.imageUrlMobile}></img>
        </div>

        <div className="row justify-content-center compare-city-content mb-2">
          <h3>The Essentials</h3>
          <p>
            <b>1-BR apartment:</b> ${city.primaryStat.rent1br}/month
          </p>
          <p>
            <b>3-BR apartment:</b> ${city.primaryStat.rent3br}/month
          </p>
          <p>
            <b>Salary:</b> ${city.primaryStat.salary}/month
          </p>
          <p>
            <b>Preschool:</b> ${city.livingCost.daycare}/month
          </p>
        </div>

        <div className="row justify-content-center compare-city-content mb-2">
          <h3>Healthcare</h3>
          <GaugeChart
            id="healthIndex"
            arcsLength={[0.33, 0.33, 0.33]}
            colors={["red", "yellow", "green"]}
            percent={city.healthcare.index / 100}
            arcPadding={0.02}
            textColor="#000000"
            needleColor={"#BFB0BF"}
            needleBaseColor={"#BFB0BF"}
            style={{ width: "200px" }}
          />
          <h6>Overall Healthcare Rating</h6>
        </div>

        <div className="row justify-content-center compare-city-content mb-2">
          <h3>Environment</h3>
          <GaugeChart
            id="healthIndex"
            arcsLength={[0.33, 0.33, 0.33]}
            colors={["green", "yellow", "red"]}
            percent={city.pollution.indexPollution / 100}
            arcPadding={0.02}
            textColor="#000000"
            needleColor={"#BFB0BF"}
            needleBaseColor={"#BFB0BF"}
            style={{ width: "200px" }}
          />
          <h6>Overall Pollution Level</h6>
        </div>

        <div className="row justify-content-center compare-city-content mb-2">
          <h3>Transportation</h3>
          <Transportation_Chart transportation={transportation} />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    singleCity: state.singleCity,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCity: (cityId) => dispatch(getCityByName(cityId)),
  };
};

export default connect(mapState, mapDispatch)(CompareCity);
