import {
  GET_MOVIES_ERROR,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
} from "./action";

const initState = {
  loading: false,
  movies: [],
  error: false,
};

export const moviesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case GET_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        movies: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
