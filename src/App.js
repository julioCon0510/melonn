import CreateProducto from "./components/OrderForm/CreateProducto";
import Principal from "./components/layout/Principal";
import DetailOrden from "./components/OrderForm/DetailOrden";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./stores/stores";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Principal} />
          <Route exact path="/create-product" component={CreateProducto} />
          <Route exact path="/detail-product/:id" component={DetailOrden} />
        </Switch>
      </Provider>
    </Router>
  );
}
export default App;
