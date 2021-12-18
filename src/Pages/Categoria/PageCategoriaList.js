import React from "react";
import { Button } from "primereact/button";
import { CategoriaList } from "../../Components/Categoria/CategoriaList";
import { CategoriaSearch } from "../../Components/Categoria/CategoriaSearch";
import { ContainerCategoriaList } from "../../Components/Categoria/ContainerCategoriaList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./pageCategoriaList.css";
import { CategoriaCard } from "../../Components/Categoria_2/CategoriaList/CategoriaCard";
import { ContainerCard } from "../../Components/Categoria_2/CategoriaList/ContainerCard";
const PageCategoriaList = () => {
  const [data, setData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        //"http://20.124.206.156:10801/api/categorias/get"
        "http://20.127.134.26:10801/api/categorias/get"
      );
      //"http://localhost:10801/api/categorias/get"
      console.log(res);
      setData(res.data);
    })();
  }, []);
  const onClickAddCategoria = (e) => {
    //return <Link to={"/add"}></Link>;
    history.push("/addCategory");
  };

  return (
    <div>
      <CategoriaSearch />

      <Button
        label="Registrar Categoria"
        icon="pi pi-pencil"
        className="p-button-primary button-edit"
        onClick={onClickAddCategoria}
      />

      {/*<ContainerCategoriaList>
        {/*data.map((categorias) => (
          <CategoriaList
            key={categorias._id}
            categoria={categorias.nombre}
            imagen={categorias.imagen}
            onClickEdit={() => history.push(`/categoryEdit/${categorias._id}`)}
          />
        ))*/}
      {/*</ContainerCategoriaList>
       */}
      <ContainerCard>
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
        <CategoriaCard title="Categoria" desc="asd" />
      </ContainerCard>
    </div>
  );
};
export { PageCategoriaList };
