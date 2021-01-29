export const PLUS_VALUE = "PLUS_VALUE";
interface SumValueSetActionType {
  type: typeof PLUS_VALUE;
}

export const MINUS_VALUE = "MINUS_VALUE";
interface MinusValueSetActionType {
  type: typeof MINUS_VALUE;
}

export type HomeActionTypes = SumValueSetActionType | MinusValueSetActionType;

export function plusValue(): HomeActionTypes {
  return {
    type: PLUS_VALUE,
  };
}

export function minusValue(): HomeActionTypes {
  return {
    type: MINUS_VALUE,
  };
}
