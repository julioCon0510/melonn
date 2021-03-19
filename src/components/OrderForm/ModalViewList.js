import { Modal, Button, Table } from "react-bootstrap";
import React from "react";

export default function ModalViewList({ showView, listitemadd, setShowView }) {
  const handleClose = () => setShowView(false);
  return (
    <Modal show={showView} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View added items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {listitemadd.length < 1 ? (
          <div className="text-center">Not data</div>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Product quantity</th>
                  <th>Product weight</th>
                </tr>
              </thead>
              <tbody>
                {listitemadd.map((e) => (
                  <tr>
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
