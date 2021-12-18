import React from "react";
import "./productoCard.css";
import { Button } from "primereact/button";
const ProductoCard = (props) => {
  return (
    <>
      <div className="shop-card">
        <div className="title">{props.title}</div>
        <div className="desc">{props.categoria}</div>
        <figure>
          <img src={props.image} alt={props.title} />
          {/*<img src="http://www.supah.it/dribbble/012/1.jpg" />*/}
        </figure>
        <div className="cta">
          <Button
            icon="pi pi-plus"
            className="p-button-success"
            onClick={props.onClickAdd}
          />
          <Button
            icon="pi pi-sign-out"
            className="p-button-info"
            onClick={props.onClickInfo}
          />
        </div>
      </div>
    </>
  );
};
export { ProductoCard };
