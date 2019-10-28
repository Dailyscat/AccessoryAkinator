import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import tracking from "./tracking/tracking";
import faceData from "./tracking/data/face-min";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Home, FilterList } from "@material-ui/icons";
import Homes from "./components/homes.js";

export default function App() {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0
    }
  });
  tracking.ViolaJones.classifiers.face = faceData;
  const canvas = useRef(null);
  const classes = useStyles();
  const tracker = new tracking.ObjectTracker("face");
  useEffect(() => {
    const context = canvas.current.getContext("2d");
    context.save();
    const img = new Image();
    img.src = "./ar귀걸이.png";
    let filterX = 0;
    let filterY = 0;
    let filterWidth = 0;
    let filterHeight = 0;
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track("#video", tracker, { camera: true });

    tracker.on("track", event => {
      context.clearRect(0, 0, canvas.current.width, canvas.current.height);
      console.log(context);
      event.data.forEach(rect => {
        context.drawImage(
          img,
          rect.x + filterX * rect.width,
          rect.y + filterY * rect.height,
          rect.width * filterWidth,
          rect.height * filterHeight
        );
        img.src = "./ar귀걸이.png";
      });
    });
  });
  const [value, setValue] = React.useState(0);

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
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="FilterList" icon={<FilterList />} />
      </BottomNavigation>
      <div className="arBox">
        <video id="video" preload="i" autoPlay loop muted></video>
        <canvas id="canvas" ref={canvas}></canvas>
      </div>
    </div>
  );
}
