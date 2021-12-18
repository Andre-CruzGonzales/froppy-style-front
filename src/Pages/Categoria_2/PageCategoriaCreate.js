import React from "react";
import "./pageCategoriaCreate.css";
import { CategoriaCard } from "../../Components/Categoria_2/CategoriaCreate/CategoriaCard";
import { CategoriaForm } from "../../Components/Categoria_2/CategoriaCreate/CategoriaForm";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import default_upload from "../../Components/Upload/default_upload.png";
import axios from "axios";
import { Menu } from "../../Components/Menu/Menu";
import { MenuAdministrador } from "../../Components/Menu/MenuAdministrador";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
import { useEffect } from "react/cjs/react.development";
initAxiosInterceptors();
const PageCategoriaCreate = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  let history = useHistory();
  const [categoria, setCategoria] = useState("");
  const [file, setFile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  const handleInputChange = (e) => {
    setCategoria(e.target.value);
  };
  useEffect(() => {
    //cargarUsuario();
  });
  async function cargarUsuario() {
    if (!getToken()) {
      setCargandoUsuario(false);
      history.push("/");
      return;
    }
    try {
      const res = await axios.get("http://20.127.134.26:10801/api/my");
      setUsuario(res.data.data.user);
      setCargandoUsuario(false);
      console.log("============");
      console.log(usuario);
      if (usuario) {
        if (usuario.rol === 1) {
          history.push("/addCategory");
        }
        if (usuario.rol === 2) {
          history.push("/productsList");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombre", categoria);
    formData.append("estado", "A");
    const res = await axios.post(
      "http://20.127.134.26:10801/api/categorias/create",
      //"http://20.124.206.156:10801/api/categorias/create",
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
      <MenuAdministrador />
      <div className="contenedor-pageCategoria-create">
        <div className="item-1">
          <CategoriaCard title={categoria} pathImage={pathImage} />
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
            handleClickCancelar={handleClickCancelar}
            handleClickSave={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
export { PageCategoriaCreate };
