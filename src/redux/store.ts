import { Action, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

export interface BaseAction<T> extends Action<string> {
  type: string;
  payload: T;
}

export interface IAppReducer {
  showSnackBar: boolean;
  snackBarMessage: string;
  snackBarErrorMessage:string;
}

export interface IGlobalStoreState {
  appReducer: IAppReducer;
}
const store = configureStore({ reducer: rootReducer });

export default store;
