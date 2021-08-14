import { combineReducers } from "redux";
import { getBooksReducer } from "./bookReducers";

export default combineReducers({
    bookList:getBooksReducer,
  });