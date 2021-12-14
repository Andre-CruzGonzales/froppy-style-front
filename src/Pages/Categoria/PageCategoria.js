import React from "react";
import { CategoriaCreate } from "../../Components/Categoria/CategoriaCreate";
import { CategoriaForm } from "../../Components/Categoria/CategoriaForm";
import "./pageCategoria.css";
import { useState } from "react";
import default_upload from "../../Components/Upload/default_upload.png";
import axios from "axios";
import { useHistory } from "react-router";
const PageCategoria = () => {
  let history = useHistory();

  const [categoria, setCategoria] = useState("");
  const [file, setFile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  //const [addCategoria, setAddCategoria] = useState(initialCategoriaState);

  const handleInputChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombre", categoria);
    formData.append("estado", "A");
    const res = await axios.post(
      //"http://localhost:10801/api/categorias/create",
      "http://20.124.206.156:10801/api/categorias/create",
      formData
    );

    console.log(res);
    history.push("/categoryList");
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type.includes("image")) {
        setFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function load() {
          setPathImage(reader.result);
        };
        //setfile(file);
      } else {
        console.log("ocurrio un error al subir la imagen");
      }
    }
  };
  const handleClickCancelar = (e) => {
    history.push("categoryList");
  };
  return (
    <div>
      <div className="contenedor">
        <div className="item-1">
          <CategoriaCreate
            categoria={categoria}
            pathImage={pathImage}
          ></CategoriaCreate>
        </div>
        <div className="item-2">
          <CategoriaForm
            title="Crear Categoria"
            color="success"
            submit="Registrar"
            value={categoria}
            nameInputText="nombre"
            onChange={handleInputChange}
            onFileChange={onFileChange}
            handleClickSave={handleSubmit}
            handleClickCancelar={handleClickCancelar}
          />
        </div>
      </div>
    </div>
  );
};
export { PageCategoria };
