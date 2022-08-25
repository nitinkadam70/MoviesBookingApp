import axios from "axios";

export const GET_AUTH_LOADING = "GET_AUTH_LOADING";
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";
export const GET_AUTH_ERROR = "GET_AUTH_ERROR";

//login

const getAuthLoading = () => ({
  type: GET_AUTH_LOADING,
});
const getAuthSuccess = (payload) => ({
  type: GET_AUTH_SUCCESS,
  payload,
});
const getAuthError = () => ({
  type: GET_AUTH_ERROR,
});

//post
export const getAuthToken = (payload) => (dispatch) => {
  dispatch(getAuthLoading());
  axios({
    url: "https://reqres.in/api/login",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: payload,
  })
    .then((res) => {
      dispatch(getAuthSuccess(res.data.token));
      localStorage.setItem("token", res.data.token);
    })
    .catch((error) => dispatch(getAuthError()));
};
