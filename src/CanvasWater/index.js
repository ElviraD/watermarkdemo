import React from "react";
import "./index.css";

export default class CanvasWater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.image = null;
    this.canvas = null;
    this.context = null;
  }
  // 利用 MutationObserver 监听节点是否被修改
  createObserver(id, args) {
    console.log('createObserver')
    const observer = new MutationObserver(() => {
      if (document.getElementById(id) === null) {
        id = this.canvasWater(args);
      }
    });
    const option = {
      childList: true, //子元素的变动
      subtree: true, //所有下属节点（包括子节点和子节点的子节点）的变动
    };

    observer.observe(document.body, option); //观察body下节点的变化
  }

  canvasWater({
    width = 100,
    height = 60,
    textAlign = "center",
    textBaseline = "middle",
    font = "16px Microsoft Yahei",
    fillStyle = "rgba(184, 184, 184, 0.6)",
    content = "水印",
    // rotate = "45",
    zIndex = 999,
  }) {
    const canvas = document.createElement("canvas");
    const wrap = document.querySelector(".canvas-image");
    const { clientWidth, clientHeight } = wrap;
    console.log(clientWidth, clientHeight);
    canvas.setAttribute("width", width + "px");
    canvas.setAttribute("height", height + "px");
    const ctx = canvas.getContext("2d");
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    // ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillText(content, width / 2, height / 2);

    const base64Url = canvas.toDataURL();

    const box = document.querySelector("#canvas-watermark-box");
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
                  background-image:url('${base64Url}')`;
    
    watermarkBox.setAttribute("style", styleStr);
    watermarkBox.classList.add("canvas-watermark");
    if(!document.querySelector('.canvas-watermark')){
      document.querySelector(".canvas-image-dom").appendChild(watermarkBox)
    } 
  }

  componentDidMount() {
    const setting = {
      content: "canvas水印",
    };
    window.onload = () => {
      this.createObserver("canvas-watermark-box", setting);
      this.canvasWater(setting);
    };
    window.onresize = () => {
      this.createObserver("canvas-watermark-box", setting);
      this.canvasWater(setting);
    }
  }

  render() {
    return (
      <div className="canvas-image-dom">
        <div className="text canvas-text">canvas水印例子</div>
        <img
          className="image canvas-image"
          src="https://img.ljcdn.com/beike/ajax/m/1631708906673.jpeg"
          onContextMenu={() => {return false}}
        />
        <div id="canvas-watermark-box"></div>
      </div>
    );
  }
}
