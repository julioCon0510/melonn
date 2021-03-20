import { CREATE_PRODUCT, STATUS_CREATE} from "../types/index";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewProduct(form) {
  return async (dispatch) => {
    dispatch(addProducto(form));
    try {
      let res = await clienteAxios.post("/shipping-methods", form);
      console.log(res.data);

      if (res.data.status === "Ok") {
        dispatch(statusAdd(res.data));
        Swal.fire({
          title: "Successfully!",
          text: "Order added successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Método de envio no disponible :" + res.data.msg,
          icon: "error",
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
