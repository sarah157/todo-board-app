import * as ds from "../../services/dataService";
import {
  SET_ERROR,
  SET_BOARD,
  UPDATE_BOARD,
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  REORDER_LISTS,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  REORDER_CARDS,
} from "./constants";

export const fetchBoard = (id) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    const board = await ds.fetchBoard(id);

    if (board) {
      dispatch({
        type: SET_BOARD,
        payload: {
          id: board.id,
          title: board.title,
          image: board.image,
          listOrder: board.lists,
          listMap: board.listMap,
          cardMap: board.cardMap,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

// update board title or image
export const updateBoard = (id, data) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    await ds.updateDocument("boards", id, data);
    dispatch({
      type: UPDATE_BOARD,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

// LISTS
export const addList = (data, boardId) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    const id = await ds.addList(data, boardId);
    dispatch({
      type: ADD_LIST,
      payload: { id, data },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

export const reorderLists = (listOrder, boardId) => async (dispatch) => {
  dispatch({
    type: REORDER_LISTS,
    payload: { listOrder },
  });
  await ds.updateDocument("boards", boardId, { lists: listOrder });
};

export const reorderCards = (listMap) => async (dispatch) => {
  dispatch({
    type: REORDER_CARDS,
    payload: { listMap },
  });
  Object.keys(listMap).forEach(async (id) => {
    await ds.updateDocument("lists", id, { cards: listMap[id].cards });
  });
};

// update list title or reorder cards
export const updateList = (id, data) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    await ds.updateDocument("lists", id, data);
    dispatch({
      type: UPDATE_LIST,
      payload: { id, data },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

export const deleteList = (id, boardId) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    await ds.deleteList(id, boardId);
    dispatch({
      type: DELETE_LIST,
      payload: { id },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

// CARDS
export const addCard = (data, listId) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    const id = await ds.addCard(data, listId);
    dispatch({
      type: ADD_CARD,
      payload: { id, data, listId },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

// update card title or completion status
export const updateCard = (id, data) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    await ds.updateDocument("cards", id, data);
    dispatch({
      type: UPDATE_CARD,
      payload: { id, data: data },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

export const deleteCard = (id, listId) => async (dispatch) => {
  dispatch({ type: SET_ERROR, payload: null });
  try {
    await ds.deleteCard(id, listId);
    dispatch({
      type: DELETE_CARD,
      payload: { id, listId },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};
