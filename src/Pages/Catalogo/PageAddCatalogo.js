import React from "react";
import "./pageAddCatalogo.css";
import { CatalogoCard } from "../../Components/Catalogo/AddCatalogo/CatalogoCard";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import default_upload from "../../Components/Upload/default_upload.png";
import axios from "axios";
import { CatalogoForm } from "../../Components/Catalogo/AddCatalogo/CatalogoForm";
import { Menu } from "../../Components/Menu/Menu";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();
const PageAddCatalogo = () => {
  let history = useHistory();
  let params = useParams();
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [producto, setProducto] = useState({
    nombre: "",
    _id: "",
    imagen: null,
    estado: "A",
    descripcion: "",
    categoria: "",
  });
  const [catalogo, setCatalogo] = useState({
    precio_venta: 0,
    producto: params.id,
    usuario: usuario.id,
    estado: "A",
  });
  /*-----------------------servicios-------------------*/
  const getProductoByID = () => {
    (async () => {
      const res = await axios.get(
        `http://localhost:10801/api/productos/get/${params.id}`
      );
      console.log(res.data);
      setProducto(res.data);
    })();
  };
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
  /*------------fin servicios---------------*/

  /*----------handles--------------------*/
  const handleInputChange = (e) => {
    /*setProducto({
      nombre: e.target.value,
      estado: "A",
      categoria: producto.categoria,
      imagen: producto.imagen,
    });*/
    setCatalogo({
      precio_venta: e.target.value,
      producto: params.id,
      usuario: usuario.id,
      estado: "A",
    });
    //console.log(producto);
    //console.log(usuario);
    console.log(catalogo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);
    const res = await axios.post(
      "http://localhost:10801/api/catalogos/create",
      {
        producto: catalogo.producto,
        precio_venta: catalogo.precio_venta,
        estado: catalogo.estado,
        usuario: usuario.id,
      }
    );
    console.log(catalogo);
    console.log(res);
    history.push("/productsList");
  };

  const handleClickCancelar = (e) => {
    //history.push("../productsList");
  };

  /*----------fin handles---------------*/
  useEffect(() => {
    cargarUsuario();
    getProductoByID();
  }, [params.id]);
  return (
    <div>
      <Menu />
      <div className="contenedor-form-add-catalogo">
        <div className="item-1">
          <CatalogoCard
            nombre={producto.nombre}
            categoria={producto.categoria.nombre}
            descripcion={producto.descripcion}
            image={producto.imagen}
            precio={catalogo.precio_venta}
          />
        </div>
        <div className="item-2">
          <CatalogoForm
            title="Agregar Producto al Catalogo"
            color="success"
            submit="Agregar"
            value={catalogo.precio}
            nameInputText="nombre"
            onChange={handleInputChange}
            handleClickSave={handleSubmit}
            handleClickCancelar={handleClickCancelar}
          />
        </div>
      </div>
    </div>
  );
};
export { PageAddCatalogo };
