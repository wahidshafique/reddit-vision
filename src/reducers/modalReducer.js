import { TOGGLE_MODAL, SET_MODAL_DETAILS } from "../actions/types";

const initialState = {
  currentModalVisible: false,
  currentModalDetails: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        currentModalVisible: action.payload
      };
    case SET_MODAL_DETAILS:
      return {
        ...state,
        currentModalDetails: action.payload
      };
    default:
      return state;
  }
};
