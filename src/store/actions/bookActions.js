import axios from "axios";
import * as types from "../types";

const getBooksAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_BOOKS_REQUEST });

    const { data } = await axios.get(
      `https://book-set-task.herokuapp.com/api/list_books`
    );

    dispatch({ type: types.GET_BOOKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_BOOKS_FAIL, payload: error });
  }
};

export { getBooksAction };
