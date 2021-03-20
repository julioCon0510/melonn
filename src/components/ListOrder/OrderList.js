import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { queryNewPro } from "../../actions/orderListActions";
import lupa from "../../recurso/lupa.png";
import { Link } from "react-router-dom";

export default function ListOrder() {
  const dispatch = useDispatch();
  const queryListPro = () => dispatch(queryNewPro());
  const orderListReducer = useSelector((state) => state.orderListReducer);

  useEffect(() => {
    queryListPro();
  }, []);

  if (!orderListReducer.listPro[0]) return null;

  let productLista = orderListReducer.listPro[0].product;
  console.log(productLista);
  return (
    <div className="border m-4 card">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Detalle</th>
            <th>N° orden de venta</th>
            <th>Vendedor</th>
            <th>Fecha de creación</th>
            <th>Método de envio</th>
          </tr>
        </thead>
        <tbody>
          {productLista.map((e) => (
            <tr key={e.id}>
              <td>
                <Link to={`/detail-product/${e.id}`}>
                  <button className="btn btn-success btn-sm">
                    <img src={lupa} alt="" />
                  </button>
                </Link>
              </td>
              <td>{e.id}</td>
              <td>{e.store}</td>
              <td>
                {e.creationDate}:{e.creationHour}{" "}
              </td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
