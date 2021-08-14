import * as types from "../types";

const getBooksReducer = (state = { loading: false, bookList: [] }, action) => {
  switch (action.type) {
    case types.GET_BOOKS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BOOKS_SUCCESS:
      return { ...state, loading: false, bookList: action.payload };
    case types.GET_BOOKS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { getBooksReducer };
