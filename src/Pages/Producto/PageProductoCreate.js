import React from "react";
import { ProductoCreate } from "../../Components/Producto/ProductoCreate";
import { ProductoForm } from "../../Components/Producto/ProductoForm";
import "./pageProductoCreate.css";
import { useState, useEffect } from "react";
import default_upload from "../../Components/Upload/default_upload.png";
import axios from "axios";
import { useHistory } from "react-router";
const PageProductoCreate = () => {
  let history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    estado: "A",
    imagen: "",
  });

  const [file, setFile] = useState();
  const [pathImage, setPathImage] = useState(default_upload);
  //const [addCategoria, setAddCategoria] = useState(initialCategoriaState);
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:10801/api/categorias/get");
      console.log(res);
      setCategorias(res.data);
    })();
  }, []);
  const handleInputChange = (e) => {
    setProducto({
      nombre: e.target.value,
      estado: "A",
      categoria: producto.categoria,
      imagen: producto.imagen,
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
    const res = await axios.post(
      "http://localhost:10801/api/productos/create",
      formData
    );

    console.log(res);
    history.push("/ProductList");
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
  const onChangeCategoria = async (e) => {
    await setSelectedCategoria(e.value);
    const categoria_id = selectedCategoria ? selectedCategoria._id : null;
    await setProducto({
      nombre: producto.nombre,
      estado: "A",
      categoria: categoria_id,
      imagen: producto.imagen,
    });
    console.log("categoria" + categoria_id);
  };
  return (
    <div>
      <div className="contenedor">
        <div className="item-1">
          <ProductoCreate
            producto={producto.nombre}
            categoria={selectedCategoria ? selectedCategoria.nombre : null}
            pathImage={pathImage}
          ></ProductoCreate>
        </div>
        <div className="item-2">
          <ProductoForm
            categoria={selectedCategoria ? selectedCategoria.nombre : null}
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
          />
        </div>
      </div>
    </div>
  );
};
export { PageProductoCreate };
