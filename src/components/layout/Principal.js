import React, { useEffect } from "react";
import style from "./Principal.module.css";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import OrderList from "../ListOrder/OrderList";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../actions/formActions";

const Principal = () => {
  const dispatch = useDispatch();
  const disChange = () => dispatch(changeStatus());

  useEffect(() => {
    disChange();
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  return (
    <div className={style.divPrincipal}>
      <div className={style.logo}>
        <img
          src="https://uploads-ssl.webflow.com/6006f58a9bc1bb84abf7f9b6/60410634f9cd0d8e16a5617e_00%20Logo.png"
          alt="melonn"
          width="150"
        />
      </div>
      <Row>
        <Col xs={12} md={6} className={style.contenedor}>
          <div className={style.textP}>Bienvenido a Melonn</div>
          <div className={style.textS}>Administre tus pedidos facilmente.</div>
          <div className={style.button}>
            <button onClick={() => history.push("/create-product")}>
              Crear pedido
            </button>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <OrderList />
        </Col>
      </Row>
    </div>
  );
};

export default Principal;
