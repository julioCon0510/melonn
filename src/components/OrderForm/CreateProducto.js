import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../actions/formActions";
import { listShippigMethod } from "../../actions/shippingMethodActions";
import ModalCreate from "./ModalCreate";
import ModalViewList from "./ModalViewList";
import { useHistory } from "react-router-dom";

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
      alert("llenar el campo " + form.method);
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

  //   const handleShow = () => setShow(true);

  return (
    <div className="container pt-5">
      <div className="card p-3">
        <form onSubmit={(e) => submitForm(e)} method={"POST"}>
          <h2> Sell order creation</h2>
          <div className="row p-2">
            <div className="col-md-6">
              <label htmlFor="">Seller store</label>
              <input
                type="text"
                name="store"
                className="form-control"
                onChange={(e) => inputForm(e)}
                required={true}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Shipping method</label>
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
              <label htmlFor="">External order number</label>
              <input
                type="text"
                name="orderNumber"
                onChange={(e) => inputForm(e)}
                className="form-control"
                required={true}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Buyer full name</label>
              <input
                type="text"
                name="fullName"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Buyer phone number</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Buyer email</label>
              <input
                type="text"
                name="email"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Shipping address</label>
              <input
                type="text"
                name="address"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Shipping city</label>
              <input
                type="text"
                name="city"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Shipping region</label>
              <input
                type="text"
                name="region"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Shipping country</label>
              <input
                type="text"
                name="country"
                onChange={(e) => inputForm(e)}
                required={true}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="">Line items</label>
              <button
                type="button"
                className="btn btn-primary btn-block mb-3"
                onClick={() => setShow(true)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-primary btn-block mb-3"
                onClick={() => setShowView(true)}
              >
                View added list
              </button>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-block"
                style={{ backgroundColor: "#46d999" }}
              >
                Create Order
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
