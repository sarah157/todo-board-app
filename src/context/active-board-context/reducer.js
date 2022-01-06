import {
  SET_ERROR,
  SET_BOARD,
  UPDATE_BOARD,
  ADD_LIST,
  UPDATE_LIST,
  REORDER_LISTS,
  DELETE_LIST,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  REORDER_CARDS,
} from "./constants";

export const initialState = {
  id: "",
  title: "",
  image: "",
  listOrder: [],
  listMap: {},
  cardMap: {},
  error: null,
};

export const activeBoardReducer = (state, action) => {
  const { type, payload } = action;
  let updatedList;
  let updatedListMap;
  let updatedCardMap;

  switch (type) {
    case SET_BOARD:
      return { ...state, ...payload };
    case UPDATE_BOARD:
      return { ...state, ...payload };
    case ADD_LIST:
      return {
        ...state,
        listOrder: [...state.listOrder, payload.id],
        listMap: { ...state.listMap, [payload.id]: payload.data },
      };
    case UPDATE_LIST:
      updatedList = { ...state.listMap[payload.id], ...payload.data };
      return {
        ...state,
        listMap: { ...state.listMap, [payload.id]: updatedList },
      };
    case REORDER_LISTS:
      return { ...state, listOrder: [...payload.listOrder] };
    case DELETE_LIST:
      updatedCardMap = { ...state.cardMap };
      state.listMap[payload.id].cards.forEach(
        (cardId) => delete updatedCardMap[cardId]
      );
      updatedListMap = { ...state.listMap };
      delete updatedListMap[payload.id];
      return {
        ...state,
        listOrder: [
          ...state.listOrder.filter((listId) => listId !== payload.id),
        ],
        listMap: updatedListMap,
        cardMap: updatedCardMap,
      };
    case ADD_CARD:
      updatedList = { ...state.listMap[payload.listId] };
      updatedList.cards.push(payload.id);
      return {
        ...state,
        listMap: { ...state.listMap, [payload.listId]: updatedList },
        cardMap: { ...state.cardMap, [payload.id]: payload.data },
      };
    case UPDATE_CARD:
      let updatedCard = { ...state.cardMap[payload.id], ...payload.data };
      return {
        ...state,
        cardMap: { ...state.cardMap, [payload.id]: updatedCard },
      };
    case DELETE_CARD:
      updatedCardMap = { ...state.cardMap };
      delete updatedCardMap[payload.id];
      updatedList = { ...state.listMap[payload.listId] };
      updatedList.cards = updatedList.cards.filter(
        (cardId) => cardId !== payload.id
      );
      return {
        ...state,
        listMap: { ...state.listMap, [payload.listId]: updatedList },
        cardMap: { ...updatedCardMap },
      };
    case REORDER_CARDS:
      return {
        ...state,
        error: null,
        listMap: { ...state.listMap, ...payload.listMap },
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

