import React from "react";
import "./productoList.css";
const ContainerProductoList = (props) => {
  return (
    <>
      <div className="container">{props.children}</div>
    </>
  );
};

export { ContainerProductoList };
