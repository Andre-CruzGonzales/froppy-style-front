import React from "react";
import "./productoCardView.css";
import default_upload from "../../../Components/Upload/default_upload.png";
export default function ProductoCardView(props) {
  return (
    <div className="wrapper-view">
      <div className="product-img">
        <img
          src={props.pathImage ? props.pathImage : default_upload}
          alt="imagen"
          height={280}
          width={227}
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
export { ProductoCardView };
