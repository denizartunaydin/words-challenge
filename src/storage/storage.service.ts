import AsyncStorage from "@react-native-community/async-storage";

export async function getItem(key: string) {
  return AsyncStorage.getItem(key);
}

export function setItem(key: string, value: any) {
  return AsyncStorage.setItem(key, value);
}

export async function setMutliItem(keyValuePairs: string[][]) {
  return await AsyncStorage.multiSet(keyValuePairs);
}

export async function getMutliItem(keyValuePairs: string[]) {
  return await AsyncStorage.multiGet(keyValuePairs);
}

export function removeItem(key: string) {
  return AsyncStorage.removeItem(key);
}

export function removeMulti(keys: string[]) {
  return AsyncStorage.multiRemove(keys);
}

export function clear() {
  return AsyncStorage.clear();
}

export const STORAGE_KEYS = {
  WORDS: "WORDS",
};
