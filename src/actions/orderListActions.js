import { ORDER_LIST_PRODUCT } from "../types/index";
import clienteAxios from "../config/axios";

export function queryNewPro(form) {
  return async (dispatch) => {
    try {
      let res = await clienteAxios.get("/list_orden");
      dispatch(queryListPro(res.data));
    } catch (error) {}
  };
}

const queryListPro = (res) => ({
  type: ORDER_LIST_PRODUCT,
  payload: res,
});
