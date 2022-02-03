import React from "react";
import { fetchCities } from "../store/cities";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class AllCities extends React.Component {
  componentDidMount() {
    this.props.getCities();
  }

  render() {
    return (
      <div>
        <div className="dropdown">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    Select City
  </a>

  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">

  {this.props.cities.map((city) => {
          return (
            <div>
              <li><a className="dropdown-item" href={`${city.id}`}>{city.name}, {city.state}</a></li>
            </div>
          );
        })}
  </ul>
</div>
        
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cities: state.cities,
  };
};

const mapDispatch = (dispatch) => ({
  getCities: () => dispatch(fetchCities()),
});

export default connect(mapState, mapDispatch)(AllCities);
