import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { CategoriaSearch } from "../../Components/Categoria/CategoriaSearch";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./pageProductosList.css";
import { ProductoCard } from "../../Components/Catalogo/Productos/ProductoCard";
import { ContainerCard } from "../../Components/Catalogo/Productos/ContainerCard";
import { ProductoCardView } from "../../Components/Catalogo/Productos/ProductoCardView";
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
const PageProductosList = () => {
  const [data, setData] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  let history = useHistory();
  const toast = useRef(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
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
  const get = () => {
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/categorias/get"
        "http://localhost:10801/api/catalogos/productos/get"
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
        `http://localhost:10801/api/productos/visibility/${object._id}`,
        { estado: estado }
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

  const onClickAddProducto = (e) => {
    //return <Link to={"/add"}></Link>;
    history.push("/addProduct");
  };

  /*confirmacion de visible*/
  const handleClickAgregarProducto = (objeto) => {
    setVisible(true);

    setobject({
      _id: objeto._id,
      nombre: objeto.nombre,
      estado: objeto.estado,
      descripcion: objeto.descripcion,
      categoria: objeto.categoria,
      imagen: objeto.imagen,
    });
  };
  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Confirmado",
      detail: "Tu petición fue aceptada",
      life: 3000,
    });
    history.push(`addCatalogo/${object._id}`);

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

  const onClick = (objeto) => {
    setDisplayResponsive(true);
    setobject({
      _id: objeto._id,
      nombre: objeto.nombre,
      estado: objeto.estado,
      descripcion: objeto.descripcion,
      categoria: objeto.categoria,
      imagen: objeto.imagen,
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
        <Button
          label="OK"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <div>
      <Toast ref={toast} />
      <Menu />
      <CategoriaSearch />

      <ContainerCard>
        {data.map((producto) => (
          <div key={producto._id}>
            <Dialog
              key={producto._id + "a"}
              header="Producto"
              visible={displayResponsive}
              onHide={() => onHide("displayResponsive")}
              breakpoints={{ "960px": "75vw" }}
              style={{ width: "50vw" }}
              footer={renderFooter("displayResponsive")}
            >
              <ProductoCardView
                key={producto._id + "b"}
                nombre={object.nombre}
                categoria={object.categoria.nombre}
                descripcion={object.descripcion}
                pathImage={object.imagen}
              />
            </Dialog>
            <ConfirmDialog
              key={producto._id + "c"}
              visible={visible}
              onHide={() => setVisible(false)}
              message={`Estas Seguro de Agregar ${
                object ? object.nombre : ""
              } a su catalogo `}
              header="Agregar al Catalogo"
              icon="pi pi-exclamation-circle"
              accept={accept}
              reject={reject}
            />
            <ProductoCard
              key={producto._id}
              title={producto.nombre}
              image={producto.imagen}
              categoria={producto.categoria.nombre}
              onClickEdit={() => history.push(`/productEdit/${producto._id}`)}
              onClickInfo={() => onClick(producto)}
              onClickAdd={() => handleClickAgregarProducto(producto)}
            />
          </div>
        ))}
      </ContainerCard>
    </div>
  );
};
export { PageProductosList };
