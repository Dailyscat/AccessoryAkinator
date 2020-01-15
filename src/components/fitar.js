import React, { useEffect } from "react";
import "./fitar.scss";
import {
  shutdownVideo,
  videoSetting
} from "../apps/comedyGlasses/comedyGlasses";

export default function FitAr(props) {
  useEffect(() => {
    //didmount
    videoSetting();
  }, []);

  useEffect(() => {
    //unmount
    return () => {
      shutdownVideo();
    };
  }, []);

  return (
    <div className="FitAr">
      <div className="arBox">
        <canvas id="jeeFaceFilterCanvas"></canvas>
        <div
          width="300"
          height="300"
          id="jeelizFaceFilterFollow"
          style={{
            backgroundImage: `url(${props.location.state.earringImage})`
          }}
        ></div>
      </div>
    </div>
  );
}
