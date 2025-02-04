import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCity } from "../store/singleCity";
import { getCityWeather } from "../store/weather";
import Transportation_Chart from "./Charts/Transportation_Chart";
import Healthcare_Chart from "./Charts/Healthcare_Chart";
import Pollution_Chart from "./Charts/Pollution_Chart";
import Weather_Chart from "./Charts/Weather_Chart";
import SingleMap from "./Map.js";
import Map from "./Map.js";
import Footer from "./Footer";
import { favoriteCity, fetchSingleUser, updateUser } from "../store/user";

class SingleCity extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.loadCity(this.props.match.params.cityId);
    this.props.getCityWeather(this.props.match.params.cityId);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.id != this.props.id) {
  //     this.props.loadUser(this.props.id);
  //   }
  // }

  onClick() {
    this.props.favorite(this.props.singleCity.id, this.props.id);
  }

  render() {
    const city = this.props.singleCity || 0;
    const healthcare = city.healthcare || {};
    const livingCost = city.livingCost || {};
    const primaryStat = city.primaryStat || {};
    const transportation = city.transportation || {};
    const pollution = city.pollution || {};
    const weather = this.props.cityWeather || {};
    const location = { lat: city.lat, lng: city.lng, name: city.name };
    const id = this.props.id;
    const { isLoggedIn } = this.props;
    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center mb-2">
          <img className="city-image" src={city.imageUrlWeb}></img>
        </div>
        <div className="row justify-content-center mb-2">
          <h1>{city.name}</h1>
          {isLoggedIn && (
            <div>
              <button
                className="btn btn-primary btn-sm"
                style={{ background: "#b398bd", border: "none" }}
                value={id}
                onClick={() => this.onClick(id)}
              >
                {" "}
                Favorite City
              </button>
            </div>
          )}
        </div>

        <div className="row mb-5">
          <div className="col-sm-12 col-md-4 offset-md-2">
            <Map location={location} zoomLevel={12} />
          </div>
          <div className="col-sm-11 offset-sm-1 col-md-4 offset-md-0">
            <p>{city.info}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 offset-md-2 col-sm-12">
            <div className="row section-title">
              <h3>The Essentials</h3>
            </div>

            <div className="row category-section mb-4 align-items-center">
              <div className="col-6">
                <div className="row align-items-center mt-3 mb-4">
                  <div className="col-1"></div>
                  <div className="col-4">
                    <img
                      src="https://symbols.getvecta.com/stencil_310/89_urban-apartment-building-4.e12cb28877.svg"
                      width={80}
                    ></img>
                  </div>
                  <div className="col-6">
                    <b>Monthly rent</b>
                    <br />
                    1-BR apartment: ${primaryStat.rent1br}
                    <br />
                    3-BR apartment: ${primaryStat.rent3br}
                  </div>
                  <div className="col-1"></div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-1"></div>
                  <div className="col-4">
                    <img
                      src="https://symbols.getvecta.com/stencil_206/6_house-with-garden.e638cef266.svg"
                      width={80}
                    ></img>
                  </div>
                  <div className="col-6">
                    <b>
                      Property cost/m<sup>2</sup>:
                    </b>{" "}
                    ${primaryStat.housePrice}
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>

              <div className="col-6">
                <div className="row align-items-center mb-3">
                  <div className="col-1"></div>
                  <div className="col-4">
                    <img
                      src="https://symbols.getvecta.com/stencil_153/5_dollar-banknote.6a24ecdaa3.svg"
                      width={80}
                    ></img>
                  </div>
                  <div className="col-6">
                    <b>Monthly salary:</b> ${primaryStat.salary}
                  </div>
                  <div className="col-1"></div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-1"></div>
                  <div className="col-4">
                    <img
                      src="https://symbols.getvecta.com/stencil_145/12_books.1cac5978ec.svg"
                      width={80}
                    ></img>
                  </div>
                  <div className="col-6">
                    <b>Preschool cost/month:</b> ${livingCost.daycare}
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
              <small>* Based on average prices</small>
            </div>

            <div className="row section-title">
              <h3>Living Costs</h3>
            </div>

            <div className="row category-section mb-4">
              <div className="col">
                <div className="row mt-3">
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_138/5_beer-mug.b7deff5fc5.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Beer:</b> ${livingCost.beer}
                    </p>
                  </div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_138/16_hot-beverage.8d4e2e75f3.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Cappuccino:</b> ${livingCost.cappuccino}
                    </p>
                  </div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_137/1_fork-and-knife-with-plate.f63c85bbc0.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Restaurant Meal for 2:</b> ${livingCost.meal}
                    </p>
                  </div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_149/2_clapper-board.bcf1b466de.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Movie Ticket:</b> ${livingCost.movie}
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_142/18_egg.3ec573c0f6.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Eggs (dozen):</b> ${livingCost.eggs}
                    </p>
                  </div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_306/22_dairy-milk.d291c83622.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Milk:</b> ${livingCost.milk}
                    </p>
                  </div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_142/14_baguette-bread.77fbdca9a6.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Bread:</b> ${livingCost.bread}
                    </p>
                  </div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_163/16_flexed-biceps.ebaa7e92f1.svg"
                      height={60}
                    ></img>
                    <p>
                      <b>Gym Membership:</b> ${livingCost.gym}
                    </p>
                  </div>
                </div>
              </div>
              <small>* Based on average prices</small>
            </div>

            <div className="row section-title">
              <h3>Weather</h3>
            </div>

            <div className="row category-section mb-4 align-items-center">
              <div className="col">
                <div>
                  <Weather_Chart weather={weather} />
                </div>
              </div>
            </div>

            <div className="row section-title">
              <h3 style={{ display: "inline" }}>Environment</h3>
            </div>

            <div className="row category-section mb-4 align-items-center">
              <div className="col">
                <div className="row mt-3 mb-3 align-items-center">
                  <Pollution_Chart pollution={pollution} />
                </div>
              </div>
            </div>

            <div className="row section-title">
              <h3>Healthcare</h3>
            </div>

            <div className="row category-section mb-4">
              <div className="col">
                <div className="row mt-3 mb-3">
                  <Healthcare_Chart healthcare={healthcare} />
                </div>
              </div>
            </div>

            <div className="row section-title">
              <h3>Transportation</h3>
            </div>

            <div className="row category-section mb-4">
              <div className="col-6">
                <div className="row align-items-center mt-3 mb-4">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_322/27_retail-gasoline-pump.bcb4f8cba2.svg"
                      width={70}
                    ></img>
                  </div>
                  <div className="col-5">
                    <b>Gas / liter:</b> ${livingCost.gas}
                  </div>
                  <div className="col-2"></div>
                </div>

                <div className="row align-items-center mt-3">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_214/6_train.17e6eac4cf.svg"
                      width={70}
                    ></img>
                  </div>
                  <div className="col-5">
                    <b>Monthly train pass:</b> ${livingCost.trainPass}
                  </div>
                  <div className="col-2"></div>
                </div>

                <div className="row align-items-center mt-3">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <img
                      src="https://symbols.getvecta.com/stencil_153/3_credit-card.75f9da130c.svg"
                      width={70}
                    ></img>
                  </div>
                  <div className="col-5">
                    <b>Train ticket (1-way):</b> ${livingCost.trainTicket}
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-5">
                <b>Primary Means of Transportation:</b>
                <Transportation_Chart transportation={transportation} />
              </div>
              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <button
          className="btn btn-primary btn-sm"
          data-sharer="facebook"
          data-hashtag="hashtag"
          data-url={`https://urban-analysis.herokuapp.com/cities/${city.id}`}
          style={{ background: "#b398bd", border: "none", margin: "5px" }}
        >
          Share on Facebook
        </button>
        <button
          className="btn btn-primary btn-sm"
          data-sharer="twitter"
          data-hashtag="hashtag"
          data-url={`https://urban-analysis.herokuapp.com/cities/${city.id}`}
          style={{ background: "#b398bd", border: "none", margin: "5px" }}
        >
          Share on Twitter
        </button>
        <div className="d-grid gap-2 compare-btn">
          <Link className="btn" role="button" aria-current="page" to="/compare">
            <button
              className="btn btn-success"
              style={{ background: "#6610f2", border: "none" }}
            >
              COMPARE CITIES
            </button>
          </Link>
        </div>
      </div>
    );
  }
}



const mapState = (state) => {
  return {
    singleCity: state.singleCity,
    isLoggedIn: !!state.auth.id,
    id: state.auth.id,
    user: state.user,
    cityWeather: state.weather,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCity: (cityId) => dispatch(getCity(cityId)),
    loadUser: (id) => dispatch(fetchSingleUser(id)),
    updateUser: (cityName, id) => dispatch(updateUser(cityName, id)),
    getCityWeather: (cityId) => dispatch(getCityWeather(cityId)),
    favorite: (cityId, userId) => dispatch(favoriteCity(cityId, userId)),
  };
};

export default connect(mapState, mapDispatch)(SingleCity);
