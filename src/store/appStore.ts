import { combineReducers, applyMiddleware, createStore } from "redux";

import thunkMiddleware from "redux-thunk";
import { homeReducer } from "../screens/home/store/home.store";
import { quizReducer } from "../screens/quiz/store/quiz.store";

const rootReducer = combineReducers({
  home: homeReducer,
  quiz: quizReducer,
});

const middleWareEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleWareEnhancer);
export default store;
