import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { CategoriaSearch } from "../../Components/Categoria/CategoriaSearch";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./pageMyCatalogo.css";
import { CatalogoForm } from "../../Components/Catalogo/AddCatalogo/CatalogoForm";
import { CatalogoCard } from "../../Components/Catalogo/MyCatalogo/CatalogoCard";
import { ContainerCard } from "../../Components/Catalogo/MyCatalogo/ContainerCard";
import { CatalogoCardEdit } from "../../Components/Catalogo/MyCatalogo/CatalogoCardEdit";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Menu } from "../../Components/Menu/Menu";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();
const PageMyCatalogo = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [data, setData] = useState([]);
  let history = useHistory();
  const toast = useRef(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [visible, setVisible] = useState(false);
  const [object, setobject] = useState({
    _id: null,
    producto: null,
    usuario: null,
    estado: "A",
    precio_venta: 0,
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
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/categorias/get"
        "http://20.127.134.26:10801/api/catalogos/get"
      );
      //"http://localhost:10801/api/categorias/get"
      if (res) {
        console.log(res.data);
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
        `http://20.127.134.26:10801/api/catalogos/visibility/${object._id}`,
        { estado: estado }
      );
      //"http://localhost:10801/api/categorias/get"
      console.log(res);
      get();
    })();
  };
  const editarCatalogo = () => {
    (async () => {
      const res = await axios.put(
        //"http://20.124.206.156:10801/api/categorias/get"
        `http://20.127.134.26:10801/api/catalogos/update/${object._id}`,
        { precio_venta: object.precio_venta }
      );
      //"http://localhost:10801/api/categorias/get"
      console.log(res);
      get();
    })();
  };
  /*fin servicios---*/

  useEffect(() => {
    cargarUsuario();
    get();
  }, []);

  /*confirmacion de visible*/
  const confirmacion_visible = (objeto) => {
    setVisible(true);

    setobject({
      _id: objeto._id,
      producto: objeto.producto,
      precio_venta: objeto.precio_venta,
      estado: objeto.estado,
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
  /*-----dialog--------*/
  const onClick = (objeto) => {
    setDisplayResponsive(true);
    setobject({
      _id: objeto._id,
      producto: objeto.producto,
      precio_venta: objeto.precio_venta,
      estado: objeto.estado,
    });
    if (position) {
      setPosition(position);
    }
  };
  const onHide = () => {
    setDisplayResponsive(false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        {/*<Button
          label="OK"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />*/}
      </div>
    );
  };

  /*----------------*/
  /*------handle input------*/
  const handleClickCancelar = (e) => {
    setDisplayResponsive(false);
  };
  const handleInputChange = (e) => {
    setobject({
      _id: object._id,
      producto: object.producto,
      precio_venta: e.target.value,
      estado: object.estado,
    });
    console.log(object);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);

    const res = await axios.put(
      //`http://20.124.206.156:10801/api/categorias/update/${params.id}`,
      `http://20.127.134.26:10801/api/catalogos/update/${object._id}`,
      { precio: object.precio_venta }
    );
    console.log(res);
    get();
    setDisplayResponsive(false);

    //history.push("/productList");
  };

  /*--------------*/
  return (
    <div>
      <Toast ref={toast} />
      <Menu />
      <CategoriaSearch />

      <ContainerCard>
        {data.map((catalogo) =>
          catalogo.estado === "A" ? (
            <div key={catalogo._id}>
              <Dialog
                key={catalogo._id + "a"}
                header="Producto"
                visible={displayResponsive}
                onHide={() => onHide("displayResponsive")}
                breakpoints={{ "960px": "75vw" }}
                style={{ width: "50vw" }}
                footer={renderFooter("displayResponsive")}
              >
                <div key={catalogo._id + "b"} className="my-catalogo-edit">
                  <div key={catalogo._id + "c"} className="item-1">
                    <CatalogoCardEdit
                      key={catalogo._id + "d"}
                      precio={object.precio_venta}
                      nombre={object.producto ? object.producto.nombre : ""}
                      categoria={
                        object.producto ? object.producto.categoria.nombre : ""
                      }
                      image={object.producto ? object.producto.imagen : ""}
                    />
                  </div>
                  <div key={catalogo._id + "e"} className="item-2">
                    <CatalogoForm
                      key={catalogo._id + "f"}
                      color="warning"
                      submit="editar"
                      title="Editar Catalogo"
                      onChange={handleInputChange}
                      value={object.precio_venta}
                      handleClickSave={handleSubmit}
                      handleClickCancelar={handleClickCancelar}
                    />
                  </div>
                </div>
              </Dialog>
              <ConfirmDialog
                key={catalogo._id + "g"}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Estas Seguro de Quitar la Visibilidad de ${
                  object.producto ? object.producto.nombre : ""
                } `}
                header="Agregar al Catalogo"
                icon="pi pi-exclamation-circle"
                accept={accept}
                reject={reject}
              />
              <CatalogoCard
                key={catalogo._id}
                nombre={catalogo.producto.nombre}
                image={catalogo.producto.imagen}
                categoria={catalogo.producto.nombre}
                precio={catalogo.precio_venta}
                iconEye="eye-slash"
                colorEye="secondary"
                onClickDisabled={() => confirmacion_visible(catalogo)}
                onClickEdit={() => onClick(catalogo)}
              />
            </div>
          ) : (
            <>
              <ConfirmDialog
                key={catalogo._id + "1"}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Estas Seguro de Agregar ${
                  object.producto ? object.producto.nombre : ""
                } a su catalogo `}
                header="Agregar al Catalogo"
                icon="pi pi-exclamation-circle"
                accept={accept}
                reject={reject}
              />
              <CatalogoCard
                key={catalogo._id}
                nombre={catalogo.producto.nombre}
                image={catalogo.producto.imagen}
                categoria={catalogo.producto.nombre}
                precio={catalogo.precio_venta}
                iconEye="eye"
                colorEye="help"
                onClickDisabled={() => confirmacion_visible(catalogo)}
                onClickEdit={() => onClick(catalogo)}
              />
            </>
          )
        )}
      </ContainerCard>
    </div>
  );
};
export { PageMyCatalogo };
