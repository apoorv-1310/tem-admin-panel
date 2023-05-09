import store from "../store";

export const showToastAction = () => {
  store.dispatch({
    type: "SHOW_TOAST",
    payload: true,
  });
};

export const hideToastAction = () => {
  store.dispatch({
    type: "HIDE_TOAST",
    payload: false,
  });
};

export const setSnackBarMessage = (message: String) => {
  store.dispatch({
    type: "SET_SNACKBAR_MESSAGE",
    payload: message,
  });
};

export const setErrorSnackBarMessage =(message:string) =>{
  store.dispatch({
    type: "SET_SNACKBAR_ERROR_MESSAGE",
    payload: message,
  });
}
