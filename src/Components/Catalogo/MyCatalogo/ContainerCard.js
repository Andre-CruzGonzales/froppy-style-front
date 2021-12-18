import React from "react";
import "./containerCard.css";
const ContainerCard = (props) => {
  return (
    <>
      <div className="container-shop-my-catalogo">{props.children}</div>
    </>
  );
};

export { ContainerCard };
