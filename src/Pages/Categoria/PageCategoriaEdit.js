import axios from "axios";
import React, { useEffect, useState } from "react";
import default_upload from "../../Components/Upload/default_upload.png";
import { useParams, useHistory } from "react-router-dom";
import { CategoriaCreate } from "../../Components/Categoria/CategoriaCreate";
import { CategoriaForm } from "../../Components/Categoria/CategoriaForm";
//import { useHistory } from "react-router";
const PageCategoriaEdit = () => {
  let history = useHistory();

  const [categoria, setCategoria] = useState({
    nombre: "",
    _id: "",
    imagen: null,
  });
  const [file, setFile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  let params = useParams();
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:10801/api/categorias/get/${params.id}`
      );
      console.log(res.data);
      setCategoria(res.data);
    })();
  }, [params.id]);
  const handleInputChange = (e) => {
    setCategoria({ nombre: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombre", categoria);
    formData.append("estado", "A");
    const res = await axios.put(
      `http://localhost:10801/api/categorias/update/${params.id}`,
      formData
    );

    console.log(res);
    history.push("/categoryList");
  };
  const onFileChange = (e) => {
    console.log(e);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type.includes("image")) {
        setCategoria({
          nombre: categoria.nombre,
          imagen: null,
          estado: categoria.estado,
        });
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
    history.push("../categoryList");
  };
  return (
    <div>
      <div className="contenedor">
        <div className="item-1">
          {categoria.imagen ? (
            <CategoriaCreate
              categoria={categoria.nombre}
              pathImage={categoria.imagen}
            />
          ) : (
            <CategoriaCreate
              categoria={categoria.nombre}
              pathImage={pathImage}
            />
          )}
        </div>
        <div className="item-2">
          <CategoriaForm
            title="Editar Categoria"
            color="warning"
            submit="Editar"
            value={categoria.nombre}
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
export { PageCategoriaEdit };
