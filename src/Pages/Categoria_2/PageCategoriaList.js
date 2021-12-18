import React from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { CategoriaSearch } from "../../Components/Categoria/CategoriaSearch";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./pageCategoriaList.css";
import { CategoriaCard } from "../../Components/Categoria_2/CategoriaList/CategoriaCard";
import { ContainerCard } from "../../Components/Categoria_2/CategoriaList/ContainerCard";
import { Menu } from "../../Components/Menu/Menu";
import { MenuAdministrador } from "../../Components/Menu/MenuAdministrador";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();
const PageCategoriaList = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  const [data, setData] = useState([]);
  let history = useHistory();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [object, setobject] = useState({
    _id: null,
    nombre: "",
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
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/categorias/get"
        "http://20.127.134.26:10801/api/categorias/get"
      );
      //"http://20.127.134.26:10801/api/categorias/get"

      console.log("============" + data);
      setData(res.data);
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
        `http://20.127.134.26:10801/api/categorias/visibility/${object._id}`,
        { estado: estado }
      );
      //"http://20.127.134.26:10801/api/categorias/get"
      console.log(res);
      get();
    })();
  };
  /*fin servicios---*/

  useEffect(() => {
    //cargarUsuario();
    get();
  }, []);

  const onClickAddCategoria = (e) => {
    //return <Link to={"/add"}></Link>;
    history.push("/addCategory");
  };

  /*confirmacion de visible*/
  const confirmacion_visible = (objeto) => {
    setVisible(true);

    setobject({
      _id: objeto._id,
      nombre: objeto.nombre,
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
  return (
    <div>
      <MenuAdministrador />
      <Toast ref={toast} />
      <CategoriaSearch />

      <Button
        label="Registrar Categoria"
        icon="pi pi-pencil"
        className="p-button-primary button-edit"
        onClick={onClickAddCategoria}
      />

      <ContainerCard>
        {data.map((categoria) =>
          categoria.estado === "A" ? (
            <div key={categoria._id}>
              <ConfirmDialog
                key={categoria._id + "a"}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Estas Seguro de Quitar la visibilidad de ${object.nombre}`}
                header="Visibilidad"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
              />
              <CategoriaCard
                key={categoria._id}
                title={categoria.nombre}
                image={categoria.imagen}
                onClickEdit={() =>
                  history.push(`/categoryEdit/${categoria._id}`)
                }
                iconEye="eye-slash"
                colorEye="secondary"
                onClickDisabled={() => confirmacion_visible(categoria)}
              />
            </div>
          ) : (
            <>
              <ConfirmDialog
                key={categoria._id + "a"}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Estas Seguro de dar Visibilidad de ${object.nombre}`}
                header="Visibilidad"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
              />
              <CategoriaCard
                key={categoria._id}
                title={categoria.nombre}
                image={categoria.imagen}
                onClickEdit={() =>
                  history.push(`/categoryEdit/${categoria._id}`)
                }
                iconEye="eye"
                colorEye="help"
                onClickDisabled={() => confirmacion_visible(categoria)}
              />
            </>
          )
        )}
      </ContainerCard>
    </div>
  );
};
export { PageCategoriaList };
