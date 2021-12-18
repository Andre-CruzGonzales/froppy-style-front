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
            icon="pi pi-pencil"
            className="p-button-warning"
            onClick={props.onClickEdit}
          />
          <Button
            icon={`pi pi-${props.iconEye}`}
            className={`p-button-${props.colorEye}`}
            onClick={props.onClickDisabled}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={props.onClickDelete}
          />
        </div>
      </div>
    </>
  );
};
export { ProductoCard };
