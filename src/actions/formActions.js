import { CREATE_PRODUCT, STATUS_CREATE } from "../types/index";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewProduct(form) {
  return async (dispatch) => {
    dispatch(addProducto(form));
    try {
      let res = await clienteAxios.post("/shipping-methods", form);
      if (res.data) {
        dispatch(statusAdd(res.data));
        Swal.fire({
          title: "Successfully!",
          text: "Order added successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeStatus() {
  return (dispatch) => {
    dispatch(statusAdd(false));
  };
}

const statusAdd = (status) => ({
  type: STATUS_CREATE,
  payload: status,
});

const addProducto = (form) => ({
  type: CREATE_PRODUCT,
  payload: form,
});
