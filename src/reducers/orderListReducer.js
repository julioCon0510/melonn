import { ORDER_LIST_PRODUCT, LIST_FOR_ID } from "../types";
const initialState = {
  listPro: [],
  listProId: [],
};

export default function f(state = initialState, action) {
  switch (action.type) {
    case ORDER_LIST_PRODUCT:
      return {
        ...state,
        listPro: [action.payload],
      };

    case LIST_FOR_ID:
      return {
        ...state,
        listProId: action.payload,
      };
    default:
      return state;
  }
}
