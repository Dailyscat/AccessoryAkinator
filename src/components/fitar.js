import React, { Component } from "react";
import "./fitar.scss";
import {
  shutdownVideo,
  videoSetting
} from "../apps/comedyGlasses/comedyGlasses";
export default class FitAr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitItOn: false
    };
  }

  componentDidMount() {
    videoSetting();
  }

  componentWillUnmount() {
    shutdownVideo();
  }

  render() {
    return (
      <div className="FitAr">
        <div className="arBox">
          <canvas id="jeeFaceFilterCanvas"></canvas>
          <div
            width="300"
            height="300"
            id="jeelizFaceFilterFollow"
            style={{
              backgroundImage: `url(${this.props.location.state.earringImage})`
            }}
          ></div>
        </div>
      </div>
    );
  }
}
