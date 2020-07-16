import React, { useEffect, useRef, useState, useContext } from "react";
import { fabric } from "fabric";

import { Context } from "../store";

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

export default function Canvas() {
  const [state] = useContext(Context);

  const c: any = useRef(null);
  const container: any = useRef(null);
  const wrapper: any = useRef(null);

  const [canvas, setCanvas]: any = useState(null);

  const [_, dispatch]: any = useContext(Context);

  // 拖动图片放进画布
  const dropImg = (e: any) => {
    const { offsetX, offsetY } = e.e;
    if (state.movingImg !== null) {
      const image = new fabric.Image(state.movingImg, {
        width: state.movingImg.naturalWidth,
        height: state.movingImg.naturalHeight,
        scaleX: 100 / state.movingImg.naturalWidth,
        scaleY: 100 / state.movingImg.naturalWidth,
        top: offsetY - state.imgDragOffset.offsetY,
        left: offsetX - state.imgDragOffset.offsetX,
      });
      // console.log(image);
      canvas.add(image);
      return false;
      // canvas.renderAll();
    }
  };

  function handleDragEnter(e: any) {
    if (wrapper.current) {
      wrapper.current.classList.add("over");
    }
  }

  function handleDragOver(e: any) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "copy";
    return false;
  }

  function handleDragLeave(e: any) {
    if (wrapper.current) {
      wrapper.current.classList.remove("over");
    }
  }

  function handleDrop(e: any) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    const img: any = document.querySelector(
      ".upload-img-list-content img.img_dragging"
    );
    // console.log('event: ', e);
    console.log(e.clientX, e.clientY);
    if (c.current !== null) {
      const { offsetTop, offsetLeft } = container.current;
      console.log(offsetLeft, offsetTop);
      // console.log(c);
      // console.log(_);
      // console.log(img);
      // TODO set offset
      const newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        // left: e.clientX - (offsetLeft + _.imgDragOffset.offsetX)*2,
        // top: e.clientY - (offsetTop + _.imgDragOffset.offsetY)*2,
        left: e.clientX,
        top: e.clientY,
      });
      canvas.add(newImage);
      return false;
    }
  }

  // // 移除 canvas 内元素
  // const removeShape = () => {
  //   canvas.remove(canvas.getActiveObject());
  //   // console.log(canvas.getObjects())
  // };

  // // 保存 canvas 图片
  // const saveImage = () => {
  //   const imgUrl = canvas.toDataURL({
  //     format: "png",
  //     quality: 0.8,
  //   });
  //   // console.log(imgUrl);
  //   if (window.navigator.msSaveOrOpenBlob) {
  //     let bStr = atob(imgUrl.split(",")[1]);
  //     let n = bStr.length;
  //     let u8arr = new Uint8Array(n);
  //     while (n--) {
  //       u8arr[n] = bStr.charCodeAt(n);
  //     }
  //     let blob = new Blob([u8arr]);
  //     window.navigator.msSaveOrOpenBlob(blob, "image-download.png");
  //   } else {
  //     let a = document.createElement("a");
  //     a.href = imgUrl;
  //     a.setAttribute("download", "image-download");
  //     a.click();
  //   }
  // };

  // 初始化 canvas
  useEffect(() => {
    // @ts-ignore
    setCanvas(() => {
      const canvas = new fabric.Canvas("c");
      const { offsetWidth, offsetHeight } = container.current;
      canvas.setDimensions({
        width: offsetWidth,
        height: offsetHeight,
        // width: 400,
        // height: 300,
      });
      // localCanvas.selection = false;
      return canvas;
    });
  }, []);

  // 调节窗口大小时防抖调节 canvas 大小
  useEffect((): any => {
    const debouncedHandleResize = debounce(function handleResize() {
      const { offsetWidth, offsetHeight }: any = container.current;
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

  return (
    <section className="canvas-content" ref={container}>
      <div
        className={"canvas-wrapper"}
        ref={wrapper}
        onDragEnter={(e) => {
          handleDragEnter(e);
        }}
        onDragOver={(e) => {
          handleDragOver(e);
        }}
        onDragLeave={(e) => {
          handleDragLeave(e);
        }}
        onDrop={(e) => {
          handleDrop(e);
        }}
      >
        {/*<div className={'canvas-tools'}>*/}
        {/*  123*/}
        {/*</div>*/}
        <canvas ref={c} id="c" width="400" height="300" />
      </div>
    </section>
  );
}
