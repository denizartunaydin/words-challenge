import { HomeActionTypes } from "./home.action";

export interface myStateModel {}

const initialState: myStateModel = {};

export function homeReducer(
  state = initialState,
  action: HomeActionTypes
): myStateModel {
  switch (action.type) {
    default:
      return state;
  }
}
