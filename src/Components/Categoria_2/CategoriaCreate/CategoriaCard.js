import React from "react";
import "./categoriaCard.css";
import default_upload from "../../../Components/Upload/default_upload.png";
const CategoriaCard = (props) => {
  return (
    <>
      <div className="shop-card-create">
        <div className="title">{props.title}</div>

        <figure>
          <img src={props.pathImage ? props.pathImage : default_upload} />
          {/*<img src="http://www.supah.it/dribbble/012/1.jpg" />*/}
        </figure>
        <div className="cta"></div>
      </div>
    </>
  );
};
export { CategoriaCard };
