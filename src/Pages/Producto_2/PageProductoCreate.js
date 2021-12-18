import React from "react";
import "./pageProductoCreate.css";
import { ProductoCard } from "../../Components/Producto_2/ProductoCreate/ProductoCard";
import { ProductoForm } from "../../Components/Producto_2/ProductoCreate/ProductoForm";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
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
initAxiosInterceptors();
const PageProductoCreate = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  let history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    estado: "A",
    imagen: "",
    descripcion: "",
  });
  const [file, setFile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  /*-----------------------servicios-------------------*/
  async function cargarUsuario() {
    if (!getToken()) {
      setCargandoUsuario(false);
      history.push("/");
      return;
    }
    try {
      const res = await axios.get("http://localhost:10801/api/my");
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
  const getCategorias = () => {
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/productos/create"
        "http://localhost:10801/api/categorias/get"
      );
      console.log(res);
      setCategorias(res.data);
    })();
  };
  /*------------fin servicios---------------*/
  useEffect(() => {
    //cargarUsuario();
  });
  /*----------handles--------------------*/
  const handleInputChange = (e) => {
    setProducto({
      nombre: e.target.value,
      estado: "A",
      categoria: producto.categoria,
      imagen: producto.imagen,
    });
  };
  const handleInputTextAreaChange = (e) => {
    setProducto({
      nombre: producto.nombre,
      estado: "A",
      categoria: producto.categoria,
      imagen: producto.imagen,
      descripcion: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    console.log("-----------" + producto.categoria);
    e.preventDefault();
    //console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombre", producto.nombre);
    formData.append("estado", "A");
    formData.append("categoria", producto.categoria);
    formData.append("descripcion", producto.descripcion);
    const res = await axios.post(
      "http://localhost:10801/api/productos/create",
      formData
    );

    if (res) {
      history.push("/ProductList");
    }
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
    history.push("productList");
  };
  const onChangeCategoria = (e) => {
    setSelectedCategoria(e.value);
    (async () => {
      setProducto({
        nombre: producto.nombre,
        estado: "A",
        categoria: selectedCategoria ? selectedCategoria._id : null,
        imagen: producto.imagen,
        descripcion: producto.descripcion,
      });
      const categoria_id = selectedCategoria ? selectedCategoria._id : null;

      console.log("categoria" + categoria_id);
    })();
  };
  /*----------fin handles---------------*/
  useEffect(() => {
    getCategorias();
  }, []);
  return (
    <div>
      <MenuAdministrador />
      <div className="contenedor-form-producto">
        <div className="item-1">
          <ProductoCard
            nombre={producto.nombre}
            categoria={selectedCategoria ? selectedCategoria.nombre : null}
            descripcion={producto.descripcion}
            pathImage={pathImage}
          />
        </div>
        <div className="item-2">
          <ProductoForm
            categoria={selectedCategoria}
            selectedCategoria={selectedCategoria}
            categorias={categorias}
            onChangeCategoria={onChangeCategoria}
            title="Crear Producto"
            color="success"
            submit="Registrar"
            value={producto.nombre}
            nameInputText="nombre"
            onChange={handleInputChange}
            onFileChange={onFileChange}
            handleClickSave={handleSubmit}
            handleClickCancelar={handleClickCancelar}
            valueTextArea={producto.descripcion}
            onChangeInputArea={handleInputTextAreaChange}
          />
        </div>
      </div>
    </div>
  );
};
export { PageProductoCreate };
