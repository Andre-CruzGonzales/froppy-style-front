import React from "react";
import "./productoCard.css";
import default_upload from "../../../Components/Upload/default_upload.png";
export default function ProductoCard(props) {
  return (
    <div className="wrapper">
      <div className="product-img">
        <img
          src={props.pathImage ? props.pathImage : default_upload}
          alt="imagen"
          height={420}
          width={327}
        />
        {/*<img src="http://bit.ly/2tMBBTd" height={420} width={327} />*/}
      </div>
      <div className="product-info">
        <div className="product-text">
          <h1>{props.nombre}</h1>
          <h2>{props.categoria}</h2>
          <p>{props.descripcion}</p>
        </div>
      </div>
    </div>
  );
}
export { ProductoCard };
