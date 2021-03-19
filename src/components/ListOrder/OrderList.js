import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { queryNewPro } from "../../actions/orderListActions";

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
                <button className="btn btn-success btn-sm"></button>
              </td>
              <td>{e.id}</td>
              <td>{e.store}</td>
              <td>2021-03-19</td>
              <td>{e.method}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
