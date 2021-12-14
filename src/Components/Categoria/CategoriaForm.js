import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import "./categoriaForm.css";
import { Button } from "primereact/button";
const CategoriaForm = (props) => {
  return (
    <div>
      <form className="formulario-categoria">
        <h3 className="titulo-formulario">{props.title}</h3>
        <div className="card">
          <div className="p-fluid p-grid">
            <div className="form-div">
              <span className="p-float-label">
                <InputText
                  id="inputtext"
                  value={props.value}
                  onChange={props.onChange}
                  name={props.nameInputText}
                />
                <label htmlFor="inputtext">Categoria:</label>
              </span>
            </div>

            <div className="form-div">
              <span className="">
                <InputText
                  type="file"
                  id="inputtext"
                  onChange={props.onFileChange}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="button-center">
          <Button
            type="button"
            label={props.submit}
            className={`p-button-rounded p-button-${props.color} button`}
            onClick={props.handleClickSave}
          />
          <Button
            type="button"
            label="Cancelar"
            className="p-button-rounded p-button-danger button"
            onClick={props.handleClickCancelar}
          />
        </div>
      </form>
    </div>
  );
};

export { CategoriaForm };
