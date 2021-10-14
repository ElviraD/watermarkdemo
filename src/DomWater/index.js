import React from "react";
import "./index.css";

export default class DomWater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.timer = null
  }

  doWaterMark(width, height, content) {
    let box = document.getElementById("dom-watermark-box");
    // const boxWidth = box.clientWidth,
    //   boxHeight = box.clientHeight;
    const wrap = document.querySelector(".dom-image");
    const { clientWidth, clientHeight } = wrap;
    console.log(clientWidth, clientHeight);
    const [columns, rows] = [
      ~~(clientWidth / width),
      ~~(clientHeight / height),
    ];

    box.style.top = wrap.offsetTop + "px";
    box.style.left = wrap.offsetLeft + "px";
    box.style.height = wrap.offsetHeight + "px";

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let next = document.createElement("div");
        next.setAttribute("class", "watermark");
        next.style.width = width + "px";
        next.style.height = height + "px";
        next.style.margin = "10px";
        next.style.fontSize = "16px";
        next.style.fontWeight = "bold";
        next.style.fontFamily = "Microsoft Yahei";
        next.style.color = "rgba(184, 184, 184, 0.6)";
        next.innerText = content;
        box.appendChild(next);
      }
    }
  }

  componentDidMount() {
    const waterWidth = 100;
    const waterHeight = 60;
    window.onload = ()=> {
      this.doWaterMark(waterWidth, waterHeight, "dom水印");
    }
  }

  render() {
    return (
      <div className="dom-image-dom">
        <div className="text dom-text">dom水印例子</div>
        <img
          className="image dom-image"
          src="https://img.ljcdn.com/beike/ajax/m/1631708906673.jpeg"
        />
        <div id="dom-watermark-box"></div>
      </div>
    );
  }
}
