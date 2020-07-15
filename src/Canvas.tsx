import React, { createRef, useEffect, useRef, useState } from "react";

import { fabric } from "fabric";

import {
  AppBar,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { Apps, CloudUpload, Delete, Save } from "@material-ui/icons";

import TopBar from "./components/topbar";

import "./Canvas.css";

import img1 from "./images/bili-title.png";

// import
// https://github.com/fabricjs/fabric.js/issues/5951
// import img2 from './images/test.jpg';

function debounce(fn: any, ms: any) {
  let timer: any;
  return (_: any) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      // @ts-ignore
      fn.apply(this, arguments);
    }, ms);
  };
}

function Canvas() {
  const c: React.MutableRefObject<null> = useRef(null);
  const wrapper: any = useRef(null);

  const inputFile: any = createRef();
  const imgSet = useRef<HTMLDivElement>(null);

  const [canvas, setCanvas]: any = useState(null);

  // let inputFile = null;
  // let imgSet = null;
  let movingImage: any;
  let imgDragOffset: any = {
    offsetX: 0,
    offsetY: 0,
  };

  // 初始化 canvas
  useEffect(() => {
    // @ts-ignore
    setCanvas(() => {
      const localCanvas = new fabric.Canvas("c");
      // const { offsetWidth, offsetHeight } = wrapper.current;
      localCanvas.setDimensions({
        // width: offsetWidth,
        // height: offsetHeight,
        width: 400,
        height: 300,
      });
      return localCanvas;
    });
  }, []);

  // 调节窗口大小时防抖调节 canvas 大小
  useEffect((): any => {
    const debouncedHandleResize = debounce(function handleResize() {
      const { offsetWidth, offsetHeight }: any = wrapper.current;
      canvas.setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    }, 1000);
    window.addEventListener("resize", debouncedHandleResize);
    return (_: any): any => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    if (!canvas) {
      return;
    }

    // canvas hover 状态
    canvas.on("mouse:over", (e: any) => {
      // if (canvas.item(0)) {
      //   // canvas.item(0).hasControls = canvas.item(0).hasBorders = false;
      //   // canvas.item(0).set({
      //   //   cornerStyle: 'circle',
      //   // });
      // }
      // console.log(e);
      if (e.target) {
        // e.target.set({
        //   strokeWidth: 1,
        //   stroke: 'red',
        // });
        // e.target._renderControls();
        // canvas.item(0).set({
        // });
        // canvas.renderAll();
      }
    });
    //
    canvas.on("mouse:out", (e: any) => {
      // if (e.target) {
      //   e.target.set('strokeWidth', 0);
      //   canvas.renderAll();
      // }
    });

    canvas.on("mouse:down", (e: any) => {
      if (e.target) {
        e.target.opacity = 0.5;
        canvas.renderAll();
      }
    });

    canvas.on("mouse:up", (e: any) => {
      if (e.target) {
        e.target.opacity = 1;
        canvas.renderAll();
      }
    });

    // canvas 监听画布内鼠标移动事件
    canvas.on("mouse:move", (e: any) => {
      // console.log(e);
    });

    // canvas 监听画布内拖动事件
    canvas.on("drop", (e: any) => {
      dropImg(e);
    });
  });

  const handleTest = (e: any) => {
    console.log(canvas);
    // console.log(canvas.getObjects());
    // console.log(canvas.item(0));
    const { current } = wrapper;
    console.log(current.offsetWidth);
    console.log(current.offsetHeight);
    console.log(canvas.width);
  };

  // 拖动图片放进画布
  const dropImg = (e: any) => {
    // console.log(movingImage);
    const { offsetX, offsetY } = e.e;
    const image = new fabric.Image(movingImage, {
      width: movingImage.naturalWidth,
      height: movingImage.naturalHeight,
      scaleX: 100 / movingImage.naturalWidth,
      scaleY: 100 / movingImage.naturalWidth,
      top: offsetY - imgDragOffset.offsetY,
      left: offsetX - imgDragOffset.offsetX,
    });
    canvas.add(image);
  };

  // 移除 canvas 内元素
  const removeShape = () => {
    canvas.remove(canvas.getActiveObject());
    // console.log(canvas.getObjects())
  };

  // 上传图片
  const uploadFile = (e: any) => {
    // console.log(inputFile);
    e.persist();
    // if (inputFile.current) {
    //   inputFile.current.click();
    // }
    inputFile.current.click();
    return false;
  };

  // 选中图片
  const handleImg = (e: any) => {
    if (e.target.tagName.toLowerCase() === "img") {
      imgDragOffset.offsetX = e.clientX - e.target.offsetLeft;
      imgDragOffset.offsetY = e.clientY - e.target.offsetTop;
      movingImage = e.target;
      // if (e.target) {
      //   setMovingImage(movingImage = e.target);
      // }
      // setMovingImage(movingImage => e.target);
      // console.log(movingImage);
    }
  };

  const handleFile = (e: any) => {
    e.persist();
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e: any) => {
      // console.log(e)
      const dataURL = e.target.result;
      const img: any = document.createElement("img");
      img.className = "img-item";
      img.draggable = true;
      if (typeof dataURL === "string") {
        img.src = dataURL;
      }
      // img.src = dataURL;
      img.click = handleImg;
      if (imgSet.current) {
        imgSet.current.appendChild(img);
      }
    };
  };

  // 保存 canvas 图片
  const saveImage = () => {
    const imgUrl = canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });
    // console.log(imgUrl);
    if (window.navigator.msSaveOrOpenBlob) {
      let bStr = atob(imgUrl.split(",")[1]);
      let n = bStr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
      }
      let blob = new Blob([u8arr]);
      window.navigator.msSaveOrOpenBlob(blob, "image-download.png");
    } else {
      let a = document.createElement("a");
      a.href = imgUrl;
      a.setAttribute("download", "image-download");
      a.click();
    }
  };

  return (
    <div className={"main-content"}>
      <div className="top-bar">
        <TopBar />
        {/*<AppBar position="static">*/}
        {/*  <Toolbar variant="dense">*/}
        {/*    <IconButton edge="start" color="inherit" aria-label="menu">*/}
        {/*      <Apps />*/}
        {/*    </IconButton>*/}
        {/*    <Typography variant="h6" color="inherit">*/}
        {/*      Canvas Demo*/}
        {/*    </Typography>*/}
        {/*    <Button*/}
        {/*      variant="outlined"*/}
        {/*      color="inherit"*/}
        {/*      startIcon={<Delete />}*/}
        {/*      onClick={removeShape}*/}
        {/*      className={"classes.menuButton"}*/}
        {/*    >*/}
        {/*      删除选中*/}
        {/*    </Button>*/}
        {/*    <Button*/}
        {/*      variant="outlined"*/}
        {/*      color="inherit"*/}
        {/*      startIcon={<Save />}*/}
        {/*      onClick={saveImage}*/}
        {/*      className={"classes.menuButton"}*/}
        {/*    >*/}
        {/*      保存图片*/}
        {/*    </Button>*/}
        {/*    <Button*/}
        {/*      variant="outlined"*/}
        {/*      color="inherit"*/}
        {/*      onClick={handleTest}*/}
        {/*      className={"classes.menuButton"}*/}
        {/*    >*/}
        {/*      TEST*/}
        {/*    </Button>*/}
        {/*  </Toolbar>*/}
        {/*</AppBar>*/}
      </div>
      <div className="left-side">
        <div className="top-area">
          <Button
            variant="outlined"
            color="default"
            component="span"
            fullWidth
            startIcon={<CloudUpload />}
            onClick={(e: any) => {
              uploadFile(e);
            }}
          >
            导入图片
          </Button>
          <input
            type="file"
            accept="image/*"
            // ref={r => {
            //   inputFile = r;
            // }}
            ref={inputFile}
            onChange={(e) => {
              handleFile(e);
            }}
          />
        </div>
        <div
          className="upload-img-list-content"
          // ref={(f) => {
          //   imgSet = f;
          // }}
          ref={imgSet}
          onMouseDown={(e) => {
            handleImg(e);
          }}
        >
          <img className="img-item" src={img1} alt="" draggable />
          {/* <img
            className="img-item"
            src={img2}
            alt="" draggable
            // onMouseDown={ (e) => { handleImg(e) } }
          /> */}
        </div>
      </div>
      <section className="canvas-content" ref={wrapper}>
        <div className={"canvas-wrapper"}>
          <canvas
            ref={c}
            // ref={r => {
            //   c = r
            // }}
            id="c"
            width="400"
            height="300"
          />
        </div>
      </section>
      <aside>aside</aside>
      <footer>
        <TextField
          label="X"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </footer>
    </div>
  );
}

export default Canvas;
