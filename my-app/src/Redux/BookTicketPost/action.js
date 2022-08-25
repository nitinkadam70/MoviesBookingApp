import axios from "axios";

//Actions Types
export const GET_BOOKED_MOVIES_REQUEST = "GET_BOOKED_MOVIES_REQUEST";
export const GET_BOOKED_MOVIES_SUCCESS = "GET_BOOKED_MOVIES_SUCCESS";
export const GET_BOOKED_MOVIES_ERROR = "GET_BOOKED_MOVIES_ERROR";

//Actions
const getBookedMoviesRequest = () => ({
  type: GET_BOOKED_MOVIES_REQUEST,
});

const getBookedMoviesSuccess = (data) => ({
  type: GET_BOOKED_MOVIES_SUCCESS,
  payload: data,
});

const getBookedMoviesError = (error) => ({
  type: GET_BOOKED_MOVIES_REQUEST,
  payload: error,
});

//Fetching APIs and getting Movies Data
export const getBookedMoviesData = () => (dispatch) => {
  dispatch(getBookedMoviesRequest());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}/moviesBooked`,
  })
    .then((res) => dispatch(getBookedMoviesSuccess(res.data)))
    .catch((err) => dispatch(getBookedMoviesError(err)));
};
