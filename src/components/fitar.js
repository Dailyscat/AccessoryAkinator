import React, { Component } from "react";
import "./fitar.scss";
import { initApp } from "../apps/comedyGlasses/comedyGlasses";
export default class FitAr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitItOn: false
    };
  }

  componentDidMount() {
    initApp();
  }

  render() {
    return (
      <div className="FitAr">
        <div className="arBox">
          <canvas id="jeeFaceFilterCanvas"></canvas>
          <div width="300" height="300" id="jeelizFaceFilterFollow"></div>
        </div>
      </div>
    );
  }
}
