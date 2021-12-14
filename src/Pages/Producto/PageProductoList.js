import React from "react";
import { Button } from "primereact/button";
import { ProductoList } from "../../Components/Producto/ProductoList";
import { ProductoSearch } from "../../Components/Producto/ProductoSearch";
import { ContainerProductoList } from "../../Components/Producto/ContainerProductoList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./pageProductoList.css";
const PageProductoList = () => {
  const [data, setData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://https://20.124.206.156:10801/api/productos/get"
      );
      console.log(res);
      setData(res.data);
    })();
  }, []);
  const onClickAddProducto = (e) => {
    //return <Link to={"/add"}></Link>;
    history.push("/addProduct");
  };

  return (
    <div>
      <ProductoSearch />

      <Button
        label="Registrar Producto"
        icon="pi pi-pencil"
        className="p-button-primary button-edit"
        onClick={onClickAddProducto}
      />

      <ContainerProductoList>
        {data.map((productos) => (
          <ProductoList
            key={productos._id}
            producto={productos.nombre}
            categoria={productos.categoria.nombre}
            imagen={productos.imagen}
            onClickEdit={() => history.push(`/categoryEdit/${productos._id}`)}
          />
        ))}
      </ContainerProductoList>
    </div>
  );
};
export { PageProductoList };
