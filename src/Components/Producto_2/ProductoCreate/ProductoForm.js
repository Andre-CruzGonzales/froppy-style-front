import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import "./productoForm.css";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
const ProductoForm = (props) => {
  return (
    <div>
      <form className="formulario-categoria">
        <h3 className="titulo-formulario">{props.title}</h3>
        <div className="card">
          <div className="p-fluid p-grid">
            <div className="form-producto-div">
              <span className="p-float-label">
                <InputText
                  id="inputtext"
                  value={props.value}
                  onChange={props.onChange}
                  name={props.nameInputText}
                />
                <label htmlFor="inputtext">Producto:</label>
              </span>
            </div>
            <div className="form-producto-div">
              <span className="p-float-label">
                <InputTextarea
                  value={props.valueTextArea}
                  onChange={props.onChangeInputArea}
                  rows={5}
                  cols={30}
                  autoResize
                />
                <label htmlFor="inputtext">Descripcion:</label>
              </span>
            </div>
            <div className="form-producto-div">
              <span className="">
                <Dropdown
                  value={props.selectedCategoria}
                  options={props.categorias}
                  onChange={props.onChangeCategoria}
                  optionLabel="nombre"
                  filter
                  showClear
                  filterBy="nombre"
                  placeholder="Selecciona una Categoría"
                  valueTemplate={props.selectedCountryTemplate}
                  itemTemplate={props.countryOptionTemplate}
                />
              </span>
            </div>
            <div className="form-producto-div">
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

export { ProductoForm };
