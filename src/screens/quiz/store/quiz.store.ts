import {
  QuizActionTypes,
  SET_CATEGORY,
  SET_DATA,
  SET_DAY_WORD,
  SET_LEVEL_COUNT,
} from "./quiz.action";

export interface QuizStateModel {
  selectWordEng: string;
  selectWordTr: string;
  choiceOne: string;
  choiceTwo: string;
  dayWords: number;
  category: string;
  categories: [];
}

const initialState: QuizStateModel = {
  selectWordEng: "",
  selectWordTr: "",
  choiceOne: "",
  choiceTwo: "",
  dayWords: 0,
  category: "",
  categories: [],
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
        categories: action.payload,
      };

    case SET_DAY_WORD:
      return {
        ...state,
        dayWords: action.payload,
      };

    default:
      return state;
  }
}
