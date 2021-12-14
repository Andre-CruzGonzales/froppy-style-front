import React from "react";
import "./productoList.css";
import { Button } from "primereact/button";
const ProductoList = (props) => {
  return (
    <div className="card">
      <div className="image">
        <img
          href="#"
          /*src="https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg"*/
          src={props.imagen}
          alt={props.categoria}
        />
      </div>
      <div className="content">
        <h3>{props.producto}</h3>
        <h4>{props.categoria}</h4>
        <div className="buttons-categoria">
          <Button
            icon="pi pi-pencil"
            className="p-button-warning button-edit"
            onClick={props.onClickEdit}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-danger button-delete"
          />
        </div>
      </div>
    </div>
  );
};

export { ProductoList };
