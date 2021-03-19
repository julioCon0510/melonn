import { ORDER_LIST_PRODUCT } from "../types";
const initialState = {
  listPro: [],
};

export default function f(state = initialState, action) {
  switch (action.type) {
    case ORDER_LIST_PRODUCT:
      return {
        ...state,
        listPro: [action.payload],
      };
    default:
      return state;
  }
}
