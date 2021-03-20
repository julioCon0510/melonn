import { ORDER_LIST_PRODUCT, LIST_FOR_ID } from "../types/index";
import clienteAxios from "../config/axios";

export function queryNewPro(form) {
  return async (dispatch) => {
    try {
      let res = await clienteAxios.get("/list_orden");
      dispatch(queryListPro(res.data));
    } catch (error) {}
  };
}

export function queryListID(id) {
  return async (dispatch) => {
    let res = await clienteAxios.post("/list_ordenid", {
      product: "product",
      id: id,
    });

    dispatch(queryListProId(res));
  };
}

const queryListPro = (res) => ({
  type: ORDER_LIST_PRODUCT,
  payload: res,
});

const queryListProId = (res) => ({
  type: LIST_FOR_ID,
  payload: res,
});
