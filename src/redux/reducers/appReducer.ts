import { BaseAction, IAppReducer } from "../store";

const initialState: IAppReducer = {
  showSnackBar: false,
  snackBarMessage: "",
  snackBarErrorMessage: "",
};

export const appReducer = (state = initialState, action: BaseAction<any>) => {
  switch (action.type) {
    case "SHOW_TOAST": {
      return {
        ...state,
        showLoader: action.payload,
      };
    }
    case "HIDE_TOAST": {
      return {
        ...state,
        showLoader: false,
      };
    }
    case "SET_SNACKBAR_MESSAGE": {
      return {
        ...state,
        snackBarErrorMessage:'',
        snackBarMessage: action.payload,
      };
    }
    case "SET_SNACKBAR_ERROR_MESSAGE": {
      return {
        ...state,
        snackBarMessage:'',
        snackBarErrorMessage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
