import React, { Component, useRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { initApp } from "./comedy-glasses/demo_comedyGlasses";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Home, FilterList } from "@material-ui/icons";
import Homes from "./components/homes.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
  }
  // useEffect(() => {
  //   const context = canvas.current.getContext("2d");
  //   context.save();
  //   const img = new Image();
  //   img.src = "./ar귀걸이.png";
  //   let filterX = 0;
  //   let filterY = 0;
  //   let filterWidth = 0;
  //   let filterHeight = 0;
  // });
  // const [value, setValue] = React.useState(0);

  componentDidMount() {
    initApp();
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div>Earring Akinator</div>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Homes />
            </Route>
          </Switch>
        </Router>
        <BottomNavigation
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
          showLabels
          className="bottomBtnBox"
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="FilterList" icon={<FilterList />} />
        </BottomNavigation>
        <div className="arBox">
          <video id="video" preload="i" autoPlay loop muted></video>
          <canvas id="canvas" ref={this.canvasRef}></canvas>
        </div>
      </div>
    );
  }
}
