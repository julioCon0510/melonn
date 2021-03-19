import { CREATE_PRODUCT, STATUS_CREATE } from "../types";
const initialState = {
  product: [],
  status: false,
};

export default function f(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload],
      };
    case STATUS_CREATE:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
