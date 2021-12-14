import React from "react";
import "./categoria.css";
const ContainerCategoriaList = (props) => {
  return (
    <>
      <div className="container">{props.children}</div>
    </>
  );
};

export { ContainerCategoriaList };
