import React, { Component, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Home, FilterList } from "@material-ui/icons";
import Homes from "./components/homes.js";
import FitAr from "./components/fitar.js";
import Filtered from "./components/filtered.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitItOn: false,
      bottomNavState: 0
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // initApp();
  }

  fitIt = () => {
    this.setState({
      fitItOn: !this.state.fitItOn
    });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <div>Earring Akinator</div>
        </div>
        <Route
          exact
          path="/"
          render={() => <Homes {...this.props} fitIt={this.fitIt} />}
        />
        <Route
          path="/filtered"
          {...this.props}
          render={() => <Filtered {...this.props} fitIt={this.fitIt} />}
        />
        <Route path="/fitAR" render={() => <FitAr {...this.props} />} />
        <BottomNavigation
          value={this.state.bottomNavState}
          onChange={(event, newValue) => {
            this.setState({
              bottomNavState: newValue
            });
          }}
          showLabels
          className="bottomBtnBox"
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            onClick={() => {
              this.props.history.push("/");
            }}
          />
          <BottomNavigationAction
            label="FilterList"
            icon={<FilterList />}
            onClick={() => {
              this.props.history.push("/filtered");
            }}
          />
        </BottomNavigation>
        {/* {this.state.fitItOn ? (
          <div className="arBox">
            <canvas id="jeeFaceFilterCanvas"></canvas>
            <div width="300" height="300" id="jeelizFaceFilterFollow"></div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}

export default withRouter(App);
