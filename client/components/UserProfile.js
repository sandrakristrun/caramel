import React, {Component} from "react";
import { connect } from "react-redux";
import AllCities from "./AllCities";
import { Link } from "react-router-dom";
import { fetchSingleUser } from "../store/user";

/**
 * COMPONENT
 */
class UserProfile extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.id);
  }
  render() {
    const user = this.props.user;
    const cities = user.cities || [];
    return (
      <div className="user">
        <p>Username: {user.username}</p>
        <p>Favorite Cities:</p>
        {cities.map((city, index)=> {
          return(
          <div key={index}>{city.name}</div>
          )
        })}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUser: (userId) => dispatch(fetchSingleUser(userId))
    };
};

export default connect(mapState, mapDispatch)(UserProfile);
