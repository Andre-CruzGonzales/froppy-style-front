import React from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { CategoriaSearch } from "../../Components/Categoria/CategoriaSearch";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./pageProductoList.css";
import { ProductoCard } from "../../Components/Producto_2/ProductoList/ProductoCard";
import { ContainerCard } from "../../Components/Producto_2/ProductoList/ContainerCard";
import { Menu } from "../../Components/Menu/Menu";
import { MenuAdministrador } from "../../Components/Menu/MenuAdministrador";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();
const PageProductoList = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [data, setData] = useState([]);
  let history = useHistory();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [object, setobject] = useState({
    _id: null,
    nombre: "",
    categoria: "",
    estado: "A",
  });
  /*--------servicios------------*/
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
  const get = () => {
    cargarUsuario();
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/categorias/get"
        "http://20.127.134.26:10801/api/productos/get"
      );
      //"http://localhost:10801/api/categorias/get"
      //console.log(res.data);
      if (res) {
        setData(res.data);
      }

      console.log("============" + data);
    })();
  };

  const quitarVisibilidad = () => {
    (async () => {
      let estado = "A";
      if (object.estado === "A") {
        estado = "I";
      }
      if (object.estado === "I") {
        estado = "A";
      }
      console.log(estado);
      const res = await axios.put(
        //"http://20.124.206.156:10801/api/categorias/get"
        `http://20.127.134.26:10801/api/productos/visibility/${object._id}`,
        { estado: estado }
      );
      //"http://localhost:10801/api/categorias/get"
      console.log(res);
      get();
    })();
  };
  /*fin servicios---*/

  useEffect(() => {
    get();
  }, []);

  const onClickAddProducto = (e) => {
    //return <Link to={"/add"}></Link>;
    history.push("/addProduct");
  };

  /*confirmacion de visible*/
  const confirmacion_visible = (objeto) => {
    setVisible(true);

    setobject({
      _id: objeto._id,
      nombre: objeto.nombre,
      estado: objeto.estado,
      descripcion: objeto.descripcion,
    });
  };
  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Confirmado",
      detail: "Tu petición fue aceptada",
      life: 3000,
    });
    quitarVisibilidad();

    /**/
  };

  const reject = () => {
    toast.current.show({
      severity: "error",
      summary: "Rechazado",
      detail: "Tu petición fue cancelada",
      life: 3000,
    });
  };
  /*--------------------*/
  return (
    <div>
      <MenuAdministrador />
      <Toast ref={toast} />
      <CategoriaSearch />

      <Button
        label="Registrar Producto"
        icon="pi pi-pencil"
        className="p-button-primary button-edit"
        onClick={onClickAddProducto}
      />

      <ContainerCard>
        {data.map((producto) =>
          producto.estado === "A" ? (
            <div key={producto._id}>
              <ConfirmDialog
                key={producto._id + "1"}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Estas Seguro de Quitar la visibilidad de ${
                  object ? object.nombre : ""
                }`}
                header="Visibilidad"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
              />
              <ProductoCard
                key={producto._id}
                title={producto.nombre}
                image={producto.imagen}
                categoria={producto.categoria.nombre}
                onClickEdit={() => history.push(`/productEdit/${producto._id}`)}
                iconEye="eye-slash"
                colorEye="secondary"
                onClickDisabled={() => confirmacion_visible(producto)}
              />
            </div>
          ) : (
            <>
              <ConfirmDialog
                key={producto._id + "2"}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Estas Seguro de dar Visibilidad de ${
                  object ? object.nombre : ""
                }`}
                header="Visibilidad"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
              />
              <ProductoCard
                key={producto._id}
                title={producto.nombre}
                image={producto.imagen}
                categoria={producto.categoria.nombre}
                onClickEdit={() => history.push(`/productEdit/${producto._id}`)}
                iconEye="eye"
                colorEye="help"
                onClickDisabled={() => confirmacion_visible(producto)}
              />
            </>
          )
        )}
      </ContainerCard>
    </div>
  );
};
export { PageProductoList };
