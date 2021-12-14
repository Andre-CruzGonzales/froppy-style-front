//import logo from "./logo.svg";
//import './App.css';
import { Route, Switch } from "react-router-dom";
import { PageCategoriaList } from "./Pages/Categoria/PageCategoriaList";
import { PageCategoria } from "./Pages/Categoria/PageCategoria";
import { PageCategoriaEdit } from "./Pages/Categoria/PageCategoriaEdit";
import { PageProductoCreate } from "./Pages/Producto/PageProductoCreate";
import { PageProductoList } from "./Pages/Producto/PageProductoList";
import { Menu } from "./Components/Menu/Menu";

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/addCategory" component={PageCategoria} exact />
        <Route path="/categoryList" component={PageCategoriaList} exact />
        <Route path="/categoryEdit/:id" component={PageCategoriaEdit} exact />
        <Route path="/addProduct" component={PageProductoCreate} exact />
        <Route path="/ProductList" component={PageProductoList} exact />
      </Switch>
    </>
  );
}

export default App;
