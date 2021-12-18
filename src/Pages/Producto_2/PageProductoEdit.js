import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { ProductoCard } from "../../Components/Producto_2/ProductoCreate/ProductoCard";
import { ProductoForm } from "../../Components/Producto_2/ProductoCreate/ProductoForm";
import default_upload from "../../Components/Upload/default_upload.png";
import { Menu } from "../../Components/Menu/Menu";
import { MenuAdministrador } from "../../Components/Menu/MenuAdministrador";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();
const PageProductoEdit = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  let history = useHistory();
  const [producto, setProducto] = useState({
    nombre: "",
    _id: "",
    imagen: null,
    estado: "A",
    descripcion: "",
    categoria: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [file, setFile] = useState();
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [pathImage, setPathImage] = useState(default_upload);
  let params = useParams();
  /*-----------------------servicios-------------------*/
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
  const getCategorias = () => {
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/productos/create"
        "http://20.127.134.26:10801/api/categorias/get"
      );
      console.log(res);
      setCategorias(res.data);
    })();
  };
  /*------------fin servicios---------------*/
  useEffect(() => {
    cargarUsuario();
    (async () => {
      const res = await axios.get(
        `http://20.127.134.26:10801/api/productos/get/${params.id}`
      );
      console.log(res.data.categoria);
      setProducto(res.data);
      setSelectedCategoria(res.data.categoria);
      getCategorias();
    })();
  }, [params.id]);

  const handleInputChange = (e) => {
    setProducto({
      nombre: e.target.value,
      imagen: producto.imagen,
      _id: producto._id,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
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
    e.preventDefault();
    //console.log(file);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("nombre", producto.nombre);
    formData.append("estado", producto.estado);
    formData.append("descripcion", producto.descripcion);
    formData.append("categoria", producto.categoria);
    const res = await axios.put(
      //`http://20.124.206.156:10801/api/categorias/update/${params.id}`,
      `http://20.127.134.26:10801/api/productos/update/${params.id}`,
      formData
    );
    console.log(res);
    //history.push("/productList");
  };
  const onChangeCategoria = (e) => {
    setSelectedCategoria(e.value);
    const categoria_id = selectedCategoria ? selectedCategoria._id : null;
    setProducto({
      nombre: producto.nombre,
      estado: "A",
      categoria: selectedCategoria._id,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
    });
    console.log(categoria_id);
    console.log(selectedCategoria);
  };
  const onFileChange = (e) => {
    console.log(e);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type.includes("image")) {
        setProducto({
          nombre: producto.nombre,
          imagen: null,
          estado: producto.estado,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
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
    history.push("../productList");
  };
  return (
    <div>
      <MenuAdministrador />
      <div className="contenedor-form-producto">
        <div className="item-1">
          {producto.imagen ? (
            <ProductoCard
              nombre={producto.nombre}
              categoria={selectedCategoria ? selectedCategoria.nombre : null}
              descripcion={producto.descripcion}
              pathImage={producto.imagen}
            />
          ) : (
            <ProductoCard
              nombre={producto.nombre}
              categoria={selectedCategoria ? selectedCategoria.nombre : null}
              descripcion={producto.descripcion}
              pathImage={pathImage}
            />
          )}
        </div>
        <div className="item-2">
          <ProductoForm
            categoria={selectedCategoria ? selectedCategoria : null}
            selectedCategoria={selectedCategoria}
            categorias={categorias}
            onChangeCategoria={onChangeCategoria}
            title="Editar Producto"
            color="warning"
            submit="Editar"
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
export { PageProductoEdit };
