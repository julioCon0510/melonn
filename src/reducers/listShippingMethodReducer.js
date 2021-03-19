import { LIST_SHIPPING_METHOD } from "../types";
const initialState = {
  list_shipping: [],
};

export default function f(state = initialState, action) {
  switch (action.type) {
    case LIST_SHIPPING_METHOD:
      return {
        ...state,
        list_shipping: action.payload,
      };
    default:
      return state;
  }
}
