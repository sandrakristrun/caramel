import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthForm";
import Home from "./components/Home";
import AllCities from "./components/AllCities";
import SingleCity from "./components/SingleCity";
import UserPrefForm from "./components/UserPrefForm";
import { me } from "./store";
import CompareView from "./components/CompareView";
import UserProfile from "./components/UserProfile";
import Main from './components/Chat/ChatPage'
import DummyComponent from './components/Chat/DummyComponent'
import FindUsers from "./components/FindUsers"
import SignUpForm from "./components/SignUpForm"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/compare" component={CompareView} />
            <Route exact path="/myInfo" component={UserProfile} />
            <Route exact path='/findUsers' component={ FindUsers } />
            <Route exact path="/cities/:cityId" component={SingleCity} />
            <Route exact path = "/channels/:channelId" component = {Main} />
            <Route exact path="/preferences" component={UserPrefForm} />
          </Switch>
        ) : (
          <Switch>

            <Route exact path='/' component={ Home } />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/preferences" component={UserPrefForm} />
            <Route exact path="/compare" component={CompareView} />
            <Route exact path="/cities/:cityId" component={SingleCity} />
            {/* <Route exact path = "/channels/:channelId" component = {DummyComponent} /> */}
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {

    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
