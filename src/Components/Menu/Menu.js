import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
const Menu = () => {
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
  };
  const items = [
    { label: "Home", icon: "pi pi-fw pi-home" },
    { label: "Categoria", icon: "pi pi-fw pi-calendar" },
    { label: "Producto", icon: "pi pi-fw pi-pencil" },
  ];

  return (
    <div>
      <div className="card">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
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
export { Menu };
