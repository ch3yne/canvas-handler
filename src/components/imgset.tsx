import { Button } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import img1 from "../images/bili-title.png";
import React, { createRef, useContext, useEffect, useRef } from "react";

import { Context } from "../store";

export default function ImgSet() {
  const [, dispatch]: any = useContext(Context);

  const inputFile: any = createRef();
  const imgSet = useRef<HTMLDivElement>(null);

  function handleDragStart(this: any, e: any) {
    if (imgSet.current !== null) {
      const images = imgSet.current.children;
      [].forEach.call(images, function (img: any) {
        img.classList.remove("img_dragging");
      });
      this.classList.add("img_dragging");
      const leftSide: any = document.querySelector(".left-side");
      const topBar: any = document.querySelector(".top-bar");
      dispatch({
        type: "SET_IMG_DRAG_OFFSET",
        payload: {
          offsetX: e.clientX - e.target.offsetLeft + leftSide.clientWidth,
          offsetY: e.clientY - e.target.offsetTop + topBar.clientHeight,
        },
      });
    }
  }

  function handleDragEnd(e: any) {
    if (imgSet.current !== null) {
      const images = imgSet.current.children;
      [].forEach.call(images, function (img: any) {
        img.classList.remove("img_dragging");
      });
    }
  }

  const handleFile = (e: any) => {
    e.persist();
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e: any) => {
      const dataURL = e.target.result;
      const img: any = document.createElement("img");
      img.className = "img-item";
      img.draggable = true;
      if (typeof dataURL === "string") {
        img.src = dataURL;
      }
      if (imgSet.current) {
        imgSet.current.appendChild(img);
      }
    };
  };

  // 上传图片
  const uploadFile = (e: any) => {
    e.persist();
    if (inputFile.current) {
      inputFile.current.click();
    }
    return false;
  };

  // // 选中图片
  // const handleImg = (e: any) => {
  //   if (e.target.tagName.toLowerCase() === "img") {
  //     dispatch({
  //       type: 'SET_MOVING_IMG',
  //       payload: e.target,
  //     });
  //     dispatch({
  //       type: 'SET_IMG_DRAG_OFFSET',
  //       payload: {
  //         offsetX: e.clientX - e.target.offsetLeft,
  //         offsetY: e.clientY - e.target.offsetTop,
  //       },
  //     });
  //   }
  // };

  // @ts-ignore
  useEffect(() => {
    const images = document.querySelectorAll(".upload-img-list-content img");
    [].forEach.call(images, function (img: any) {
      img.addEventListener("dragstart", handleDragStart, false);
      img.addEventListener("dragend", handleDragEnd, false);
    });
    return (_: any): any => {
      [].forEach.call(images, function (img: any) {
        img.addEventListener("dragstart", handleDragStart, false);
        img.addEventListener("dragend", handleDragEnd, false);
      });
    };
  });

  return (
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
          ref={inputFile}
          onChange={(e) => {
            handleFile(e);
          }}
        />
      </div>
      <div
        onClick={() => {
          const images = document.querySelectorAll(
            ".upload-img-list-content img"
          );
          console.log(images);
        }}
      >
        123
      </div>
      <div className="upload-img-list-content" ref={imgSet}>
        <img className="img-item" src={img1} alt="" draggable />
        {/* <img
              className="img-item"
              src={img2}
              alt="" draggable
              // onMouseDown={ (e) => { handleImg(e) } }
            /> */}
      </div>
    </div>
  );
}
