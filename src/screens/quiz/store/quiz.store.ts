import {
  HomeActionTypes,
  QuizActionTypes,
  SET_CATEGORY,
  SET_DATA,
  SET_LEVEL_COUNT,
} from "./quiz.action";

export interface QuizStateModel {
  selectWordEng: string;
  selectWordTr: string;
  choiceOne: string;
  choiceTwo: string;
  dayWords: number;
  category: string;
  levelCount: [];
}

const initialState: QuizStateModel = {
  selectWordEng: "",
  selectWordTr: "",
  choiceOne: "",
  choiceTwo: "",
  dayWords: 5,
  category: "",
  levelCount: [],
};

export function quizReducer(
  state = initialState,
  action: QuizActionTypes
): QuizStateModel {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        selectWordEng: action.payload.selectWordEng,
        selectWordTr: action.payload.selectWordTr,
        choiceOne: action.payload.choiceOne,
        choiceTwo: action.payload.choiceTwo,
      };

    case SET_CATEGORY:
      return {
        ...state,

        category: action.payload,
      };

    case SET_LEVEL_COUNT:
      return {
        ...state,

        levelCount: action.payload,
      };

    default:
      return state;
  }
}
