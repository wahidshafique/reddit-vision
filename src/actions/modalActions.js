import { TOGGLE_MODAL, SET_MODAL_DETAILS } from "./types";

export const toggleModal = originalModalState => dispatch => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: !originalModalState
  });
};

export const setModalDetails = newDetails => dispatch => {
  dispatch({
    type: SET_MODAL_DETAILS,
    payload: newDetails
  });
};
