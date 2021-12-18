import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Registro } from "../../Components/Login/Registro/Registro";
import axios from "axios";
import { Toast } from "primereact/toast";
function PageRegistro() {
  const toast = useRef(null);
  let history = useHistory();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    rol: 2,
    estado: "A",
    email: "",
    password: "",
  });
  /*-------------servicios------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);

    const res = await axios.post(
      "http://20.127.134.26:10801/api/usuarios/create",
      //"http://20.124.206.156:10801/api/categorias/create",
      usuario
    );
    if (!res) {
      return showError("Error al registrar");
    }
    if (res.status === 200) {
      showSuccess();
      return history.push("/");
    } else {
      return showError("Error en el correo electronico");
    }
    //history.push("/");

    //console.log(res);
  };
  /*---------------------------*/
  const handleInputNombre = (e) => {
    setUsuario({
      nombre: e.target.value,
      apellido: usuario.apellido,
      rol: 2,
      estado: "A",
      email: usuario.email,
      password: usuario.password,
    });
  };
  const handleInputApellido = (e) => {
    setUsuario({
      nombre: usuario.nombre,
      apellido: e.target.value,
      rol: 2,
      estado: "A",
      email: usuario.email,
      password: usuario.password,
    });
  };
  const handleInputEmail = (e) => {
    setUsuario({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 2,
      estado: "A",
      email: e.target.value,
      password: usuario.password,
    });
  };
  const handleInputPassword = (e) => {
    setUsuario({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 2,
      estado: "A",
      email: usuario.email,
      password: e.target.value,
    });
  };
  /*---------------toast----------*/
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Message Content",
      life: 3000,
    });
  };
  const showError = (detalle) => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: detalle ? detalle : "Message Content",
      life: 3000,
    });
  };
  return (
    <div>
      <Toast ref={toast} />
      <Registro
        onChangeInputNombre={handleInputNombre}
        valueNombre={usuario.nombre}
        onChangeInputApellido={handleInputApellido}
        valueApellido={usuario.apellido}
        onChangeInputEmail={handleInputEmail}
        valueEmail={usuario.email}
        onChangeInputPassword={handleInputPassword}
        valuePassword={usuario.password}
        onClickRegistrar={handleSubmit}
      />
    </div>
  );
}
export { PageRegistro };
