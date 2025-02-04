import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store/user";

class UserProfile extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.id);
  }
  render() {
    const user = this.props.user;
    const cities = user.cities || [];
    return (
      <div className="container user">
        <div className="row mt-3">
          <h2>
            {user.username}
            's Profile Page
          </h2>
          <p>
            <b>Username:</b> {user.username}
          </p>
          <p>
            <b>Current City:</b> {user.currentCity}
          </p>
          <p>
            <b>Interests:</b> {user.interests}
          </p>
          <p>
            <b>Favorite Cities:</b>
          </p>
          <div className="row">
          {cities.map((city, index) => {
            return (
              <div className="col mb-2 me-2 thumbnail-box" key={index}>
                <a href={`/cities/${city.id}`}><img className="city-image" src={city.imageUrlMobile} style={{height: "80px", padding: "5px"}}></img>{city.name}</a>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUser: (userId) => dispatch(fetchSingleUser(userId)),
  };
};

export default connect(mapState, mapDispatch)(UserProfile);
