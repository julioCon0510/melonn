import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../actions/formActions";
import { listShippigMethod } from "../../actions/shippingMethodActions";
import ModalCreate from "./ModalCreate";
import ModalViewList from "./ModalViewList";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const CreateProducto = () => {
  const dispatch = useDispatch();
  const addProduct = (form) => dispatch(createNewProduct(form));
  const listShipping = () => dispatch(listShippigMethod());
  const listShippingMethod = useSelector(
    (state) => state.listShippingMethodReducer
  );
  const createOrder = useSelector((state) => state);
  const history = useHistory();
  const [form, setform] = useState({
    store: "",
    method: "",
    orderNumber: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    country: "",
    region: "",
    city: "",
    lineItems: [],
  });

  const [listitemadd, setListItemAdd] = useState([]);

  const inputForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.method) {
      Swal.fire({
        title: "Falta llenar campos",
        text: "llenar el campo " + form.method,
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return false;
    }
    if (form.lineItems.length === 0) {
      Swal.fire({
        title: "Falta llenar campos",
        text: "Agregar elementos de productos ",
        icon: "warning",
        confirmButtonText: "Ok",
      });

      return false;
    }
    addProduct(form);
  };
  useEffect(() => {
    listShipping();
  }, []);

  useEffect(() => {
    setform({ ...form, ["lineItems"]: listitemadd });
    // eslint-disable-next-line
  }, [listitemadd]);

  useEffect(() => {
    if (createOrder.formReducer.status) {
      // eslint-disable-next-line
        history.push("/");
    }
  }, [createOrder.formReducer.status]);

  return (
    <div className="container pt-5">
      <button className="btn btn-light mb-2" onClick={() => history.push("/")}>
        Ver listado
      </button>
      <div className="card p-3">
        <form onSubmit={(e) => submitForm(e)} method={"POST"}>
          <h2> Creación de pedidos de venta</h2>
          <div className="row p-2">
            <div className="col-md-6">
              <label htmlFor="">Tienda del vendedor</label>
              <input
                type="text"
                name="store"
                className="form-control"
                onChange={(e) => inputForm(e)}
                required={true}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Método de envío</label>
              <select
                name="method"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
                key={0}
              >
                {<option defaultValue={null}>Escoger Una opcion</option>}
                {listShippingMethod.list_shipping.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Número de pedido externo</label>
              <input
                type="text"
                name="orderNumber"
                onChange={(e) => inputForm(e)}
                className="form-control"
                required={true}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Nombre completo del comprador</label>
              <input
                type="text"
                name="fullName"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Número de teléfono del comprador</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Correo electrónico del comprador</label>
              <input
                type="text"
                name="email"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Dirección de Envío</label>
              <input
                type="text"
                name="address"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Ciudad de envío</label>
              <input
                type="text"
                name="city"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Región de envío</label>
              <input
                type="text"
                name="region"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">País de envío</label>
              <input
                type="text"
                name="country"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="">Agregar articulo</label>
              <button
                type="button"
                className="btn btn-primary btn-block mb-3"
                onClick={() => setShow(true)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger btn-block mb-3"
                onClick={() => setShowView(true)}
              >
                Articulos agregados ({listitemadd.length})
              </button>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-block"
                style={{ backgroundColor: "#46d999" }}
              >
                Crear Orden
              </button>
            </div>
          </div>
        </form>
      </div>

      {show && (
        <ModalCreate
          show={show}
          listitemadd={listitemadd}
          setShow={setShow}
          setListItemAdd={setListItemAdd}
        />
      )}

      {showView && (
        <ModalViewList
          showView={showView}
          listitemadd={listitemadd}
          setShowView={setShowView}
        />
      )}
    </div>
  );
};

export default CreateProducto;
