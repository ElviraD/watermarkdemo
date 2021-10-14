import React from "react";
import "./index.css";

export default class SvgWater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  SvgWater({
    width = 100,
    height = 60,
    textBaseline = "middle",
    font = "16px",
    fillStyle = "#b8b8b8",
    opacity = 0.6,
    content = "水印",
    zIndex = 999,
  }) {
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" version="1.1"><text x="50%" y="50%" dy="12px"
                    text-anchor="${textBaseline}"
                    stroke="${fillStyle}"
                    stroke-width="1"
                    stroke-opacity="${opacity}"
                    fill="none"
                    style="font-size: ${font};">
                    ${content}
                  </text></svg>`;
    const base64Url = `data:image/svg+xml,${encodeURIComponent(svgStr)}`;
    console.log('base64Url', base64Url)
    const wrap = document.querySelector(".svg-image");
    const { clientWidth, clientHeight } = wrap;
    console.log(clientWidth, clientHeight);

    const box = document.querySelector("#svg-watermark-box");

    const watermarkBox = box || document.createElement("div");
    const styleStr = `
                  position:absolute;
                  top:${wrap.offsetTop}px;
                  left:0;
                  bottom:0;
                  right:0;
                  width:${clientWidth}px;
                  height:${clientHeight}px;
                  z-index:${zIndex};
                  pointer-events:none;
                  background-repeat:repeat;
                  background-size: ${width/clientWidth*100}% auto;
                  background-image:url('${base64Url}')`;

    watermarkBox.setAttribute("style", styleStr);
    watermarkBox.classList.add("svg-watermark");
  }

  componentDidMount() {
    window.onload = () => {
      this.SvgWater({
        content: "svg水印",
      });
    };
  }

  render() {
    return (
      <div className="svg-image-dom">
        <div className="text svg-text">svg水印例子</div>
        <img
          className="image svg-image"
          src="https://img.ljcdn.com/beike/ajax/m/1631708906673.jpeg"
        />
        <div id="svg-watermark-box"></div>
      </div>
    );
  }
}
