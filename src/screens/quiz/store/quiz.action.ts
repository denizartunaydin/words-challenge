export const SET_DATA = "SET_DATA";
interface SetDataActionType {
  type: typeof SET_DATA;
  payload: any;
}

export type HomeActionTypes = SetDataActionType;

export function setData(payload: any): HomeActionTypes {
  return {
    type: SET_DATA,
    payload: payload,
  };
}
