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

export type HomeActionTypes = SetDataActionType | SetCategoryActionType;

export function setData(payload: any): HomeActionTypes {
  return {
    type: SET_DATA,
    payload: payload,
  };
}

export function setCategory(payload: string): HomeActionTypes {
  return {
    type: SET_CATEGORY,
    payload: payload,
  };
}
