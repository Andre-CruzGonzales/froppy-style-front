import React from "react";
import "./registro.css";
import avatar from "../avatar.svg";
import wave from "../wave.png";
import bg from "../bg.svg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
function Registro(props) {
  return (
    <div className="">
      <img className="wave" src={wave} />
      <div className="container">
        <div className="img">
          <img src={bg} />
        </div>
        <div className="login-content">
          <form action="">
            <img src={avatar} />
            <h2 className="title">REGISTRATE</h2>
            <div className="p-field p-col-12 p-md-4 input-div-register">
              <span className="p-float-label p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  className="input-register"
                  id="lefticon"
                  style={{ outline: "none !important" }}
                  onChange={props.onChangeInputNombre}
                  value={props.valueNombre}
                />
                <label htmlFor="lefticon" className="label-register">
                  Nombre
                </label>
              </span>
            </div>
            <div className="p-field p-col-12 p-md-4 input-div-register">
              <span className="p-float-label p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  className="input-register"
                  id="lefticon"
                  style={{ outline: "none !important" }}
                  onChange={props.onChangeInputApellido}
                  value={props.valueApellido}
                />
                <label htmlFor="lefticon" className="label-register">
                  Apellidos
                </label>
              </span>
            </div>
            <div className="p-field p-col-12 p-md-4 input-div-register">
              <span className="p-float-label p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  className="input-register"
                  id="lefticon"
                  style={{ outline: "none !important" }}
                  onChange={props.onChangeInputEmail}
                  value={props.valueEmail}
                />
                <label htmlFor="lefticon" className="label-register">
                  Email
                </label>
              </span>
            </div>
            <div className="p-field p-col-12 p-md-4 input-div-register">
              <span className="p-float-label p-input-icon-left">
                <i className="pi pi-user" />
                <Password
                  inputId="password"
                  className="input-register"
                  toggleMask
                  style={{ outline: "none !important" }}
                  onChange={props.onChangeInputPassword}
                  value={props.valuePassword}
                />

                <label htmlFor="password" className="label-register">
                  Password
                </label>
              </span>
            </div>

            <button
              className="btn"
              value="Login"
              onClick={props.onClickRegistrar}
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export { Registro };
