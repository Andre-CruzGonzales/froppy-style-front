import React from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./productoSearch.css";
import { useState } from "react";
function ProductoSearch() {
  const [value3, setValue3] = useState("");
  return (
    <div className="categoria-search">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          placeholder="Search"
          className="input-text-search"
        />
      </span>
    </div>
  );
}
export { ProductoSearch };
