import { combineReducers } from "redux";
import formReducer from "./formReducer";
import listShippingMethodReducer from "./listShippingMethodReducer";
import orderListReducer from "./orderListReducer";

export default combineReducers({
  formReducer: formReducer,
  listShippingMethodReducer: listShippingMethodReducer,
  orderListReducer: orderListReducer,
});
