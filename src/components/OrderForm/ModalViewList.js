import { Modal, Button, Table } from "react-bootstrap";
import React from "react";

export default function ModalViewList({ showView, listitemadd, setShowView }) {
  const handleClose = () => setShowView(false);
  return (
    <Modal show={showView} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ver elementos agregados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {listitemadd.length < 1 ? (
          <div className="text-center">Sin registro</div>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre del producto</th>
                  <th>Cantidad de producto</th>
                  <th>Peso del Producto</th>
                </tr>
              </thead>
              <tbody>
                {listitemadd.map((e, i) => (
                  <tr key={i}>
                    <td>{e.productName}</td>
                    <td>{e.productWeight}</td>
                    <td>{e.productqty}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
