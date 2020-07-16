import React from "react";
import { TextField } from "@material-ui/core";
import "./CanvasLayout.css";

import TopBar from "./components/topbar";
import Canvas from "./components/canvas";
import ImgSet from "./components/imgset";

function CanvasLayout() {
  // const handleTest = (e: any) => {
  //   // console.log(canvas);
  //   // // console.log(canvas.getObjects());
  //   // // console.log(canvas.item(0));
  //   // const { current } = wrapper;
  //   // console.log(current.offsetWidth);
  //   // console.log(current.offsetHeight);
  //   // console.log(canvas.width);
  //   // window.open(canvas.toDataURL('png'));
  // };

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
      <ImgSet />
      <Canvas />
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

export default CanvasLayout;
