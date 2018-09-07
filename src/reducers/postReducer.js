import { FETCH_POSTS, NEW_POSTS } from "../actions/types";

const initialState = {
  filteredPosts: [],
  currentlySelectedPostDetail: {},
  staticDetails: {
    currentSubReddit: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        filteredPosts: action.payload
      };
    default:
      return state;
  }
};
