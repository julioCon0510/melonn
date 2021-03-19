import { LIST_SHIPPING_METHOD } from "../types/index";
import clienteAxios from "../config/axios";

export function listShippigMethod() {
  return async (dispatch) => {
    try {
      let res = await clienteAxios.get("/shipping-methods");
      dispatch(listShipping(res.data));
    } catch (error) {}
  };
}

const listShipping = (res) => ({
  type: LIST_SHIPPING_METHOD,
  payload: res,
});
