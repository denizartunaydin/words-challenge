export const SET_DATA = "SET_DATA";
interface SetDataActionType {
  type: typeof SET_DATA;
  payload: any;
}

export const SET_CATEGORY = "SET_CATEGORY";
interface SetCategoryActionType {
  type: typeof SET_CATEGORY;
  payload: string;
}

export const SET_LEVEL_COUNT = "SET_LEVEL_COUNT";
interface SetLevelCountActionType {
  type: typeof SET_LEVEL_COUNT;
  payload: [];
}

export const SET_DAY_WORD = "SET_DAY_WORD";
interface SetDayWordActionType {
  type: typeof SET_DAY_WORD;
  payload: number;
}

export type QuizActionTypes =
  | SetDataActionType
  | SetCategoryActionType
  | SetLevelCountActionType
  | SetDayWordActionType;

export function setData(payload: any): QuizActionTypes {
  return {
    type: SET_DATA,
    payload: payload,
  };
}

export function setCategory(payload: string): QuizActionTypes {
  return {
    type: SET_CATEGORY,
    payload: payload,
  };
}

export function setLevelCount(payload: any): QuizActionTypes {
  return {
    type: SET_LEVEL_COUNT,
    payload: payload,
  };
}

export function setDayWord(payload: number): QuizActionTypes {
  return {
    type: SET_DAY_WORD,
    payload: payload,
  };
}
