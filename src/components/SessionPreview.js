import React, { useState } from "react";
import { Button } from "react95";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const SessionPreview = ({ session, deleteSession }) => {
  const [sliderVal, setSliderVal] = useState(0);
  // debugger;
  return (
    <div
      style={{
        display: "flex",
        marginBottom: 50,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Slider
        min={0}
        max={session.data.length - 1}
        value={sliderVal}
        onChangeStart={() => console.log("starting slider")}
        onChange={setSliderVal}
        onChangeComplete={() => console.log("ending slider")}
      />
      <div style={{ display: "flex", marginBottom: 20 }}>
        <img src={session.data[sliderVal].base64} />
        <div
          style={{
            position: "relative",
            marginLeft: 20,
            height: 200,
            width: 200,
            backgroundColor: "teal",
            overflow: "hidden",
          }}
        >
          <div
            className="target"
            style={{
              position: "absolute",
              height: 10,
              width: 10,
              borderWidth: 2,
              top: `${session.data[sliderVal].label.top}%`,
              left: `${session.data[sliderVal].label.left}%`,
            }}
          ></div>
        </div>
      </div>
      <Button onClick={deleteSession}>delete session</Button>
    </div>
  );
};

export default SessionPreview;
