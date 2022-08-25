import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { bookedMoviesReducer } from "./BookTicketPost/reducer";
import { authReducer } from "./Login/reducer";
import { moviesReducer } from "./MoviesGet/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  bookedMovie: bookedMoviesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
