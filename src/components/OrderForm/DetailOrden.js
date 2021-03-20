import React, { useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { queryListID } from "../../actions/orderListActions";
export default function DetailOrden() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const ListOrden = useSelector((state) => state.orderListReducer.listProId);
  const queryListProId = () => dispatch(queryListID(id));

  useEffect(() => {
    queryListProId(id);
  }, []);

  const history = useHistory();

  //   if (ListOrden) return null;

  const data = ListOrden.data;

  if (data === undefined) return null;
  let res = data[0];

  console.log(res);

  //   data.forEach((element) => {
  //     console.log(element);
  //   });

  return (
    <div className="container pt-5">
      <button className="btn btn-light mb-2" onClick={() => history.push("/")}>
        Ver listado
      </button>
      <div className="card p-3">
        <h2>
          Detalles del pedidos de venta <br></br>N° {id}
        </h2>
        <div className="pt-3">
          <h5>Información del pedido</h5>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="">Número de pedido externo</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.orderNumber}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Nombre del comprador</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.fullName}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Teléfono del comprador</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.phoneNumber}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Correo del comprador</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.email}
            />
          </div>
        </div>
        <div className="pt-3">
          <h5>Datos de envio</h5>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="">Dirección de envio</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.address}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Ciudad de envio</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.city}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Región de envio</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.region}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Páis de envio</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.country}
            />
          </div>
        </div>
        <div className="pt-3">
          <h5>Fechas de promesa</h5>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="">pack promise max</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.pack_promise_max}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">pack promise min</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.pack_promise_min}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">ship promise max</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.ship_promise_max}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">ship promise min</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.ship_promise_min}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">delivery promise max</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.delivery_promise_max}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">delivery promise min</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.delivery_promise_min}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">ready pickup promise max</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.ready_pickup_promise_max}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">ready pickup promise min</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={res.promise.ready_pickup_promise_min}
            />
          </div>
        </div>
        <div className="pt-3">
          <h5>Líneas de pedido</h5>
        </div>
        <div className="row">
          {res.lineItems.map((e, i) => (
            <Fragment key={i}>
              <div className="col-md-4">
                <label htmlFor="">Nombre del producto</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={e.productName}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="">Cantidad de producto</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={e.productWeight}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="">Peso del producto</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={e.productqty}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
