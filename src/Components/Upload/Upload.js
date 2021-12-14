import React from "react";
import "./upload.css";
import { useState } from "react";
import default_upload from "./default_upload.png";
const Upload = ({ setImages, images }) => {
  const [name, setName] = useState("");
  const [file, setfile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  const sendImage = (e) => {
    e.preventDefault();
    /*UploadService.sendImage(name,file).then((result)=>{
          console.log("el result es: ", result);
      });*/
  };
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function load() {
          setPathImage(reader.result);
        };
        setfile(file);
      } else {
        console.log("ocurrio un error al subir la imagen");
      }
    }
  };
  return (
    <>
      <img src={pathImage} alt="imagen" />
      <div className="input-file">
        <input type="file" placeholder="File" onChange={onFileChange} />
      </div>
    </>
  );
};
export { Upload };
