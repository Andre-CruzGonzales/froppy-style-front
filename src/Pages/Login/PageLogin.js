import React, { useState, useEffect, useRef } from "react";
import { Login } from "../../Components/Login/Login";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "../../Routes/ValidateToken";
initAxiosInterceptors();

function PageLogin() {
  const toast = useRef(null);
  let history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  /*----------handles------*/
  const handleInputEmail = (e) => {
    setLogin({
      email: e.target.value,
      password: login.password,
    });
  };
  const handleInputPassword = (e) => {
    setLogin({
      email: login.email,
      password: e.target.value,
    });
  };

  const getMy = async () => {
    try {
      const res = await axios.get(
        "http://localhost:10801/api/my"
        //"http://20.124.206.156:10801/api/categorias/create",

        //headers: headers,
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(file);

    const res = await axios.post(
      "http://localhost:10801/api/login",
      //"http://20.124.206.156:10801/api/categorias/create",
      login
    );
    if (!res) {
      const showError = () => {
        toast.current.show({
          severity: "error",
          summary: "Error de Acceso",
          detail: "Acceso Invalido!",
          life: 3000,
        });
      };
      showError();
    }
    if (res) {
      setUsuario(res.data.user);
      setToken(res.data.token);
      console.log(res.data.user);
      if (res.data.user.rol === 1) {
        history.push("/categoryList");
      } else if (res.data.user.rol === 2) {
        history.push("/productsList");
      }
    }
  };
  /*---------------------*/
  useEffect(() => {
    //history.push("categoryList");
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
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
            console.log(1);
          }
          if (usuario.rol === 2) {
            history.push("/productsList");
          }
          if (usuario.rol === 3) {
            history.push("/home");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario();
  });
  return (
    <div>
      <Toast ref={toast} />
      <Login
        valueEmail={login.email}
        onChangeInputEmail={handleInputEmail}
        valuePassword={login.password}
        onChangeInputPassword={handleInputPassword}
        onClickLogin={handleSubmit}
      />
    </div>
  );
}
export { PageLogin };
