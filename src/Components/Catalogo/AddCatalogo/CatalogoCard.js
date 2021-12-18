import React from "react";
import "./catalogoCard.css";
import { Button } from "primereact/button";
const CatalogoCard = (props) => {
  return (
    <>
      <div className="shop-card-add-catalogo">
        <div className="title">{props.nombre}</div>
        <div className="desc">{props.categoria}</div>
        <figure>
          <img src={props.image} alt={props.title} />
          {/*<img src="http://www.supah.it/dribbble/012/1.jpg" />*/}
        </figure>
        <div className="cta">
          <div className="price">{`S/.${props.precio}`}</div>
        </div>
      </div>
    </>
  );
};
export { CatalogoCard };
