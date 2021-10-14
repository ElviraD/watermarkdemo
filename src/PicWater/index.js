import React from "react";
import "./index.css";

export default class PicWater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.image = null;
    this.canvas = null;
    this.context = null;
  }

  picWater({
    width = 120,
    height = 60,
    src = "",
    textAlign = "center",
    textBaseline = "middle",
    fontSize = 16,
    fontFamily = "Microsoft Yahei",
    fillStyle = "rgba(184, 184, 184, 0.6)",
    content = "水印",
  }) {
    const wrap = document.querySelector(".pic-image");
    const { clientWidth, clientHeight } = wrap;
    console.log(clientWidth, clientHeight);
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      const imgScale = Math.floor(img.width / (clientWidth || document.body.clientWidth));
      const [columns, rows] = [
        ~~(img.width / (width * imgScale)),
        ~~(img.height / (height * imgScale)),
      ];

      const dx = img.width - width * imgScale * columns;
      const dy = img.height - height * imgScale * rows;
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.font = fontSize * imgScale + "px " + fontFamily;
          ctx.fillStyle = fillStyle;
          ctx.fillText(
            content,
            (i + 1 / 2) * width * imgScale + dx / 2,
            (j + 1 / 2) * height * imgScale + dy / 2
          );
        }
      }
      const base64Url = canvas.toDataURL("image/jpeg", 0.7);
      // console.log("base64Url", base64Url);
      wrap.src = base64Url;
    };
  }

  componentDidMount() {
    window.onload = () => {
      this.picWater({
        content: "图片加水印",
        src: "https://img.ljcdn.com/beike/ajax/m/1631708906673.jpeg",
      });
    };
  }

  render() {
    return (
      <div className="pic-image-dom">
        <div className="text pic-text">图片加水印</div>
        <img
          className="image pic-image"
          // src="https://img.ljcdn.com/beike/ajax/m/1631708906673.jpeg"
        />
      </div>
    );
  }
}
