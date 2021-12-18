import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { CategoriaForm } from "../../Components/Categoria_2/CategoriaCreate/CategoriaForm";
import default_upload from "../../Components/Upload/default_upload.png";
import { CategoriaCard } from "../../Components/Categoria_2/CategoriaCreate/CategoriaCard";
import { Menu } from "../../Components/Menu/Menu";
import { MenuAdministrador } from "../../Components/Menu/MenuAdministrador";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();
const PageCategoriaEdit = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  let history = useHistory();
  const [categoria, setCategoria] = useState({
    nombre: "",
    _id: "",
    imagen: null,
    estado: "A",
  });
  const [file, setFile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  let params = useParams();
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
          history.push("/categoryList");
        }
        if (usuario.rol === 2) {
          history.push("/productsList");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    cargarUsuario();
    (async () => {
      const res = await axios.get(
        `http://20.127.134.26:10801/api/categorias/get/${params.id}`
      );
      console.log(res.data);
      setCategoria(res.data);
    })();
  }, [params.id]);

  const handleInputChange = (e) => {
    setCategoria({
      nombre: e.target.value,
      imagen: categoria.imagen,
      _id: categoria._id,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);
    const formData = new FormData();
    if (file) {
    }
    formData.append("file", file);
    formData.append("nombre", categoria.nombre);
    formData.append("estado", categoria.estado);
    const res = await axios.put(
      //`http://20.124.206.156:10801/api/categorias/update/${params.id}`,
      `http://20.127.134.26:10801/api/categorias/update/${params.id}`,
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
      <MenuAdministrador />
      <div className="contenedor-pageCategoria-create">
        <div className="item-1">
          {categoria.imagen ? (
            <CategoriaCard
              title={categoria.nombre}
              pathImage={categoria.imagen}
              image={categoria.imagen}
            />
          ) : (
            <CategoriaCard title={categoria.nombre} pathImage={pathImage} />
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
