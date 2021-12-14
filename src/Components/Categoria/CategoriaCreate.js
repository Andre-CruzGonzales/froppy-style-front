import React from "react";
import "./categoriaCreate.css";
import default_upload from "../../Components/Upload/default_upload.png";
const CategoriaCreate = (props) => {
  console.log(props);
  return (
    <div className="container-create">
      <div className="card">
        <div className="image">
          {props.children}
          <img
            src={props.pathImage ? props.pathImage : default_upload}
            alt="imagen"
          />
          {/*<img href="#" src={default_upload} />*/}
        </div>
        <div className="content">
          <h3>{props.categoria}</h3>
          <p>{props.descripcion}</p>
        </div>
      </div>
    </div>
  );
};
export { CategoriaCreate };
