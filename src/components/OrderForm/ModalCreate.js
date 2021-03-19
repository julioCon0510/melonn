import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ModalCreate({
  show,
  listitemadd,
  setShow,
  setListItemAdd,
}) {
  const handleClose = () => setShow(false);
  const [form, setform] = useState({
    productName: "",
    productqty: "",
    productWeight: "",
  });

  const inputForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const saveItems = () => {
    if (
      form.productName === "" ||
      form.productqty === "" ||
      form.productWeight === ""
    ) {
      Swal.fire({
        title: "Warning!",
        text: "fill all the fields",
        icon: "warning",
        confirmButtonText: "Ok",
      });

      return false;
    }

    Swal.fire({
      title: "Successfully!",
      text: "Product added successfully",
      icon: "success",
      confirmButtonText: "Cool",
    });
    setShow(false);
    setListItemAdd([...listitemadd, form]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form method="post">
        <Modal.Header closeButton>
          <Modal.Title>Add items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              name="productName"
              placeholder="Product name"
              onChange={(e) => inputForm(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Product quantity</Form.Label>
            <Form.Control
              name="productqty"
              type="number"
              placeholder="Product quantity"
              onChange={(e) => inputForm(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Product weight</Form.Label>
            <Form.Control
              name="productWeight"
              type="number"
              placeholder="Product weight"
              onChange={(e) => inputForm(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(handleClose, saveItems)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
