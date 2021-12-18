//import logo from "./logo.svg";
//import './App.css';
import { Route, Switch } from "react-router-dom";
/*import { PageCategoriaList } from "./Pages/Categoria/PageCategoriaList"*/
import { PageCategoriaList } from "./Pages/Categoria_2/PageCategoriaList";
/*import { PageCategoria } from "./Pages/Categoria/PageCategoria";*/
import { PageCategoriaEdit } from "./Pages/Categoria_2/PageCategoriaEdit";
import { PageProductoCreate } from "./Pages/Producto_2/PageProductoCreate";
import { PageProductoList } from "./Pages/Producto_2/PageProductoList";
import { PageCategoriaCreate } from "./Pages/Categoria_2/PageCategoriaCreate";
import { PageProductoEdit } from "./Pages/Producto_2/PageProductoEdit";
import { Menu } from "./Components/Menu/Menu";
import { PageProductosList } from "./Pages/Catalogo/PageProductosList";
import { PageAddCatalogo } from "./Pages/Catalogo/PageAddCatalogo";
import { PageMyCatalogo } from "./Pages/Catalogo/PageMyCatalogo";
import { PageLogin } from "./Pages/Login/PageLogin";
import { PageRegistro } from "./Pages/Login/PageRegistro";

function App() {
  return (
    <>
      {/*<Menu />*/}
      <Switch>
        <Route path="/addCategory" component={PageCategoriaCreate} exact />
        <Route path="/categoryList" component={PageCategoriaList} exact />
        <Route path="/categoryEdit/:id" component={PageCategoriaEdit} exact />
        <Route path="/addProduct" component={PageProductoCreate} exact />
        <Route path="/ProductList" component={PageProductoList} exact />
        <Route path="/productEdit/:id" component={PageProductoEdit} exact />
        <Route path="/productsList" component={PageProductosList} exact />
        <Route path="/addCatalogo/:id" component={PageAddCatalogo} exact />
        <Route path="/myCatalogo" component={PageMyCatalogo} exact />
        <Route path="/" component={PageLogin} exact />
        <Route path="/RegistroCliente" component={PageRegistro} exact />
      </Switch>
    </>
  );
}

export default App;
