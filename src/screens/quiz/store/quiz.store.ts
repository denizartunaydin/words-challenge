import { HomeActionTypes, SET_DATA } from "./quiz.action";

export interface QuizStateModel {
  selectWordEng: string;
  selectWordTr: string;
  wrongWord: string;
  choiceOne: string;
  choiceTwo: string;
}

const initialState: QuizStateModel = {
  selectWordEng: "",
  selectWordTr: "",
  wrongWord: "",
  choiceOne: "",
  choiceTwo: "",
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
        wrongWord: action.payload.wrongWord,
        choiceOne: action.payload.choiceOne,
        choiceTwo: action.payload.choiceTwo,
      };

    default:
      return state;
  }
}
