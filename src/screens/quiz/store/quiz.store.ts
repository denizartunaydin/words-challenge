import { HomeActionTypes, SET_CATEGORY, SET_DATA } from "./quiz.action";

export interface QuizStateModel {
  selectWordEng: string;
  selectWordTr: string;
  choiceOne: string;
  choiceTwo: string;
  dayWords: number;
  category: string;
}

const initialState: QuizStateModel = {
  selectWordEng: "",
  selectWordTr: "",
  choiceOne: "",
  choiceTwo: "",
  dayWords: 5,
  category: "",
};

export function quizReducer(
  state = initialState,
  action: HomeActionTypes
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

    default:
      return state;
  }
}
