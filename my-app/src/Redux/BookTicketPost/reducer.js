import {
  GET_BOOKED_MOVIES_ERROR,
  GET_BOOKED_MOVIES_REQUEST,
  GET_BOOKED_MOVIES_SUCCESS,
} from "./action";

const initState = {
  loading: false,
  bookedMoviesData: [],
  error: null,
};

export const bookedMoviesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_BOOKED_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BOOKED_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedMoviesData: action.payload,
      };
    case GET_BOOKED_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        bookedMoviesData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
