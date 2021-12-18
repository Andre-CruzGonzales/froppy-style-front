import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { deleteToken } from "../../Routes/ValidateToken";
const MenuAdministrador = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const history = useHistory();
  const handleTabChange = async (e) => {
    console.log(e.value);
    setActiveIndex(e.value);
    if (activeIndex.label === "Categoria") {
      await history.push("/categoryList");
    }
    if (activeIndex.label === "Home") {
      await history.push("/");
    }
    if (activeIndex.label === "Producto") {
      await history.push("/productList");
    }
    if (activeIndex.label === "Productos") {
      await history.push("/productsList");
    }
    if (activeIndex.label === "Mi Catalogo") {
      await history.push("/myCatalogo");
    }
    if (activeIndex.label === "Cerrar Sesión") {
      deleteToken();
      await history.push("/");
    }
  };
  const items = [
    { id: 2, label: "Categoria", icon: "pi pi-inbox" },
    { id: 3, label: "Producto", icon: "pi pi-briefcase" },
    { id: 6, label: "Cerrar Sesión", icon: "pi pi-power-off" },
  ];

  return (
    <div>
      <div className="card">
        <TabMenu
          model={items}
          onTabChange={handleTabChange}
          activeIndex={items}
        />
      </div>

      <div className="card">
        {/*<h5>Programmatic</h5>
        <div className="p-pt-2 p-pb-4">
          <Button
            onClick={() => setActiveIndex(0)}
            className="p-button-text"
            label="Activate 1st"
          />
          <Button
            onClick={() => setActiveIndex(1)}
            className="p-button-text"
            label="Activate 2nd"
          />
          <Button
            onClick={() => setActiveIndex(2)}
            className="p-button-text"
            label="Activate 3rd"
          />
        </div>

        {/*<TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />*/}
      </div>
    </div>
  );
};
export { MenuAdministrador };
