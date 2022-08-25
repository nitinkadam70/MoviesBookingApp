import axios from "axios";

//Actions Types
export const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
export const GET_MOVIES_ERROR = "GET_MOVIES_ERROR";

//Actions
const getMoviesRequest = () => ({
  type: GET_MOVIES_REQUEST,
});

const getMoviesSuccess = (data) => ({
  type: GET_MOVIES_SUCCESS,
  payload: data,
});

const getMoviesError = (error) => ({
  type: GET_MOVIES_REQUEST,
  payload: error,
});

//Fetching APIs and getting Movies Data
export const getMoviesData = () => (dispatch) => {
  dispatch(getMoviesRequest());
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}/movies`,
  })
    .then((res) => dispatch(getMoviesSuccess(res.data)))
    .catch((err) => dispatch(getMoviesError(err)));
};
