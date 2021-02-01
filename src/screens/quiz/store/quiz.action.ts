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

export type QuizActionTypes =
  | SetDataActionType
  | SetCategoryActionType
  | SetLevelCountActionType;

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
