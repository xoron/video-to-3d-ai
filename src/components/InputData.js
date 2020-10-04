import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  reset,
  themes,
  List,
  ListItem,
  Divider,
  AppBar,
  Toolbar,
  Cutout,
  TextField,
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import Counter from "./Counter";
import {
  addToCurrentData,
  addCurrentDataToSessions,
  resetCurrentData,
} from "../redux/input-data/actions";

const InputData = ({
  sampleCount,
  addToCurrentData,
  addCurrentDataToSessions,
  resetCurrentData,
}) => {
  const videoRef = useRef(null);
  const targetRef = useRef(null);
  let movementInterval = null;
  const [isRecording, setIsRecording] = useState(false);

  const createLabeledFeature = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // const index = (y*imageData.width + x) * 4;
    // const red = imageData.data[index];
    // const green = imageData.data[index + 1];
    // const blue = imageData.data[index + 2];
    // const alpha = imageData.data[index + 3];
    // debugger;

    const base64 = canvas.toDataURL("image/webp");
    const label = {
      top: parseInt(targetRef.current.style.top),
      left: parseInt(targetRef.current.style.left),
    };

    const featureMatrix = [];
    imageData.data.forEach((val) => featureMatrix.push(val));

    debugger;
    return {
      base64,
      // feature: featureMatrix, // JSON.stringify(featureMatrix),
      label,
    };
  };

  useEffect(() => {
    if (!!videoRef) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment", height: 200, width: 200 },
        })
        .then(function (stream) {
          /* use the stream */
          console.log("stream:", stream);
          videoRef.current.srcObject = stream;
        })
        .catch(function (error) {
          /* handle the error */
          console.log("error:", error);
        });
    }
  }, [videoRef]);

  useEffect(() => {
    if (!!isRecording) {
      movementInterval = setInterval(() => {
        addToCurrentData(createLabeledFeature());
        targetRef.current.style.top = `${Math.floor(Math.random() * 100)}%`;
        targetRef.current.style.left = `${Math.floor(Math.random() * 100)}%`;
      }, 1000);
    } else {
      clearInterval(movementInterval);
    }
    return () => clearInterval(movementInterval);
  }, [isRecording]);

  return (
    <Window style={{ width: "100%", flex: 2 }}>
      <WindowHeader
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>InputData.exe</span>
        <Button
          style={{ marginRight: "-6px", marginTop: "1px" }}
          size={"sm"}
          square
        >
          <span style={{ fontWeight: "bold", transform: "translateY(-1px)" }}>
            x
          </span>
        </Button>
      </WindowHeader>
      <Toolbar>
        <Button variant="menu" size="sm">
          File
        </Button>
        <Button variant="menu" size="sm">
          Edit
        </Button>
        <Button variant="menu" size="sm" disabled>
          Save
        </Button>
      </Toolbar>
      <WindowContent>
        <Counter /> <br />
        <Button onClick={() => setIsRecording(!isRecording)}>{`${
          isRecording ? "recording" : "start recording"
        } - sample size: ${sampleCount}`}</Button>
        <Button onClick={resetCurrentData}>reset</Button>
        <Button
          onClick={addCurrentDataToSessions}
          disabled={!sampleCount || isRecording}
        >
          save session
        </Button>
        <video ref={videoRef} className="video" autoPlay></video>
        <div className="target" ref={targetRef}></div>
      </WindowContent>
    </Window>
  );
};

const mapStateToProps = ({ inputData }) => {
  return {
    sampleCount: inputData.currentSession.data.length,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCurrentData,
      addCurrentDataToSessions,
      resetCurrentData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InputData);
